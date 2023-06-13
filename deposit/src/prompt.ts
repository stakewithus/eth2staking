import promptSync from 'prompt-sync';

const prompt = promptSync();

export const yn = (query: string): boolean => {
	while (true) {
		console.log(`${query} (Y/n)`);
		switch (prompt('> ').toLowerCase()) {
			case 'y':
				return true;
			case 'n':
				return false;
		}
	}
};
