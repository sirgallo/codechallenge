# codechallenge

### just for fun


## overview

`code challenges` is a utility module that makes it straightforward to write scripts/code challenges and create mock data for them. The directory is separated into two main parts, the `./data` and `./challenges` directories.

`./data` handles data for challenges
Each data file should export a data class that includes static methods with associated mock data.

`./challenges` handles executing challenges.

Each challenge will extend the base runner class, located in [cli](cli.ts).

Runners are expected to have the following format (loosely):

```ts
import { Runner, cliRunner } from '../cli.js'; // import the Runner class and cliRunner


class MyCode extends Runner {
  constructor() { super() }

  async run(): Promise<boolean> { // main handler, executed on start in base class, implement test logic here
    return this.__myMethod();
  }

	// any additional methods can be added as private members

  private __myMethod(): boolean {
    const sum = 2 + 2;
    return sum === 4;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {	// use this to tell node.js to only run if the file is being executed
	await cliRunner({ run: new MyCode() }); // execute the runner
}
```

Runners, when executed, will perform the following:

  1. start timer
  2. invoke run method
  3. return timestamped results with duration of time in ms


## run locally

To run a runner, first build the project (assuming you are at the root directory of the project):
```bash
npm ci // run this if you need node installs (you will on first time running)
npm run build:all
```

Then, run your test/function by executing the appropriate runner file:
```bash
node dist/challenges/<your-compiled-challenge>.js
```


## solutions

solutions are available in [answers](./answers/), and can be run in the same way as above but from `./dist/answers`.