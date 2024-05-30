import { join } from 'path';

import { LogProvider } from './core/log/LogProvider.js';
import { CryptoUtil } from './core/utils/Crypto.js';
import { TimerUtil } from './core/utils/Timer.js';
import { CLIRunnerOpts, CLIRunnerResults } from './types.js';


export abstract class Runner {
  protected zLog = new LogProvider('cli');
  constructor() {}

  async start(): Promise<CLIRunnerResults> {
    try {
      const timer = new TimerUtil('cli');
      
      timer.start('cli.run');
      const results = await this.run();
      timer.stop('cli.run');

      const { start, stop, elapsed } = timer.getResults('cli.run');
      return { timestamp: start.toISOString(), durationInMs: elapsed }
    } catch (err) { throw err; }
  }

  abstract run(): Promise<boolean>;
}


export const cliRunner = async (opts: CLIRunnerOpts) => {
  const zLog = new LogProvider('cli --> runner');

  try {
    const results = await opts.runner.start();
    zLog.info(`results --> ${JSON.stringify(results, null, 2)}`);

    zLog.info('FINISHED');
    process.exit(0);
  } catch (err) {
    zLog.error(`error on run: ${err}`);
    process.exit(1);
  }
};