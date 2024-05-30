import { Runner, cliRunner } from '../cli.js';
import { Graph } from '../types.js';
import { LogProvider } from '../core/log/LogProvider.js';
import { GraphData } from '../data/graph.data.js'; // Assume this provides weights, values, and capacity


class PriorityQueue<T> {
	private __values: { value: T, priority: number }[] = [];
	constructor() {}

	get values() { return this.__values; }

	push(value: T, priority: number) {
		// TODO
	}

	pull(): { value: T, priority: number } | undefined {
		// TODO
		return undefined;
	}

	private __sort() {
		// TODO
	}
} 


export class Dijkstra {
	static shortestPath(graph: Graph, startVertex: string, endVertex: string): string[] { //optimize to solve for the max allowed to be in the knapsack
		const queue = new PriorityQueue<string>();	
		const distances: { [vertex: string]: number } = {}; // a map of the vertices and distances
    const previous: { [vertex: string]: string | null }  = {}; // a map of previously visited vertices
    const path: string[] = []; // to return the shortest path
    let smallest: string | null = null;

    for (let vertex in graph) { // initialize the distances and queue
			// TODO
    }

    while (queue.values.length) { // process the queue
			const node = queue.pull();
			if (! node) break;
      
			smallest = node.value;
			// TODO
    }

		return smallest ? [ ...path, smallest ].reverse() : path;
	}
}


export class GraphRunner extends Runner {
	private __zLog = new LogProvider(GraphRunner.name);
	constructor() { super(); }

	async run() { // find the shortest path
		this.__dijkstra();
		return true;
	}

	private __dijkstra() {
		const graph = GraphData.get();
		console.log('graph:', graph);
	
		const nodes = Object.keys(graph);
		const shortestPath = Dijkstra.shortestPath(graph, nodes[0], nodes[3]);
		this.__zLog.debug(`shortest path from ${nodes[0]} to ${nodes[3]}: ${shortestPath}`);
		return true;
	}
}


if (import.meta.url === `file://${process.argv[1]}`) {
  await cliRunner({ runner: new GraphRunner() });
}