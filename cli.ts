import { writeFileSync } from 'fs';
import { join } from 'path';

import { LogProvider } from './core/log/LogProvider.js';
import { CryptoUtil } from './core/utils/Crypto.js';
import { TimerUtil } from './core/utils/Timer.js';
import { CLIRunnerOpts, CLIRunnerResults, DEFAULT_RESULTS_FOLDER } from './types.js';


export abstract class Runner<T> {
  protected zLog = new LogProvider('cli');
  constructor() {}

  async start(): Promise<CLIRunnerResults<T>> {
    try {
      const timer = new TimerUtil('cli');
      
      timer.start('cli.run');
      const results = await this.runIO();
      timer.stop('cli.run');

      const { start, stop, elapsed } = timer.getResults('cli.run');
      return { timestamp: start.toISOString(), durationInMs: elapsed, results }
    } catch (err) { throw err; }
  }

  abstract runIO(): Promise<T>;
}


export const cliRunner = async <T>(opts: CLIRunnerOpts<T>) => {
  const zLog = new LogProvider('io --> sight.io.runner');

  const writeToDisk = (results: CLIRunnerResults<T>) => {
    const now = new Date().toISOString();
    const randHash = CryptoUtil.generateHash({ data: now, algorithm: 'sha256', format: 'hex' })
    const filename = join(DEFAULT_RESULTS_FOLDER, `${(randHash as string)}_${now}.results`);

    zLog.debug(`results output filename: ${filename}`);
    writeFileSync(filename, JSON.stringify(results));
  };
  
  try {
    const results = await opts.runner.start();
    zLog.info(`results --> ${JSON.stringify(results, null, 2)}`);
    if (opts.saveResultsToDisk) { 
      zLog.debug('writing results to disk...');
      writeToDisk(results);
    }

    zLog.info('FINISHED');
    process.exit(0);
  } catch (err) {
    zLog.error(`error on run: ${err}`);
    process.exit(1);
  }
};