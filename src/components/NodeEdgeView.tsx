import React from 'react';
import { Graph } from '../core/Graph';
import './NodeEdgeView.css';

interface NodeEdgeViewProps {
  graph: Graph;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  algorithmResult?: any;
}

const NodeEdgeView: React.FC<NodeEdgeViewProps> = ({ graph, algorithmResult }) => {
  const getNodePositions = (numNodes: number) => {
    const positions = [];
    const radius = 200; // Radius of the circle
    const centerX = 300; // Center X position
    const centerY = 300; // Center Y position

    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * 2 * Math.PI - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions.push({ x, y });
    }

    return positions;
  };

  const getNodeClass = (nodeIndex: number) => {
    if (!algorithmResult) return '';
    
    if (algorithmResult.type === 'shortest-path' && algorithmResult.path) {
      if (algorithmResult.path.includes(nodeIndex)) {
        if (algorithmResult.path[0] === nodeIndex || algorithmResult.path[algorithmResult.path.length - 1] === nodeIndex) {
          return 'current';
        }
        return 'path';
      }
    }
    
    return '';
  };

  const getEdgeClass = (from: number, to: number) => {
    if (!algorithmResult) return '';
    
    if (algorithmResult.type === 'shortest-path' && algorithmResult.path) {
      const path = algorithmResult.path;
      for (let i = 0; i < path.length - 1; i++) {
        if (path[i] === from && path[i + 1] === to) {
          return 'highlighted';
        }
      }
    }
    
    return '';
  };

  const renderEdges = () => {
    const edges = [];
    const numNodes = graph.getNumberOfNodes();
    const positions = getNodePositions(numNodes);
    const isDirected = graph.isDirectedGraph();

    for (let from = 0; from < numNodes; from++) {
      for (let to = 0; to < numNodes; to++) {
        const weight = graph.getEdgeWeight(from, to);
        if (weight !== 0) {
          // Skip reverse edges for undirected graphs to avoid duplicates
          if (!isDirected && to < from) continue;

          const x1 = positions[from].x;
          const y1 = positions[from].y;
          const x2 = positions[to].x;
          const y2 = positions[to].y;

          // Calculate edge midpoint for label
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;

          // Calculate angle for arrow
          const angle = Math.atan2(y2 - y1, x2 - x1);
          
          // Adjust endpoint to account for node radius
          const nodeRadius = 20;
          const adjustedX2 = x2 - nodeRadius * Math.cos(angle);
          const adjustedY2 = y2 - nodeRadius * Math.sin(angle);

          const edgeClass = getEdgeClass(from, to);

          edges.push(
            <g key={`edge-${from}-${to}`}>
              <line
                className={`edge ${edgeClass}`}
                x1={x1}
                y1={y1}
                x2={isDirected ? adjustedX2 : x2}
                y2={isDirected ? adjustedY2 : y2}
                markerEnd={isDirected ? 'url(#arrowhead)' : undefined}
              />
              <text
                className="edge-label"
                x={midX}
                y={midY}
              >
                {weight}
              </text>
            </g>
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
      const nodeClass = getNodeClass(i);
      
      nodes.push(
        <g key={`node-${i}`} className="node-group">
          <circle
            className={`node-circle ${nodeClass}`}
            cx={positions[i].x}
            cy={positions[i].y}
            r={20}
          />
          <text
            className="node-label"
            x={positions[i].x}
            y={positions[i].y}
          >
            {i}
          </text>
        </g>
      );
    }

    return nodes;
  };

  return (
    <div className="node-edge-view-container">
      <svg width="600" height="600" className="graph-svg">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              className="edge-arrow"
            />
          </marker>
        </defs>
        {renderEdges()}
        {renderNodes()}
      </svg>
      
      <div className="node-legend">
        <div className="legend-item">
          <div className="legend-node default"></div>
          <span>צומת רגיל</span>
        </div>
        {algorithmResult && algorithmResult.type === 'shortest-path' && (
          <>
            <div className="legend-item">
              <div className="legend-node current"></div>
              <span>התחלה/סיום</span>
            </div>
            <div className="legend-item">
              <div className="legend-node path"></div>
              <span>במסלול</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NodeEdgeView;