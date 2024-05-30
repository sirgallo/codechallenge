import { Runner, cliRunner } from '../cli.js';
import { Graph } from '../types.js';
import { LogProvider } from '../core/log/LogProvider.js';
import { GraphData } from '../data/graph.data.js'; // Assume this provides weights, values, and capacity


/*
PriorityQueue:
  a data structure that allows for efficient retrieval of the highest-priority element.
  in this implementation, the priority queue is a min-heap, meaning that elements with the lowest priority values are dequeued first.

  example operations:
    push("A", 2)
    push("B", 1)
    push("C", 3)

  steps:
    1. push "A" with priority 2:
        values = [ { val: "A", priority: 2 } ]

    2. push "B" with priority 1:
				values = [ { val: "A", priority: 2 }, { val: "B", priority: 1 } ]
				sort values by priority:
				values = [ { val: "B", priority: 1 }, { val: "A", priority: 2 } ]

    3. push "C" with priority 3:
         values = [ { val: "B", priority: 1 }, { val: "A", priority: 2 }, { val: "C", priority: 3 } ]
         no sorting needed since "C" has the highest priority value

    4. pull:
         remove and return the element with the lowest priority value (first element):
         dequeued element = { val: "B", priority: 1 }
         values = [ { val: "A", priority: 2 }, { val: "C", priority: 3 } ]

time complexity:
  push: O(n log n) due to sorting
  pull: O(1) for removing the first element
*/
export class PriorityQueue<T> {
	private __values: { value: T, priority: number }[] = [];
	constructor() {}

	get values() { return this.__values; }

	push(value: T, priority: number) {
		this.__values.push({ value, priority });
		this.__sort();
	}

	pull= (): { value: T, priority: number } | undefined => this.__values.shift();

	private __sort = () => this.__values.sort((a, b) => a.priority - b.priority);
}


/*
Dijkstra's Algorithm:
  find the shortest path from a source vertex to a target vertex in a graph with non-negative weights.

  example graph:
    A --1--> B
    A --4--> C
    B --2--> C
    B --5--> D
    C --1--> D

  start vertex: A
  end vertex: D

  steps:
    1. initialize:
       distances = { A: 0, B: Infinity, C: Infinity, D: Infinity }
       previous = { A: null, B: null, C: null, D: null }
       priority queue = [(A, 0)]

    2. process vertex A:
       current vertex = A, distance = 0
       neighbors: B (weight 1), C (weight 4)
       update distances:
         distances = { A: 0, B: 1, C: 4, D: Infinity }
         previous = { A: null, B: A, C: A, D: null }
         priority queue = [(B, 1), (C, 4)]

    3. process vertex B:
       current vertex = B, distance = 1
       neighbors: A (weight 1), C (weight 2), D (weight 5)
       update distances:
         distances = { A: 0, B: 1, C: 3, D: 6 }
         previous = { A: null, B: A, C: B, D: B }
         priority queue = [(C, 3), (D, 6)]

    4. process vertex C:
       current vertex = C, distance = 3
       neighbors: A (weight 4), B (weight 2), D (weight 1)
       update distances:
         distances = { A: 0, B: 1, C: 3, D: 4 }
         previous = { A: null, B: A, C: B, D: C }
         priority queue = [(D, 4)]

    5. process vertex D:
       current vertex = D, distance = 4
       neighbors: B (weight 5), C (weight 1)
       no updates needed as D is the destination vertex

    6. reconstruct the path:
       start from D and trace back using the previous map:
         D -> C -> B -> A
       reverse the path to get the correct order:
         A -> B -> C -> D

time complexity is O((V + E) log V)
*/
export class Dijkstra {
	static shortestPath(graph: Graph, startVertex: string, endVertex: string): string[] { //optimize to solve for the max allowed to be in the knapsack
		const queue = new PriorityQueue<string>();	
		const distances: { [vertex: string]: number } = {}; // a map of the vertices and distances
    const previous: { [vertex: string]: string | null }  = {}; // a map of previously visited vertices
    const path: string[] = []; // to return the shortest path
    let smallest: string | null = null;

    for (let vertex in graph) { // initialize the distances and queue
			if (vertex === startVertex) {
				distances[vertex] = 0;
				queue.push(vertex, 0);
			} else {
				distances[vertex] = Infinity;
				queue.push(vertex, Infinity);
			}

			previous[vertex] = null;
    }

    while (queue.values.length) { // process the queue
			const node = queue.pull();
			if (!node) break;
      
			smallest = node.value;
			if (smallest === endVertex) {
				while (previous[smallest as string]) { // build the path
					path.push(smallest as string);
					smallest = previous[smallest as string];
				}

				break;
			}
				
			if (smallest || distances[smallest] !== Infinity) {
				for (const neighbor in graph[smallest]) {
					const candidate = distances[smallest] + graph[smallest][neighbor]; // calculate new distance to neighboring node
					if (candidate < distances[neighbor]) {
						distances[neighbor] = candidate; // update new smallest distance to neighbor
						previous[neighbor] = smallest; // update previous - how we got to neighbor
						queue.push(neighbor, candidate); // enqueue in priority queue with new priority
					}
				}
			}
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