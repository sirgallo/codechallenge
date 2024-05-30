import { Runner, cliRunner } from '../cli.js';
import { SortingData } from '../data/sorting.data.js';


/*
linear search:
  find the target in an array by iterating through each element until the target is found

  example array:
    [  3   1   4   1   5   9   2   6   5 ]

  target: 9

  steps:
    1. start with the first element:
			index = 0
			elements[index] = 3
			3 != 9, so move to the next element

    2. next element:
			index = 1
			elements[index] = 1
			1 != 9, so move to the next element

    3. next element:
			index = 2
			elements[index] = 4
			4 != 9, so move to the next element

    4. next element:
			index = 3
			elements[index] = 1
			1 != 9, so move to the next element

    5. next element:
			index = 4
			elements[index] = 5
			5 != 9, so move to the next element

    6. next element:
			index = 5
			elements[index] = 9
			9 == 9, target found at index 5

time complexity is O(n)
*/
export class LinearSearch {
	static findMaxIndex(elements: number[]): number { // find index of largest element in an unsorted list of elements
		if (elements.length === 0) return -1;

		let maxIndex = elements[0]; // assume the first element is the maximum
		for (let i = 1; i < elements.length; i++) { // iterate through elements until max is found
			if (elements[i] > elements[maxIndex]) maxIndex = i; // if larger than current, new max
		}

		return maxIndex;
	}
}


export class Max extends Runner {
	constructor() { super(); }

	async run(): Promise<boolean> {
		const elements = SortingData.list();
		console.log('elements:', elements)

		const index = LinearSearch.findMaxIndex(elements);

		this.zLog.debug(`index: ${index}, selected: ${elements[index]}`);
		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
	await cliRunner({ runner: new Max() });
}