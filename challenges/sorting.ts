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


export class Sorting extends Runner {
  constructor() { super(); }

	async run() {	// use the merge sort implementatrandomNumbersion to sort the mock data
		const mockData = SortingData.list();
		console.log('unsorted data:', mockData);

		// sort here and log the sorted results after
		
		return true;
	}
}


await cliRunner({
	runner: new Sorting()
});