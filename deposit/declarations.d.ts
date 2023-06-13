export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PRIVATE_KEY: string;
			WEBSOCKET_URL: string;
			BROADCAST?: 'true';
		}
	}
}
