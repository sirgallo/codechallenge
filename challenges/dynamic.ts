import { Runner, cliRunner } from '../cli.js';
import { LogProvider } from '../core/log/LogProvider.js';
import { DynamicData } from '../data/dynamic.data.js';


/*
0/1 knapsack problem:
  determine the maximum value that can be obtained from a set of items, each with a weight and value, without exceeding the knapsack's capacity.
*/
export class Knapsack {
	static solve(weights: number[], values: number[], capacity: number): number { //optimize to solve for the max allowed to be in the knapsack
		// TODO
		return -1; // this will actually be number, where it is the max possible value
	}
}


export class DynamicRunner extends Runner {
	private __zLog = new LogProvider(DynamicRunner.name);
	constructor() { super(); }

	async run() { // solve the knapsack problem with the mock data
		this.__knapsack();
		return true;
	}

	private __knapsack() {
		const { weights, values, capacity } = DynamicData.knapsack();
		this.__zLog.debug(`weights: ${weights}, values: ${values}, capacity: ${capacity}`);
	
		const maxValue = Knapsack.solve(weights, values, capacity);
		this.__zLog.debug(`max value: ${maxValue}`);
		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
  await cliRunner({ runner: new DynamicRunner() });
}