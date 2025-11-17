import React, { useState } from 'react';
import { Graph } from '../core/Graph';
import MatrixView from './MatrixView';
import NodeEdgeView from './NodeEdgeView';

interface GraphVisualizerProps {
  graph: Graph | null;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ graph }) => {
  const [view, setView] = useState<'matrix' | 'node-edge'>('matrix');

  const toggleView = () => {
    setView((prevView) => (prevView === 'matrix' ? 'node-edge' : 'matrix'));
  };

  return (
    <div>
      <button onClick={toggleView}>
        Switch to {view === 'matrix' ? 'Node/Edge View' : 'Matrix View'}
      </button>
      {graph ? (
        view === 'matrix' ? (
          <MatrixView matrix={graph.adjacencyMatrix} />
        ) : (
          <NodeEdgeView graph={graph} />
        )
      ) : (
        <p>No graph data available.</p>
      )}
    </div>
  );
};

export default GraphVisualizer;
