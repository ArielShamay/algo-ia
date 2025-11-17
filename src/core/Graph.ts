import { RandomGraphOptions } from './types';
import seedrandom from 'seedrandom';

// Maximum iterations to prevent infinite loops
const MAX_ITERATIONS = 1000000;

export class Graph {
  adjacencyMatrix: number[][];
  directed: boolean;

  constructor(adjacencyMatrix: number[][] = [], directed = false) {
    this.adjacencyMatrix = adjacencyMatrix;
    this.directed = directed;
    
    // Validate on construction if matrix is provided
    if (adjacencyMatrix.length > 0) {
      this.validateMatrix(adjacencyMatrix);
    }
  }

  /**
   * Validates the graph matrix according to requirements
   * @throws Error if validation fails
   */
  private validateMatrix(matrix: number[][]): void {
    // Check if matrix is empty
    if (!matrix || matrix.length === 0) {
      throw new Error('Graph matrix cannot be empty.');
    }

    const n = matrix.length;

    // Check if matrix is square
    for (let i = 0; i < n; i++) {
      if (!matrix[i] || matrix[i].length !== n) {
        throw new Error('Graph matrix must be square (same number of rows and columns).');
      }
    }

    // Check for negative weights on diagonal (self-loops with negative weight)
    for (let i = 0; i < n; i++) {
      if (matrix[i][i] < 0) {
        throw new Error(`Graph cannot have negative weights on the diagonal. Found at position [${i}][${i}].`);
      }
    }

    // Validate all values are numbers
    let iterationCount = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (iterationCount++ > MAX_ITERATIONS) {
          throw new Error('Validation exceeded maximum iterations - matrix too large.');
        }
        if (typeof matrix[i][j] !== 'number' || isNaN(matrix[i][j])) {
          throw new Error(`Invalid value at position [${i}][${j}]. All values must be numbers.`);
        }
      }
    }
  }

  /**
   * Loads a new graph matrix, replacing the current one
   * @param matrix - The adjacency matrix to load
   * @throws Error if validation fails
   */
  loadGraph(matrix: number[][]): void {
    this.validateMatrix(matrix);
    this.adjacencyMatrix = matrix;
  }

  /**
   * Generates a random graph based on the provided options
   * @param options - Configuration for random graph generation
   * @returns A new Graph instance
   */
  static generateRandomGraph(options: RandomGraphOptions): Graph {
    const {
      vertices,
      directed,
      density,
      weightRange,
      seed,
      allowSelfLoops = false,
    } = options;

    // Validate options
    if (vertices <= 0 || vertices > 1000) {
      throw new Error('Number of vertices must be between 1 and 1000.');
    }
    if (density < 0 || density > 1) {
      throw new Error('Density must be between 0 and 1.');
    }
    if (weightRange[0] > weightRange[1]) {
      throw new Error('Invalid weight range: min must be <= max.');
    }

    const rng = seed !== undefined ? seedrandom(seed.toString()) : Math.random;

    const matrix: number[][] = Array.from({ length: vertices }, () =>
      Array(vertices).fill(0)
    );

    const maxIterations = vertices * vertices * 2; // Safety limit
    let iterationCount = 0;

    for (let i = 0; i < vertices; i++) {
      for (let j = 0; j < vertices; j++) {
        if (iterationCount++ > maxIterations) {
          throw new Error('Graph generation exceeded maximum iterations.');
        }

        // Skip diagonal unless self-loops are allowed
        if (i === j && !allowSelfLoops) {
          matrix[i][j] = 0;
          continue;
        }

        // For undirected graphs, only fill upper triangle
        if (!directed && j < i) {
          matrix[i][j] = matrix[j][i];
          continue;
        }

        // Generate random value once for both checks
        const edgeRandom = rng();
        
        // Add edge based on density
        if (edgeRandom < density) {
          const weightRandom = rng();
          const weight =
            Math.floor(weightRandom * (weightRange[1] - weightRange[0] + 1)) +
            weightRange[0];
          matrix[i][j] = weight;

          // Mirror for undirected graphs
          if (!directed && i !== j) {
            matrix[j][i] = weight;
          }
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    return new Graph(matrix, directed);
  }

  /**
   * Returns the neighbors of a given node
   * @param node - The node index
   * @returns Array of neighbor indices
   */
  getNeighbors(node: number): number[] {
    if (node < 0 || node >= this.adjacencyMatrix.length) {
      throw new Error(`Node ${node} is out of bounds.`);
    }

    const neighbors: number[] = [];
    const row = this.adjacencyMatrix[node];
    
    let iterationCount = 0;
    for (let i = 0; i < row.length; i++) {
      if (iterationCount++ > MAX_ITERATIONS) {
        throw new Error('getNeighbors exceeded maximum iterations.');
      }
      if (row[i] !== 0) {
        neighbors.push(i);
      }
    }

    return neighbors;
  }

  /**
   * Returns the weight of an edge between two nodes
   * @param from - Source node index
   * @param to - Target node index
   * @returns The edge weight (0 if no edge exists)
   */
  getEdgeWeight(from: number, to: number): number {
    if (
      from < 0 ||
      from >= this.adjacencyMatrix.length ||
      to < 0 ||
      to >= this.adjacencyMatrix.length
    ) {
      throw new Error(`Invalid node indices: from=${from}, to=${to}`);
    }
    return this.adjacencyMatrix[from][to];
  }

  /**
   * Returns the total number of nodes in the graph
   * @returns Number of nodes
   */
  getNumberOfNodes(): number {
    return this.adjacencyMatrix.length;
  }

  /**
   * Checks if the graph is directed
   * @returns true if directed, false otherwise
   */
  isDirectedGraph(): boolean {
    return this.directed;
  }

  /**
   * Returns a deep copy of the adjacency matrix
   * @returns Copy of the adjacency matrix
   */
  getMatrix(): number[][] {
    return this.adjacencyMatrix.map((row) => [...row]);
  }

  /**
   * Checks if the graph is actually symmetric (for validation of undirected graphs)
   * @returns true if the matrix is symmetric
   */
  isSymmetric(): boolean {
    const n = this.adjacencyMatrix.length;
    let iterationCount = 0;
    
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (iterationCount++ > MAX_ITERATIONS) {
          throw new Error('isSymmetric exceeded maximum iterations.');
        }
        if (this.adjacencyMatrix[i][j] !== this.adjacencyMatrix[j][i]) {
          return false;
        }
      }
    }
    return true;
  }
}