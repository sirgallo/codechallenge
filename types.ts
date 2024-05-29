import { homedir } from 'os';
import { join } from 'path';

import { Runner } from './cli.js';


export interface CLIRunnerOpts<T> {
  runner: Runner<T>;
  saveResultsToDisk?: boolean;
}

export interface CLIRunnerResults<T> {
  timestamp: string;
  durationInMs: number;
  results: T;
}


export const DEFAULT_RESULTS_FOLDER = join(homedir(), 'codechallenge');