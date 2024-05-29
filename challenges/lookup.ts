import { CryptoUtil } from '../core/utils/Crypto.js'
import { User } from '../data/lookup.data.js';


class LookupTable {
	private values: any[];
	constructor(initialSize: number) {
		this.values = new Array(initialSize);
	}

	put(user: User) {
		const hash = CryptoUtil.generateHash({ data: user.phone, algorithm: 'sha256', format: 'bytes' });
		const 
	}

	get(phone: string) {

	}

	private __hammingWeight() {

	}
}

export class Lookup {
	constructor() {}

	run() {

	}
}