import { Graph } from '../../src/core/Graph';
import { Algorithms } from '../../src/core/Algorithms';
import { ShortestPathResult, CycleResult, BipartiteResult } from '../../src/core/types';

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

    test('isContainsCycle should return false for acyclic graph', () => {
        expect(Algorithms.isContainsCycle(graph)).toEqual({ hasCycle: false });
    });

    test('isBipartite should return true for bipartite graph', () => {
        expect(Algorithms.isBipartite(graph)).toEqual({ isBipartite: true });
    });

    test('negativeCycle should return false for graph without negative cycles', () => {
        expect(Algorithms.negativeCycle(graph)).toEqual({ hasNegativeCycle: false });
    });
});