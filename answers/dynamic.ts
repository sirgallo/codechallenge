import { Runner, cliRunner } from '../cli.js';
import { LogProvider } from '../core/log/LogProvider.js';
import { KnapsackData } from '../data/dynamic.data.js'; // Assume this provides weights, values, and capacity


/*
0/1 knapsack problem:
  determine the maximum value that can be obtained from a set of items, each with a weight and value, without exceeding the knapsack's capacity.

  steps:
    1. create a 2D array dp with dimensions (number of items + 1) x (capacity + 1), initialized to 0. this table will help us store the maximum values for different capacities and subsets of items.
			rows --> values
			columns --> capacities

    2. fill the DP table:
			 for each item (from 1 to n):
				for each capacity (from 0 to capacity):
					decide whether to include the current item in the knapsack or not.

		2b. deciding:
			for each item i and capacity w:
				if the weight of the current item (weights[i-1]) is less than or equal to the current capacity w:
					there are two choices:
						exclude the item: the maximum value is the same as the maximum value without this item, which is dp[i-1][w].
						include the item: the maximum value is the value of the current item plus the maximum value of the remaining capacity, which is dp[i-1][w - weights[i-1]] + values[i-1].
					if the weight of the current item is greater than the current capacity:
						cannot include the item, so the maximum value is the same as the maximum value without this item, which is dp[i-1][w].

    3. Result:
       The maximum value is stored in dp[n][capacity]


	example:
		weights: [2, 3, 4, 5]
		values:  [3, 4, 5, 6]
		capacity: 5

  detailed steps:
    1. initialize DP table:
			dp = [
				[0, 0, 0, 0, 0, 0],  // dp[0][w]
				[0, 0, 0, 0, 0, 0],  // dp[1][w]
				[0, 0, 0, 0, 0, 0],  // dp[2][w]
				[0, 0, 0, 0, 0, 0],  // dp[3][w]
				[0, 0, 0, 0, 0, 0]   // dp[4][w]
			]

    2. process items:
			- for item 1 (weight 2, value 3):
					dp[1][2] = max(dp[0][2], dp[0][0] + 3) = max(0, 3) = 3
					dp[1][3] = max(dp[0][3], dp[0][1] + 3) = max(0, 3) = 3
					dp[1][4] = max(dp[0][4], dp[0][2] + 3) = max(0, 3) = 3
					dp[1][5] = max(dp[0][5], dp[0][3] + 3) = max(0, 3) = 3
					
					updated dp table:
					dp = [
						[0, 0, 0, 0, 0, 0],
						[0, 0, 3, 3, 3, 3],
						[0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0]
					]

			- for item 2 (weight 3, value 4):
					dp[2][3] = max(dp[1][3], dp[1][0] + 4) = max(3, 4) = 4
					dp[2][4] = max(dp[1][4], dp[1][1] + 4) = max(3, 4) = 4
					dp[2][5] = max(dp[1][5], dp[1][2] + 4) = max(3, 7) = 7

					updated dp table:
					dp = [
						[0, 0, 0, 0, 0, 0],
						[0, 0, 3, 3, 3, 3],
						[0, 0, 3, 4, 4, 7],
						[0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0]
					]

			- for item 3 (weight 4, value 5):
					dp[3][4] = max(dp[2][4], dp[2][0] + 5) = max(4, 5) = 5
					dp[3][5] = max(dp[2][5], dp[2][1] + 5) = max(7, 5) = 7

					updated dp table:
					dp = [
						[0, 0, 0, 0, 0, 0],
						[0, 0, 3, 3, 3, 3],
						[0, 0, 3, 4, 4, 7],
						[0, 0, 3, 4, 5, 7],
						[0, 0, 0, 0, 0, 0]
					]

			- for item 4 (weight 5, value 6):
					dp[4][5] = max(dp[3][5], dp[3][0] + 6) = max(7, 6) = 7

					final dp table:
					dp = [
						[0, 0, 0, 0, 0, 0],
						[0, 0, 3, 3, 3, 3],
						[0, 0, 3, 4, 4, 7],
						[0, 0, 3, 4, 5, 7],
						[0, 0, 3, 4, 5, 7]
					]

    3. result:
			dp[4][5] = 7

time complexity is O(n * capacity)
*/
export class Knapsack {
	static solve(weights: number[], values: number[], capacity: number): number { //optimize to solve for the max allowed to be in the knapsack
		const n = weights.length;
		const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

		for (let i = 1; i <= n; i++) {
			for (let w = 0; w <= capacity; w++) {
				if (weights[i - 1] <= w) dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
				else dp[i][w] = dp[i - 1][w];
			}
		}

		return dp[n][capacity]; 
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
		const { weights, values, capacity } = KnapsackData.get();
		this.__zLog.debug(`weights: ${weights}, values: ${values}, capacity: ${capacity}`);
	
		const maxValue = Knapsack.solve(weights, values, capacity);
		this.__zLog.debug(`max value: ${maxValue}`);
		return true;
	}
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cliRunner({ runner: new DynamicRunner() });
}