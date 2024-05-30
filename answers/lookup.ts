import { Runner, cliRunner } from '../cli.js';
import { User } from '../types.js';
import { LookupData } from '../data/lookup.data.js';



// DATA STRUCTURE FROM SCRATCH


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
	constructor() { super(); }

	async run() { // run both
		this.__implemented();
		return this.__jsLang();
	}

	private __implemented() { // this method is for the answer if you were to implement the data structure yourself
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
		
		console.log('lookup table after deletion:', lookupTable.peek());
		return true;
	}

	private __jsLang() { // this method would be if you just used javascripts built in Object type (recommended)
		const mockData = LookupData.users();
		const lookupTable = {};

		for (const user of mockData) {
			lookupTable[user.phone] = user; 
		}

		console.log('elements after insert:', Object.entries(lookupTable)); // Object is a a built in JS type, with many provided built in functions

		for (const user of mockData) {
			const element = lookupTable[user.phone];
			console.log('retrieved:', element.phone);
		}

		for (const user of mockData) {
			delete lookupTable[user.phone];
		}

		console.log('lookup table after deletions:', lookupTable);
		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
	await cliRunner({ runner: new Lookup() });
}