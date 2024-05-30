import { Graph } from '../types.js';


export class GraphData {
	static get = (): Graph => {
		return { 
			A: { B: 1, C: 4 },
			B: { A: 1, C: 2, D: 5 },
			C: { A: 4, B: 2, D: 1 },
			D: { B: 5, C: 1 }
		}
	}
}