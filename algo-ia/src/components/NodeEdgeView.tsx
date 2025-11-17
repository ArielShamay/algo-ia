import React from 'react';
import { Graph } from '../core/Graph';

interface NodeEdgeViewProps {
  graph: Graph;
}

const NodeEdgeView: React.FC<NodeEdgeViewProps> = ({ graph }) => {
  const getNodePositions = (numNodes: number) => {
    const positions = [];
    const radius = 200; // Radius of the circle
    const centerX = 250; // Center X position
    const centerY = 250; // Center Y position

    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions.push({ x, y });
    }

    return positions;
  };

  const renderEdges = () => {
    const edges = [];
    const numNodes = graph.getNumberOfNodes();
    const positions = getNodePositions(numNodes);

    for (let from = 0; from < numNodes; from++) {
      for (let to = 0; to < numNodes; to++) {
        if (graph.getEdgeWeight(from, to) > 0) {
          edges.push(
            <line
              key={`edge-${from}-${to}`}
              x1={positions[from].x}
              y1={positions[from].y}
              x2={positions[to].x}
              y2={positions[to].y}
              stroke="black"
            />
          );
        }
      }
    }

    return edges;
  };

  const renderNodes = () => {
    const nodes = [];
    const numNodes = graph.getNumberOfNodes();
    const positions = getNodePositions(numNodes);

    for (let i = 0; i < numNodes; i++) {
      nodes.push(
        <g key={`node-${i}`}>
          <circle cx={positions[i].x} cy={positions[i].y} r={20} fill="lightblue" />
          <text x={positions[i].x} y={positions[i].y} textAnchor="middle" dy=".35em">
            {i}
          </text>
        </g>
      );
    }

    return nodes;
  };

  return (
    <svg width="500" height="500">
      {renderEdges()}
      {renderNodes()}
    </svg>
  );
};

export default NodeEdgeView;