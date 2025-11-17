import { Graph } from './Graph';
import { ShortestPathResult, CycleResult, BipartiteResult } from './types';

export default class Algorithms {
  static isConnected(graph: Graph): boolean {
    const visited = new Set<number>();
    const dfs = (node: number) => {
      visited.add(node);
      const neighbors = graph.getNeighbors(node);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    dfs(0); // Start DFS from the first node
    return visited.size === graph.getNumberOfNodes();
  }

  static shortestPath(
    graph: Graph,
    start: number,
    end: number,
  ): ShortestPathResult {
    const distances: number[] = new Array(graph.getNumberOfNodes()).fill(
      Infinity,
    );
    const previous: (number | null)[] = new Array(
      graph.getNumberOfNodes(),
    ).fill(null);
    distances[start] = 0;

    const queue: number[] = [start];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current === undefined) break;
      const neighbors = graph.getNeighbors(current);

      for (const neighbor of neighbors) {
        const weight = graph.getEdgeWeight(current, neighbor);
        const newDistance = distances[current] + weight;

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;
          queue.push(neighbor);
        }
      }
    }

    const path: number[] = [];
    let at: number | null = end;
    while (at !== null) {
      path.push(at);
      at = previous[at];
    }
    path.reverse();

    return { path, distance: distances[end] };
  }

  static isContainsCycle(graph: Graph): CycleResult {
    const visited = new Set<number>();
    const recStack = new Set<number>();

    const dfs = (node: number): boolean => {
      if (!visited.has(node)) {
        visited.add(node);
        recStack.add(node);

        const neighbors = graph.getNeighbors(node);
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor) && dfs(neighbor)) {
            return true;
          } else if (recStack.has(neighbor)) {
            return true;
          }
        }
      }
      recStack.delete(node);
      return false;
    };

    for (let i = 0; i < graph.getNumberOfNodes(); i++) {
      if (dfs(i)) {
        return { hasCycle: true };
      }
    }
    return { hasCycle: false };
  }

  static isBipartite(graph: Graph): BipartiteResult {
    const color: (number | null)[] = new Array(graph.getNumberOfNodes()).fill(
      null,
    );
    const bfs = (start: number): boolean => {
      const queue: number[] = [start];
      color[start] = 0;

      while (queue.length > 0) {
        const node = queue.shift();
        if (node === undefined) break;
        const neighbors = graph.getNeighbors(node);

        for (const neighbor of neighbors) {
          if (color[neighbor] === null) {
            const nodeColor = color[node];
            if (nodeColor !== null) {
              color[neighbor] = 1 - nodeColor;
            }
            queue.push(neighbor);
          } else if (color[neighbor] === color[node]) {
            return false;
          }
        }
      }
      return true;
    };

    for (let i = 0; i < graph.getNumberOfNodes(); i++) {
      if (color[i] === null && !bfs(i)) {
        return { isBipartite: false };
      }
    }
    return { isBipartite: true };
  }

  static negativeCycle(graph: Graph): boolean {
    const distances: number[] = new Array(graph.getNumberOfNodes()).fill(
      Infinity,
    );
    distances[0] = 0;

    for (let i = 0; i < graph.getNumberOfNodes() - 1; i++) {
      for (let u = 0; u < graph.getNumberOfNodes(); u++) {
        const neighbors = graph.getNeighbors(u);
        for (const v of neighbors) {
          const weight = graph.getEdgeWeight(u, v);
          if (
            distances[u] !== Infinity &&
            distances[u] + weight < distances[v]
          ) {
            distances[v] = distances[u] + weight;
          }
        }
      }
    }

    for (let u = 0; u < graph.getNumberOfNodes(); u++) {
      const neighbors = graph.getNeighbors(u);
      for (const v of neighbors) {
        const weight = graph.getEdgeWeight(u, v);
        if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
          return true; // Negative cycle found
        }
      }
    }
    return false; // No negative cycle
  }
}
