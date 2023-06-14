import { ethers } from 'ethers';
import fs from 'fs';
import { provider, signer } from './config';
import CHAINS from './chains';
import { isDepositDataArray } from './helpers';
import { DepositContract__factory } from '../typechain';

async function main() {
	const { chainId } = await provider.getNetwork();

	console.log('Chain ID:', chainId);

	if (CHAINS[chainId] == undefined) throw new Error(`Unsupported chain.`);

	const depositContractAddress = CHAINS[chainId].depositContract;
	console.log('Deposit Contract Address:', depositContractAddress);

	const depositContract = DepositContract__factory.connect(depositContractAddress, signer);

	// read './data' folder for files
	let paths = fs.readdirSync('data');
	paths = paths.filter((f) => f.toLowerCase().endsWith('.json'));

	if (paths.length === 0) console.log("No files found in './data'.");

	for (const p of paths) {
		const path = `data/${p}`;
		const file = fs.readFileSync(path);
		const json = JSON.parse(file.toString());

		console.log(`Reading file: ${path}`);

		if (!isDepositDataArray(json)) {
			console.error(`$Invalid JSON at: ${path}. Skipping...`);
			return;
		}

		for (const data of json) {
			const { amount, pubkey, withdrawal_credentials, signature, deposit_data_root } = data;
			console.log(`Depositing for pubkey: ${pubkey}`);

			const args = [
				'0x' + pubkey,
				'0x' + withdrawal_credentials,
				'0x' + signature,
				'0x' + deposit_data_root,
				{ value: ethers.utils.parseUnits(amount.toString(), 'gwei') },
			] as const;

			// simulate tx first to check for problems
			try {
				await depositContract.callStatic.deposit(...args);
			} catch (e) {
				console.error(e);
				continue;
			}

			// submit real tx upon user prompt

			// only simulate transactions if BROADCAST in '.env' not set to true
			if (process.env.BROADCAST?.toLowerCase() === 'true') {
				const tx = await depositContract.deposit(...args);
				console.log('Tx Hash:', tx.hash);
				await tx.wait();
				console.log('Tx done.');
			}
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});
