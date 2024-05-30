import { LogProvider } from './core/log/LogProvider.js';
import { NodeUtil } from './core/utils/Node.js';
import { TimerUtil } from './core/utils/Timer.js';
import { CLIRunnerOpts, CLIRunnerResults } from './types.js';


export abstract class Runner { // extend this to run all of your challenges
  protected zLog = new LogProvider('cli');
  constructor() {}

  async start(): Promise<CLIRunnerResults> {
    try {
      const timer = new TimerUtil('cli'); // get elapsed time of solution
      
      timer.start('cli.run');
      const results = await this.run();
      timer.stop('cli.run');

      const { start, stop, elapsed } = timer.getResults('cli.run');
      return { timestamp: start.toISOString(), durationInMs: elapsed }
    } catch (err) { // catch any errors in root of run here
			throw err; 
    }
  }

  abstract run(): Promise<boolean>; // implement this
}


export const cliRunner = async (opts: CLIRunnerOpts) => { // takes the processor and executes it
  const zLog = new LogProvider('cli --> runner');

  try {
    const results = await opts.runner.start();
    zLog.info(`results --> ${JSON.stringify(results, null, 2)}`);

    zLog.info('FINISHED');
    process.exit(0);
  } catch (err) {
    zLog.error(`error on run: ${NodeUtil.extractErrorMessage(err)}`);
    process.exit(1);
  }
};