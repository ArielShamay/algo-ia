class Graph {
    adjacencyMatrix: number[][];
    directed: boolean;

    constructor(adjacencyMatrix: number[][], directed: boolean) {
        this.adjacencyMatrix = adjacencyMatrix;
        this.directed = directed;
    }

    loadGraph(matrix: number[][]): void {
        if (matrix.length === 0) {
            throw new Error("Graph matrix cannot be empty.");
        }
        if (matrix.length !== matrix[0].length) {
            throw new Error("Graph matrix must be square.");
        }
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][i] < 0) {
                throw new Error("Graph cannot have negative weights on the diagonal.");
            }
        }
        this.adjacencyMatrix = matrix;
    }

    static generateRandomGraph(options: RandomGraphOptions): Graph {
        const { vertices, directed, density, weightRange, seed } = options;
        // Random graph generation logic goes here
        // This is a placeholder for the actual implementation
        const matrix: number[][] = Array.from({ length: vertices }, () => 
            Array.from({ length: vertices }, () => Math.random() < density ? Math.floor(Math.random() * (weightRange[1] - weightRange[0] + 1)) + weightRange[0] : 0)
        );
        return new Graph(matrix, directed);
    }

    getNeighbors(node: number): number[] {
        return this.adjacencyMatrix[node].map((weight, index) => weight > 0 ? index : -1).filter(index => index !== -1);
    }

    getEdgeWeight(from: number, to: number): number {
        return this.adjacencyMatrix[from][to];
    }

    getNumberOfNodes(): number {
        return this.adjacencyMatrix.length;
    }

    isDirectedGraph(): boolean {
        return this.directed;
    }
}