import React from 'react';
import { Graph } from '../core/Graph';

interface NodeEdgeViewProps {
  graph: Graph;
  highlightedPath?: number[];
  highlightedNodes?: number[];
  showWeights?: boolean;
}

const NodeEdgeView: React.FC<NodeEdgeViewProps> = ({
  graph,
  highlightedPath = [],
  highlightedNodes = [],
  showWeights = true,
}) => {
  const getNodePositions = (numNodes: number) => {
    const positions = [];
    const radius = 220; // Radius of the circle
    const centerX = 300; // Center X position
    const centerY = 300; // Center Y position

    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * 2 * Math.PI - Math.PI / 2; // התחל מלמעלה
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions.push({ x, y });
    }

    return positions;
  };

  const isEdgeHighlighted = (from: number, to: number): boolean => {
    if (highlightedPath.length === 0) return false;
    for (let i = 0; i < highlightedPath.length - 1; i++) {
      if (highlightedPath[i] === from && highlightedPath[i + 1] === to) {
        return true;
      }
      // עבור גרף לא מכוון, בדוק גם בכיוון ההפוך
      if (
        !graph.isDirectedGraph() &&
        highlightedPath[i] === to &&
        highlightedPath[i + 1] === from
      ) {
        return true;
      }
    }
    return false;
  };

  const renderEdges = () => {
    const edges = [];
    const numNodes = graph.getNumberOfNodes();
    const positions = getNodePositions(numNodes);

    for (let from = 0; from < numNodes; from++) {
      for (let to = 0; to < numNodes; to++) {
        const weight = graph.getEdgeWeight(from, to);
        if (weight !== 0) {
          const isHighlighted = isEdgeHighlighted(from, to);
          const edgeColor = isHighlighted
            ? '#48bb78'
            : weight < 0
            ? '#f56565'
            : '#4a5568';
          const edgeWidth = isHighlighted ? 4 : 2;

          // בחירת marker מתאים לצבע
          let markerEnd = '';
          if (graph.isDirectedGraph()) {
            if (isHighlighted) {
              markerEnd = 'url(#arrowhead-green)';
            } else if (weight < 0) {
              markerEnd = 'url(#arrowhead-red)';
            } else {
              markerEnd = 'url(#arrowhead)';
            }
          }

          // מיקום אמצע הצלע למשקל
          const midX = (positions[from].x + positions[to].x) / 2;
          const midY = (positions[from].y + positions[to].y) / 2;

          edges.push(
            <g key={`edge-${from}-${to}`}>
              <line
                x1={positions[from].x}
                y1={positions[from].y}
                x2={positions[to].x}
                y2={positions[to].y}
                stroke={edgeColor}
                strokeWidth={edgeWidth}
                markerEnd={markerEnd}
              />
              {showWeights && weight !== 1 && (
                <text
                  x={midX}
                  y={midY}
                  fill={weight < 0 ? '#c53030' : '#2d3748'}
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  dy="-5"
                  style={{ backgroundColor: 'white', padding: '2px' }}
                >
                  {weight}
                </text>
              )}
            </g>,
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
      const isHighlighted =
        highlightedNodes.includes(i) || highlightedPath.includes(i);
      const nodeColor = isHighlighted ? '#48bb78' : '#4299e1';
      const nodeRadius = isHighlighted ? 25 : 20;

      nodes.push(
        <g key={`node-${i}`}>
          <circle
            cx={positions[i].x}
            cy={positions[i].y}
            r={nodeRadius}
            fill={nodeColor}
            stroke="#2d3748"
            strokeWidth="2"
          />
          <text
            x={positions[i].x}
            y={positions[i].y}
            textAnchor="middle"
            dy=".35em"
            fill="white"
            fontSize="16"
            fontWeight="bold"
          >
            {i}
          </text>
        </g>,
      );
    }

    return nodes;
  };

  return (
    <svg
      width="600"
      height="600"
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* הגדרת חץ לגרפים מכוונים */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#4a5568" />
        </marker>
        <marker
          id="arrowhead-green"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#48bb78" />
        </marker>
        <marker
          id="arrowhead-red"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#f56565" />
        </marker>
      </defs>
      {renderEdges()}
      {renderNodes()}
    </svg>
  );
};

export default NodeEdgeView;
