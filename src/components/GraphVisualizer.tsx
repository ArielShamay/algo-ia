import React, { useState } from 'react';
import { Graph } from '../core/Graph';
import MatrixView from './MatrixView';
import NodeEdgeView from './NodeEdgeView';

interface GraphVisualizerProps {
  graph: Graph | null;
  algorithmResult?: any;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  graph,
  algorithmResult,
}) => {
  const [view, setView] = useState<'matrix' | 'node-edge'>('node-edge');
  const [showWeights, setShowWeights] = useState(true);

  const toggleView = () => {
    setView((prevView) => (prevView === 'matrix' ? 'node-edge' : 'matrix'));
  };

  // חילוץ מידע להדגשה מתוצאת האלגוריתם
  const getHighlightedPath = (): number[] => {
    if (!algorithmResult) return [];

    if (algorithmResult.path) {
      return algorithmResult.path;
    }

    if (algorithmResult.cyclePath) {
      return algorithmResult.cyclePath;
    }

    return [];
  };

  const getHighlightedNodes = (): number[] => {
    if (!algorithmResult) return [];

    // עבור קשירות או דו-צדדיות, הדגש את כל הקודקודים
    if (
      algorithmResult.algorithm === 'בדיקת קשירות' &&
      algorithmResult.isConnected
    ) {
      return graph
        ? Array.from({ length: graph.getNumberOfNodes() }, (_, i) => i)
        : [];
    }

    if (
      algorithmResult.algorithm === 'בדיקת דו-צדדיות' &&
      algorithmResult.isBipartite
    ) {
      return graph
        ? Array.from({ length: graph.getNumberOfNodes() }, (_, i) => i)
        : [];
    }

    return [];
  };

  // הודעת סטטוס מעוצבת
  const renderStatusMessage = () => {
    if (!algorithmResult) return null;

    // בדיקת קשירות
    if (algorithmResult.algorithm === 'בדיקת קשירות') {
      return (
        <div
          style={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            background: algorithmResult.isConnected ? '#c6f6d5' : '#fed7d7',
            color: algorithmResult.isConnected ? '#22543d' : '#742a2a',
            border: `3px solid ${
              algorithmResult.isConnected ? '#48bb78' : '#f56565'
            }`,
          }}
        >
          {algorithmResult.isConnected ? '✅ הגרף קשיר' : '❌ הגרף לא קשיר'}
        </div>
      );
    }

    // בדיקת דו-צדדיות
    if (algorithmResult.algorithm === 'בדיקת דו-צדדיות') {
      return (
        <div
          style={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            background: algorithmResult.isBipartite ? '#c6f6d5' : '#fed7d7',
            color: algorithmResult.isBipartite ? '#22543d' : '#742a2a',
            border: `3px solid ${
              algorithmResult.isBipartite ? '#48bb78' : '#f56565'
            }`,
          }}
        >
          {algorithmResult.isBipartite
            ? '✅ הגרף דו-צדדי'
            : '❌ הגרף לא דו-צדדי'}
        </div>
      );
    }

    // זיהוי מעגלים
    if (algorithmResult.algorithm === 'זיהוי מעגלים') {
      return (
        <div
          style={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            background: algorithmResult.hasCycle ? '#fed7d7' : '#c6f6d5',
            color: algorithmResult.hasCycle ? '#742a2a' : '#22543d',
            border: `3px solid ${
              algorithmResult.hasCycle ? '#f56565' : '#48bb78'
            }`,
          }}
        >
          {algorithmResult.hasCycle
            ? '🔄 נמצא מעגל בגרף!'
            : '✅ אין מעגלים בגרף'}
          {algorithmResult.cyclePath && (
            <div style={{ fontSize: '1rem', marginTop: '10px' }}>
              מסלול המעגל: {algorithmResult.cyclePath.join(' → ')}
            </div>
          )}
        </div>
      );
    }

    // מסלול קצר
    if (algorithmResult.algorithm === 'מסלול קצר ביותר') {
      return (
        <div
          style={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            background: algorithmResult.path ? '#c6f6d5' : '#fed7d7',
            color: algorithmResult.path ? '#22543d' : '#742a2a',
            border: `3px solid ${algorithmResult.path ? '#48bb78' : '#f56565'}`,
          }}
        >
          {algorithmResult.path ? (
            <>
              🛤️ נמצא מסלול קצר!
              <div style={{ fontSize: '1rem', marginTop: '10px' }}>
                מרחק: {algorithmResult.distance} | מסלול:{' '}
                {algorithmResult.path.join(' → ')}
              </div>
            </>
          ) : (
            '❌ לא נמצא מסלול'
          )}
        </div>
      );
    }

    // מעגל שלילי
    if (algorithmResult.algorithm === 'זיהוי מעגל שלילי') {
      return (
        <div
          style={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            background: algorithmResult.hasNegativeCycle
              ? '#fed7d7'
              : '#c6f6d5',
            color: algorithmResult.hasNegativeCycle ? '#742a2a' : '#22543d',
            border: `3px solid ${
              algorithmResult.hasNegativeCycle ? '#f56565' : '#48bb78'
            }`,
          }}
        >
          {algorithmResult.hasNegativeCycle
            ? '⚠️ נמצא מעגל שלילי!'
            : '✅ אין מעגל שלילי'}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={toggleView}
          style={{
            padding: '10px 20px',
            background: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {view === 'matrix' ? '🎨 עבור לתצוגת גרף' : '📊 עבור לתצוגת מטריצה'}
        </button>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={showWeights}
            onChange={(e) => setShowWeights(e.target.checked)}
            style={{ width: '20px', height: '20px' }}
          />
          <span style={{ fontWeight: '600', color: '#555' }}>הצג משקלים</span>
        </label>
      </div>

      {renderStatusMessage()}

      {graph ? (
        view === 'matrix' ? (
          <MatrixView matrix={graph.adjacencyMatrix} />
        ) : (
          <NodeEdgeView
            graph={graph}
            highlightedPath={getHighlightedPath()}
            highlightedNodes={getHighlightedNodes()}
            showWeights={showWeights}
          />
        )
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '60px',
            fontSize: '1.2rem',
            color: '#999',
          }}
        >
          📊 אין גרף להצגה. צור או טען גרף כדי להתחיל.
        </div>
      )}
    </div>
  );
};

export default GraphVisualizer;
