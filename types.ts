import { Runner } from './cli.js';


export interface CLIRunnerOpts { // input options for the cliRunner execution
  runner: Runner;
}

export interface CLIRunnerResults { // the output from a run
  timestamp: string;
  durationInMs: number;
}