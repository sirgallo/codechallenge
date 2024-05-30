import { Runner, cliRunner } from '../cli.js'
import { SortingData } from '../data/sorting.data.js';
import { QuickSort } from '../answers/sorting.js';


export class BinarySearch {
	static search(elements: number[], target: number): number { // find the index in the list where the element is located, if it exists
		// TODO
		return -1; // if element not found, return -1
	}
}


export class Search extends Runner {
  constructor() { super(); }

	async run(): Promise<boolean> {
		const elements = SortingData.list();
		const target = SortingData.generateRandomNumbers(1)[0];

		const element = BinarySearch.search(QuickSort.sort(elements), target)
		this.zLog.debug(`target: ${target}, element: ${element}`);

		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
	await cliRunner({ runner: new Search() });
}