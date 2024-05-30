import { Runner, cliRunner } from '../cli.js';
import { LogProvider } from '../core/log/LogProvider.js';
import { LookupData, User } from '../data/lookup.data.js';


class LookupTable { // this is a hash table implementation
	private __values: User | null[]; // this is a pre-allocated array where elements are added in to their hashed index
	constructor(private __size: number) {
		this.__values = new Array(this.__size).fill(null); // initialize to null
	}

	peek() { return this.__values; } // return the whole list back

	put(user: User) { // insert a new element into the table
		const index = this.__hash(user.phone); // this generates a hash which is the index that the element will be located in the table
		this.__values[index] = user;
	}

	get(phone: string): User { // fetch an element from the table
		const index = this.__hash(phone);
		return this.__values[index];
	}

	del(phone: string) { // delete an element from the table (set the element to null)
		const index = this.__hash(phone);
		this.__values[index] = null;
	}

	private __hash(data: string): number { // simple hash function, get char code at each char and then modulo by size of array (remainder is the index)
		return data.split('').reduce((res, char) => { // first split the data on each character and then reduce it to the sum of all of the character codes
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
		
		for (const user of mockData) {
			lookupTable.put(user);
		}

		console.log('elements after insert:', lookupTable.peek());

		for (const user of mockData) {
			const element = lookupTable.get(user.phone);
			console.log('retrieved:', element.phone);
		}

		for (const user of mockData) {
			lookupTable.del(user.phone);
		}
		
		console.log('lookup table after delete:', lookupTable.peek());
		return true;
	}
}


cliRunner({
	runner: new Lookup()
});