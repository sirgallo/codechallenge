import { Runner } from './cli.js';


export interface CLIRunnerOpts { // input options for the cliRunner execution
  runner: Runner;
}

export interface CLIRunnerResults { // the output from a run
  timestamp: string;
  durationInMs: number;
}


export type DPTable = number[][];
export type Graph = { [vertex: string]: { [neighbor: string]: number } };
export type Knapsack = {
	weights: number[];
	values: number[];
	capacity: number;
};