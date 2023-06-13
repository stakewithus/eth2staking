type Chain = {
	name: string;
	etherscan: string;
	depositContract: string;
};

export const CHAINS: Record<number, Chain> = {
	1: {
		name: 'Ethereum Mainnet',
		etherscan: 'https://www.etherscan.io/tx/',
		depositContract: '0x00000000219ab540356cBB839Cbe05303d7705Fa',
	},
	5: {
		name: 'Goerli Testnet',
		etherscan: 'https://goerli.etherscan.io/tx/',
		depositContract: '0xff50ed3d0ec03aC01D4C79aAd74928BFF48a7b2b',
	},
};

export default CHAINS;
