export type DepositData = {
	pubkey: string;
	withdrawal_credentials: string;
	amount: number;
	signature: string;
	deposit_message_root: string;
	deposit_data_root: string;
};

export function isDepositData(n: unknown): n is DepositData {
	if ((n as DepositData).pubkey === undefined) return false;
	if ((n as DepositData).withdrawal_credentials === undefined) return false;
	if ((n as DepositData).amount === undefined) return false;
	if ((n as DepositData).signature === undefined) return false;
	if ((n as DepositData).deposit_message_root === undefined) return false;
	if ((n as DepositData).deposit_data_root === undefined) return false;
	return true;
}

export function isDepositDataArray(n: unknown): n is Array<DepositData> {
	if (!Array.isArray(n)) return false;
	return n.every(isDepositData);
}
