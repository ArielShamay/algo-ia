// Error type for graph operations
export interface GraphError {
  message: string;
  code?: string;
}

// Result for shortest path algorithms
export interface ShortestPathResult {
  distance: number;
  path?: number[];
  error?: string;
}

// Result for cycle detection
export interface CycleResult {
  hasCycle: boolean;
  cyclePath?: number[];
  error?: string;
}

// Result for bipartite checking
export interface BipartiteResult {
  isBipartite: boolean;
  partitions?: [number[], number[]];
  error?: string;
}

// Result for negative cycle detection
export interface NegativeCycleResult {
  hasNegativeCycle: boolean;
  cyclePath?: number[];
  error?: string;
}

// Options for random graph generation
export interface RandomGraphOptions {
  vertices: number;
  directed: boolean;
  density: number; // between 0 and 1
  weightRange: [number, number]; // [min, max] range of weights
  seed?: number; // optional seed for deterministic generation
  allowSelfLoops?: boolean; // optional, default false
}

// Union type for all algorithm results
export type AlgorithmResult =
  | ShortestPathResult
  | CycleResult
  | BipartiteResult
  | NegativeCycleResult
  | GraphError;

// Deprecated - for backwards compatibility
export type AlgorithmResultType = AlgorithmResult;