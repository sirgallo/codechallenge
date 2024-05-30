import { Runner, cliRunner } from '../cli.js';
import { LogProvider } from '../core/log/LogProvider.js';
import { LookupData, User } from '../data/lookup.data.js';


class LookupTable {
	private __values: User | null[]; // the table
	constructor(private __size: number) {
		this.__values = new Array(this.__size).fill(null); // initialize to null, creates an empty array
	}

	peek() { // return the whole table back
		// TODO 
	}

	put(user: User) { // insert a new element into the table
		// TODO
	}

	get(phone: string) { // fetch an element from the table
		// TODO
	}

	del(phone: string) { // delete an element from the table (set the element to null)
		// TODO
	}

	private __hash(data: string): number { // simple hash function, get char code at each char and then modulo by size of array
		return data.split('').reduce((res, char) => {
			res += char.charCodeAt(0);
			return res;
		}, 0) % this.__size;
	}
}


export class Lookup extends Runner {
	private __zLog = new LogProvider(Lookup.name);
	constructor() { super(); }

	async run() {
		const mockData = LookupData.users();
		const lookupTable = new LookupTable(mockData.length);
		
		// insert elements here

		console.log('elements after insert:', lookupTable.peek());

		// get elements here

		// delete elements here
		
		console.log('lookup table after delete:', lookupTable.peek());
		return true;
	}
}


cliRunner({
	runner: new Lookup()
});