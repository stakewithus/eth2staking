import 'dotenv/config';
import { Wallet, ethers } from 'ethers';

const { WEBSOCKET_URL, PRIVATE_KEY } = process.env;

if (!WEBSOCKET_URL) console.error("Missing WEBSOCKET_URL in 'env.'!");
if (!PRIVATE_KEY) console.error("Missing PRIVATE_KEY in '.env'!");

if (!WEBSOCKET_URL || !PRIVATE_KEY) {
	console.error('Exiting...');
	process.exit(1);
}

export const provider = new ethers.providers.WebSocketProvider(process.env.WEBSOCKET_URL);

export const signer = new Wallet(PRIVATE_KEY, provider);
