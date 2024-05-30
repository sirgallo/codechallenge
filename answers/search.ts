import { Runner, cliRunner } from '../cli.js'
import { SortingData } from '../data/sorting.data.js';
import { QuickSort } from './sorting.js';


/*
binary search:
  find the target in a sorted array by repeatedly dividing the search interval in half

  example array:
    [  1   2   3   4   5   6   7   8   9  10 ]

  target: 7

  steps:
    1. start with the entire array:
			left = 0, right = 9
			mid = Math.floor((left + right) / 2) = 4
			elements[mid] = 5

			5 < 7, so search in the right half

    2. new search interval:
			left = 5, right = 9
			mid = Math.floor((left + right) / 2) = 7
			elements[mid] = 8

			8 > 7, so search in the left half

    3. new search interval:
			left = 5, right = 6
			mid = Math.floor((left + right) / 2) = 5
			elements[mid] = 6

			6 < 7, so search in the right half

    4. new search interval:
			left = 6, right = 6
			mid = Math.floor((left + right) / 2) = 6
			elements[mid] = 7

			target found at index 6

time complexity is O(log n)
*/
export class BinarySearch {
	static search(elements: number[], target: number): number { // find the index in the list where the element is located, if it exists
		let left = 0;
		let right = elements.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2); // find mid point between left and right
			if (elements[mid] === target) {
				return mid;
			} else if (elements[mid] < target) {
				left = mid + 1;
			} else { right = mid - 1; }
		}

		return -1;  // if element not found, return -1
	}
}



export class Search extends Runner {
  constructor() { super(); }

	async run(): Promise<boolean> {
		const elements = SortingData.list();
		const target = SortingData.generateRandomNumbers(1)[0];

		const sortedElements = QuickSort.sort(elements);
		console.log('sorted elements:', sortedElements)
		const index = BinarySearch.search(sortedElements, target)
		
		if (index === -1) { 
			this.zLog.warn(`target element not found in list: ${target}`);
			return true;
		}
		
		this.zLog.debug(`target: ${target}, index: ${index}, selected: ${sortedElements[index]}`);
		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
	await cliRunner({ runner: new Search() });
}