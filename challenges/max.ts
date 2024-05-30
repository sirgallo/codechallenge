import { Runner, cliRunner } from '../cli.js';
import { SortingData } from '../data/sorting.data.js';


export class LinearSearch {
	static findMaxIndex(elements: number[]): number { // find index of largest element in an unsorted list of elements
		// TODO
		return -1; // if elements if empty, return -1
	}
}


export class Max extends Runner {
	constructor() { super(); }

	async run(): Promise<boolean> {
		const elements = SortingData.list();
		console.log('elements:', elements)

		const index = LinearSearch.findMaxIndex(elements);
		if (index === -1) {
			this.zLog.warn('empty input');
			return true;
		}

		this.zLog.debug(`index: ${index}, selected: ${elements[index]}`);
		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
	await cliRunner({ runner: new Max() });
}