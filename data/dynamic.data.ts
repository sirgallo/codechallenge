import { Knapsack } from '../types.js';


export class DynamicData {
	static knapsack = (): Knapsack => {
		return {
			weights: [ 2, 3, 4, 5 ],
			values: [ 3, 4, 5, 6 ],
			capacity: 5
		}
	}
}