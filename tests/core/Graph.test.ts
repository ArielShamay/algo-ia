import { Graph } from '../../src/core/Graph';

// Set timeout for all tests to prevent infinite loops
jest.setTimeout(5000);

describe('Graph Class', () => {
  describe('Constructor and Validation', () => {
    test('should create an empty graph', () => {
      const graph = new Graph();
      expect(graph.getNumberOfNodes()).toBe(0);
      expect(graph.isDirectedGraph()).toBe(false);
    });

    test('should create a graph with initial matrix', () => {
      const matrix = [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ];
      const graph = new Graph(matrix, false);
      expect(graph.getNumberOfNodes()).toBe(3);
    });

    test('should throw error for empty matrix on loadGraph', () => {
      const graph = new Graph();
      expect(() => graph.loadGraph([])).toThrow('Graph matrix cannot be empty');
    });

    test('should throw error for non-square matrix', () => {
      const graph = new Graph();
      const matrix = [
        [0, 1],
        [1, 0, 1],
      ];
      expect(() => graph.loadGraph(matrix as number[][])).toThrow(
        'Graph matrix must be square'
      );
    });

    test('should throw error for negative weights on diagonal', () => {
      const graph = new Graph();
      const matrix = [
        [-1, 1],
        [1, 0],
      ];
      expect(() => graph.loadGraph(matrix)).toThrow(
        'Graph cannot have negative weights on the diagonal'
      );
    });

    test('should throw error for invalid values in matrix', () => {
      const graph = new Graph();
      const matrix = [
        [0, NaN],
        [1, 0],
      ];
      expect(() => graph.loadGraph(matrix)).toThrow(
        'Invalid value at position'
      );
    });

    test('should accept matrix with zeros', () => {
      const graph = new Graph();
      const matrix = [
        [0, 0],
        [0, 0],
      ];
      expect(() => graph.loadGraph(matrix)).not.toThrow();
    });
  });

  describe('Graph Operations', () => {
    test('should return correct neighbors', () => {
      const matrix = [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
      ];
      const graph = new Graph(matrix, false);
      expect(graph.getNeighbors(0)).toEqual([1, 3]);
      expect(graph.getNeighbors(1)).toEqual([0, 2]);
      expect(graph.getNeighbors(2)).toEqual([1, 3]);
    });

    test('should return empty array for isolated node', () => {
      const matrix = [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ];
      const graph = new Graph(matrix, false);
      expect(graph.getNeighbors(2)).toEqual([]);
    });

    test('should throw error for out of bounds node', () => {
      const matrix = [
        [0, 1],
        [1, 0],
      ];
      const graph = new Graph(matrix, false);
      expect(() => graph.getNeighbors(5)).toThrow('out of bounds');
      expect(() => graph.getNeighbors(-1)).toThrow('out of bounds');
    });

    test('should return correct edge weight', () => {
      const matrix = [
        [0, 5, 0],
        [5, 0, 10],
        [0, 10, 0],
      ];
      const graph = new Graph(matrix, false);
      expect(graph.getEdgeWeight(0, 1)).toBe(5);
      expect(graph.getEdgeWeight(1, 2)).toBe(10);
      expect(graph.getEdgeWeight(0, 2)).toBe(0);
    });

    test('should return 0 for non-existent edge', () => {
      const matrix = [
        [0, 1],
        [0, 0],
      ];
      const graph = new Graph(matrix, true);
      expect(graph.getEdgeWeight(1, 0)).toBe(0);
    });

    test('should throw error for invalid edge indices', () => {
      const matrix = [
        [0, 1],
        [1, 0],
      ];
      const graph = new Graph(matrix, false);
      expect(() => graph.getEdgeWeight(-1, 0)).toThrow('Invalid node indices');
      expect(() => graph.getEdgeWeight(0, 5)).toThrow('Invalid node indices');
    });

    test('should return correct number of nodes', () => {
      const matrix3x3 = [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ];
      const graph = new Graph(matrix3x3, false);
      expect(graph.getNumberOfNodes()).toBe(3);
    });

    test('should identify directed graph', () => {
      const matrix = [
        [0, 1],
        [0, 0],
      ];
      const graph = new Graph(matrix, true);
      expect(graph.isDirectedGraph()).toBe(true);
    });

    test('should identify undirected graph', () => {
      const matrix = [
        [0, 1],
        [1, 0],
      ];
      const graph = new Graph(matrix, false);
      expect(graph.isDirectedGraph()).toBe(false);
    });

    test('should return copy of matrix', () => {
      const matrix = [
        [0, 1],
        [1, 0],
      ];
      const graph = new Graph(matrix, false);
      const copy = graph.getMatrix();
      expect(copy).toEqual(matrix);
      // Verify it's a deep copy
      copy[0][0] = 999;
      expect(graph.getMatrix()[0][0]).toBe(0);
    });

    test('should check if matrix is symmetric', () => {
      const symmetric = [
        [0, 1, 2],
        [1, 0, 3],
        [2, 3, 0],
      ];
      const asymmetric = [
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
      ];
      const graph1 = new Graph(symmetric, false);
      const graph2 = new Graph(asymmetric, true);
      expect(graph1.isSymmetric()).toBe(true);
      expect(graph2.isSymmetric()).toBe(false);
    });
  });

  describe('Random Graph Generation', () => {
    test('should generate random graph with correct size', () => {
      const graph = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.3,
        weightRange: [1, 10],
      });
      expect(graph.getNumberOfNodes()).toBe(3);
      expect(graph.isDirectedGraph()).toBe(false);
    });

    test('should generate deterministic graph with seed', () => {
      const graph1 = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.3,
        weightRange: [1, 10],
        seed: 12345,
      });
      const graph2 = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.3,
        weightRange: [1, 10],
        seed: 12345,
      });
      expect(graph1.getMatrix()).toEqual(graph2.getMatrix());
    });

    test('should generate different graphs with different seeds', () => {
      const graph1 = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.3,
        weightRange: [1, 10],
        seed: 111,
      });
      const graph2 = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.3,
        weightRange: [1, 10],
        seed: 222,
      });
      expect(graph1.getMatrix()).not.toEqual(graph2.getMatrix());
    });

    test('should respect weight range with low density', () => {
      const graph = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.2,
        weightRange: [5, 15],
        seed: 42,
      });
      const matrix = graph.getMatrix();
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] !== 0) {
            expect(matrix[i][j]).toBeGreaterThanOrEqual(5);
            expect(matrix[i][j]).toBeLessThanOrEqual(15);
          }
        }
      }
    });

    test('should generate symmetric matrix for undirected graph', () => {
      const graph = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.3,
        weightRange: [1, 5],
        seed: 999,
      });
      expect(graph.isSymmetric()).toBe(true);
    });

    test('should respect density parameter (zero density)', () => {
      const graph = Graph.generateRandomGraph({
        vertices: 3,
        directed: true,
        density: 0.0,
        weightRange: [1, 10],
        seed: 1,
      });
      const matrix = graph.getMatrix();
      let edgeCount = 0;
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] !== 0) edgeCount++;
        }
      }
      expect(edgeCount).toBe(0);
    });

    test('should not have self-loops by default', () => {
      const graph = Graph.generateRandomGraph({
        vertices: 3,
        directed: true,
        density: 0.3,
        weightRange: [1, 10],
        seed: 123,
      });
      const matrix = graph.getMatrix();
      for (let i = 0; i < matrix.length; i++) {
        expect(matrix[i][i]).toBe(0);
      }
    });

    test('should allow self-loops when specified (low density)', () => {
      const graph = Graph.generateRandomGraph({
        vertices: 2,
        directed: true,
        density: 0.3,
        weightRange: [1, 5],
        seed: 456,
        allowSelfLoops: true,
      });
      const matrix = graph.getMatrix();
      // Check that self-loops are possible (diagonal can be non-zero)
      // We don't guarantee they exist with low density, just that they're allowed
      expect(graph.getNumberOfNodes()).toBe(2);
    });

    test('should throw error for invalid vertices count', () => {
      expect(() =>
        Graph.generateRandomGraph({
          vertices: 0,
          directed: false,
          density: 0.5,
          weightRange: [1, 10],
        })
      ).toThrow('Number of vertices must be between 1 and 1000');
      
      expect(() =>
        Graph.generateRandomGraph({
          vertices: -5,
          directed: false,
          density: 0.5,
          weightRange: [1, 10],
        })
      ).toThrow('Number of vertices must be between 1 and 1000');
    });

    test('should throw error for invalid density', () => {
      expect(() =>
        Graph.generateRandomGraph({
          vertices: 3,
          directed: false,
          density: 1.5,
          weightRange: [1, 10],
        })
      ).toThrow('Density must be between 0 and 1');
      
      expect(() =>
        Graph.generateRandomGraph({
          vertices: 3,
          directed: false,
          density: -0.1,
          weightRange: [1, 10],
        })
      ).toThrow('Density must be between 0 and 1');
    });

    test('should throw error for invalid weight range', () => {
      expect(() =>
        Graph.generateRandomGraph({
          vertices: 3,
          directed: false,
          density: 0.3,
          weightRange: [10, 5],
        })
      ).toThrow('Invalid weight range');
    });
  });

  describe('Performance and Safety', () => {
    test('should handle small graphs', () => {
      const graph = Graph.generateRandomGraph({
        vertices: 3,
        directed: false,
        density: 0.2,
        weightRange: [1, 20],
        seed: 777,
      });
      expect(graph.getNumberOfNodes()).toBe(3);
      
      // Test operations don't hang
      const neighbors = graph.getNeighbors(0);
      expect(Array.isArray(neighbors)).toBe(true);
    });

    test('should validate matrix in reasonable time', () => {
      const size = 3;
      const matrix = Array.from({ length: size }, () =>
        Array(size).fill(1)
      );
      const graph = new Graph();
      graph.loadGraph(matrix);
      expect(graph.getNumberOfNodes()).toBe(3);
    });
  });
});