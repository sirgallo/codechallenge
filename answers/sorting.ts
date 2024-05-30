import { Runner, cliRunner } from '../cli.js';
import { SortingData } from '../data/sorting.data.js';



/*
mergesort:
	divide into smaller and smaller lists:
  								[  8 	 3   5   2   4   1   6   7 ]
 
							  [ 8	  3	  5   2 ]  |  [ 4   1   6   7 ]

			   [ 8	  3 ]  |  [ 5   2 ]  |  [ 4   1 ]  |  [ 6   7 ]

  sort + merge lists back into one:
					[ 3   8 ]  |  [ 2   5 ]  |  [ 1   4 ]  |  [ 6   7 ]

							  [	2   5   3   8 ]  |  [ 1   4   6   7 ]

								   [ 1   2   3   4   5   6   7   8 ]

time complexity is O(nlogn)
*/
export class MergeSort {
	constructor() {}

	// this section should recursively split the elements in the middle
	// this is the divide portion of merge sort
	static sort(elements: number[]): number[] {
		if (elements.length <= 1) return elements;

		const mid = Math.floor(elements.length / 2); // calculate mid point

		// split the list into both left and right at the midpoint
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

		return [ 
			...result, // the merged elements
			...left.slice(leftIndex), // any remainders from the left
			...right.slice(rightIndex) // remainders from the right
		]; // combine the result
	}
}


/*
quicksort:
  choose a pivot, partition into smaller and larger lists:
                [  8 	 3   5   2   4   1   6   7 ]

  choose 4 as pivot:
														pivot
                             [4]
                              |
                              |
           [ 3   2   1 ]      |        [ 8   5   6   7 ]
  				less than pivot   pivot      greater than pivot

	sort recursively:
					pivot
					[4]
						|
		[ 3  2  1 ]  [ 8  5  6  7 ]

					pivot
					[3]
						|
			[ 2  1 ]  [ 5  6  7 ]  [ 8 ]

					pivot
					[2]
						|
		[ 1 ] [1] [ 5  6  7 ] [ 8 ]

					pivot
					[6] 
						|
		[ 5 ] [ 7 ] [ 8 ]

	combine results:
		[ 1  2  3  4  5  6  7  8 ]

time complexity is O(nlogn) on average, O(n^2) in the worst case
*/
export class QuickSort {
	static sort(elements: number[]): number[] {
		if (elements.length <= 1) return elements;

		const index = Math.floor(elements.length / 2); // set the pivot point to the middle of the list by default
		const pivot = elements[index]; // get the pivot value
		const sorted = QuickSort.__sortHelper(elements, index, pivot); // sort the elements into left and right sorted around the pivot
		
		return [
			...QuickSort.sort(sorted.left), // the sorted elements before the pivot
			pivot, // the pivot
			...QuickSort.sort(sorted.right) // the sorted elements after the pivot
		] // combine the result
	}

	private static __sortHelper(elements: number[], index: number, pivot: number): { left: number[], right: number[] } {
		const sorted: { left: number[], right: number[] } = { left: [], right: [] };
		for (let current = 0; current < elements.length; current++) { // check all incoming elements
			if (current === index) continue; // this is the pivot, skip
			if (elements[current] < pivot) sorted.left.push(elements[current]); // if smaller than pivot, push left
			if (elements[current] >= pivot) sorted.right.push(elements[current]); // if larger than pivot, push right
 		}

		return sorted;
	}
}


export class Sorting extends Runner {
  constructor() { super(); }

	async run() {	// use the merge sort implementation to sort the mock data
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