import { homedir } from 'os';
import { join } from 'path';

import { Runner } from './cli.js';


export interface CLIRunnerOpts {
  runner: Runner;
}

export interface CLIRunnerResults {
  timestamp: string;
  durationInMs: number;
}