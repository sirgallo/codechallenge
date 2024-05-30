import { Runner, cliRunner } from '../cli.js';
import { SortingData } from '../data/sorting.data.js';

export class MergeSort {
	constructor() {}

	// this section should recursively split the elements in the middle
	// this is the divide portion of merge sort
	static sort(elements: number[]): number[] {
		if (elements.length <= 1) return elements;

		const mid = Math.floor(elements.length / 2); // calculate mid point
		const left = elements.slice(0, mid);
		const right = elements.slice(mid);

		return MergeSort.merge(MergeSort.sort(left), MergeSort.sort(right)); // recursively sort, splitting elements down and then sorting back up to root
	}

	// this section should sort + merge the incoming arrays (left and right)
	private static merge(left: number[], right: number[]): number[] {
		const result: number[] = [];
		let leftIndex = 0;
		let rightIndex = 0;
		
		while (leftIndex < left.length && rightIndex < right.length) {
			if (left[leftIndex] < right[rightIndex]) { // if left is less than right, push left as it is smaller
				result.push(left[leftIndex]);
				leftIndex++; // increase total taken from left
			} else {
				result.push(right[rightIndex]); // same but opposite
				rightIndex++; // increase total taken from right
			}
    }

		return [ ...result, ...left.slice(leftIndex), ...right.slice(rightIndex) ]; // combine the result, then left and finally right, in that order (ascending)
	}
}


export class Sorting extends Runner {
  constructor() { super(); }

	async run() {	// use the merge sort implementatrandomNumbersion to sort the mock data
		const mockData = SortingData.list();
		console.log('unsorted data:', mockData);

		const sorted = MergeSort.sort(mockData);
		console.log('sorted:', sorted);
		
		return true;
	}
}


await cliRunner({
	runner: new Sorting()
});