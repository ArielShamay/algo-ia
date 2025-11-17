import { Graph } from '../Graph';
import Algorithms from '../Algorithms';
import { ShortestPathResult } from '../types';

describe('Algorithms', () => {
    let graph: Graph;

    beforeEach(() => {
        graph = new Graph();
        graph.loadGraph([
            [0, 1, 0, 0],
            [1, 0, 1, 1],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]);
    });

    test('isConnected should return true for connected graph', () => {
        expect(Algorithms.isConnected(graph)).toBe(true);
    });

    test('shortestPath should return correct path and distance', () => {
        const result: ShortestPathResult = Algorithms.shortestPath(graph, 0, 2);
        expect(result.distance).toBe(2);
        expect(result.path).toEqual([0, 1, 2]);
    });

    test('isContainsCycle should return true for graph with cycle', () => {
        expect(Algorithms.isContainsCycle(graph)).toEqual({ hasCycle: true });
    });

    test('isContainsCycle should return false for acyclic graph', () => {
        const acyclicGraph = new Graph();
        acyclicGraph.loadGraph([
            [0, 1, 0, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ], true); // directed graph
        expect(Algorithms.isContainsCycle(acyclicGraph)).toEqual({ hasCycle: false });
    });

    test('isBipartite should return true for bipartite graph', () => {
        expect(Algorithms.isBipartite(graph)).toEqual({ isBipartite: true });
    });

    test('negativeCycle should return false for graph without negative cycles', () => {
        expect(Algorithms.negativeCycle(graph)).toBe(false);
    });
});
