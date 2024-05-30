import { Runner, cliRunner } from '../cli.js';
import { SortingData } from '../data/sorting.data.js';

export class MergeSort {
	constructor() {}

	// this section should recursively split the elements in the middle
	// this is the divide portion of merge sort
	static sort(elements: number[]): number[] {
		// TODO
		return [];
	}

	// this section should sort + merge the incoming arrays (left and right)
	private static merge(left: number[], right: number[]): number[] {
		// TODO
		return [];
	}
}


export class QuickSort {
	constructor() {}

	// this section should recursively split the elements at a pivot point and sort around this pivot
	static sort(elements: number[]): number[] {
		// TODO
		return [];
	}
}


export class Sorting extends Runner {
  constructor() { super(); }

	async run() {	// use the merge sort implementatrandomNumbersion to sort the mock data
		const mockData = SortingData.list();
		console.log('unsorted data:', mockData);

		const sorted1 = MergeSort.sort(mockData); // merge sort
		console.log('sorted (merge sort):', sorted1);

		const sorted2 = QuickSort.sort(mockData); // quick sort
		console.log('sorted (quick sort):', sorted2);
		
		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
	await cliRunner({ runner: new Sorting() });
}