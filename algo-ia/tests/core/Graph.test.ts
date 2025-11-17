import { Graph } from '../../src/core/Graph';
import { GraphError } from '../../src/core/types';

describe('Graph Class', () => {
    let graph: Graph;

    beforeEach(() => {
        graph = new Graph();
    });

    test('should load a valid graph matrix', () => {
        const matrix = [
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0]
        ];
        graph.loadGraph(matrix);
        expect(graph.getNumberOfNodes()).toBe(3);
        expect(graph.getNeighbors(1)).toEqual([0, 2]);
    });

    test('should throw error for empty matrix', () => {
        expect(() => graph.loadGraph([])).toThrow(GraphError);
    });

    test('should throw error for non-square matrix', () => {
        const matrix = [
            [0, 1],
            [1, 0, 1]
        ];
        expect(() => graph.loadGraph(matrix)).toThrow(GraphError);
    });

    test('should throw error for negative weights on diagonal', () => {
        const matrix = [
            [-1, 1],
            [1, -1]
        ];
        expect(() => graph.loadGraph(matrix)).toThrow(GraphError);
    });

    test('should generate a random graph', () => {
        const randomGraph = Graph.generateRandomGraph({
            vertices: 5,
            directed: false,
            density: 0.5,
            weightRange: [1, 10]
        });
        expect(randomGraph.getNumberOfNodes()).toBe(5);
    });

    test('should return correct edge weight', () => {
        const matrix = [
            [0, 2],
            [2, 0]
        ];
        graph.loadGraph(matrix);
        expect(graph.getEdgeWeight(0, 1)).toBe(2);
    });

    test('should return neighbors of a node', () => {
        const matrix = [
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0]
        ];
        graph.loadGraph(matrix);
        expect(graph.getNeighbors(0)).toEqual([1]);
    });

    test('should return number of nodes', () => {
        const matrix = [
            [0, 1],
            [1, 0]
        ];
        graph.loadGraph(matrix);
        expect(graph.getNumberOfNodes()).toBe(2);
    });

    test('should identify if the graph is directed', () => {
        const matrix = [
            [0, 1],
            [0, 0]
        ];
        graph.loadGraph(matrix);
        expect(graph.isDirectedGraph()).toBe(true);
    });
});