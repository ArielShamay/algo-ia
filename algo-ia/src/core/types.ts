export interface GraphError {
    message: string;
    code: number;
}

export interface ShortestPathResult {
    path: number[];
    distance: number;
}

export interface CycleResult {
    hasCycle: boolean;
    cyclePath?: number[];
}

export interface BipartiteResult {
    isBipartite: boolean;
    color?: number[];
}

export interface RandomGraphOptions {
    vertices: number;
    directed: boolean;
    density: number; // between 0 and 1
    weightRange: [number, number]; // range of weights
    seed?: number; // optional for testing
}

export type AlgorithmResultType = ShortestPathResult | CycleResult | BipartiteResult | GraphError;