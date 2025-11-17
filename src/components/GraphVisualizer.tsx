import React, { useState } from 'react';
import { Graph } from '../core/Graph';
import MatrixView from './MatrixView';
import NodeEdgeView from './NodeEdgeView';
import './GraphVisualizer.css';

interface GraphVisualizerProps {
  graph: Graph | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  algorithmResult?: any;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ graph, algorithmResult }) => {
  const [view, setView] = useState<'matrix' | 'node-edge'>('node-edge');

  if (!graph) {
    return (
      <div className="no-graph">
        <div className="no-graph-icon">📊</div>
        <p>אין נתוני גרף זמינים. אנא צור גרף חדש.</p>
      </div>
    );
  }

  const numNodes = graph.getNumberOfNodes();
  const isDirected = graph.isDirectedGraph();

  return (
    <div className="graph-visualizer">
      <div className="view-controls">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${view === 'node-edge' ? 'active' : ''}`}
            onClick={() => setView('node-edge')}
          >
            תצוגת גרף
          </button>
          <button
            className={`toggle-btn ${view === 'matrix' ? 'active' : ''}`}
            onClick={() => setView('matrix')}
          >
            תצוגת מטריצה
          </button>
        </div>
        <div className="graph-info">
          <strong>צמתים:</strong> {numNodes} | 
          <strong> סוג:</strong> {isDirected ? ' מכוון' : ' לא מכוון'}
        </div>
      </div>
      
      {view === 'matrix' ? (
        <MatrixView matrix={graph.adjacencyMatrix} />
      ) : (
        <NodeEdgeView graph={graph} algorithmResult={algorithmResult} />
      )}
    </div>
  );
};

export default GraphVisualizer;