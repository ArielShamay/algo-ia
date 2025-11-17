import React, { useReducer, useState } from 'react';
import GraphVisualizer from './components/GraphVisualizer';
import { Graph } from './core/Graph';
import Algorithms from './core/Algorithms';
import './App.css';

interface AppState {
  graph: Graph | null;
  algorithmResult: any;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  graph: null,
  algorithmResult: null,
  loading: false,
  error: null,
};

type AppAction =
  | { type: 'LOAD_GRAPH'; payload: Graph }
  | { type: 'SET_ALGORITHM_RESULT'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_RESULT' };

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_GRAPH':
      return { ...state, graph: action.payload, loading: false, error: null };
    case 'SET_ALGORITHM_RESULT':
      return { ...state, algorithmResult: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_RESULT':
      return { ...state, algorithmResult: null, error: null };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [matrixInput, setMatrixInput] = useState('[[0,1,0],[0,0,1],[1,0,0]]');
  const [vertices, setVertices] = useState(6);
  const [density, setDensity] = useState(0.3);
  const [isDirected, setIsDirected] = useState(true);
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(2);

  // טעינת גרף ידני מ-JSON
  const handleLoadGraph = () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const matrix = JSON.parse(matrixInput);
      const graph = new Graph(matrix, isDirected);
      dispatch({ type: 'LOAD_GRAPH', payload: graph });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: `שגיאה: ${(error as Error).message}`,
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // יצירת גרף אוטומטי
  const handleGenerateRandom = () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const graph = Graph.generateRandomGraph({
        vertices,
        directed: isDirected,
        density,
        weightRange: [1, 10],
        seed: Date.now(),
      });
      dispatch({ type: 'LOAD_GRAPH', payload: graph });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: `שגיאה: ${(error as Error).message}`,
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // הרצת אלגוריתם
  const runAlgorithm = (algorithmName: string) => {
    if (!state.graph) {
      dispatch({ type: 'SET_ERROR', payload: 'אין גרף! טען או צור גרף קודם.' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      let result: any;

      switch (algorithmName) {
        case 'isConnected':
          result = {
            algorithm: 'בדיקת קשירות',
            isConnected: Algorithms.isConnected(state.graph),
          };
          break;
        case 'shortestPath':
          result = {
            algorithm: 'מסלול קצר ביותר',
            ...Algorithms.shortestPath(state.graph, startNode, endNode),
            from: startNode,
            to: endNode,
          };
          break;
        case 'isContainsCycle':
          result = {
            algorithm: 'זיהוי מעגלים',
            ...Algorithms.isContainsCycle(state.graph),
          };
          break;
        case 'isBipartite':
          result = {
            algorithm: 'בדיקת דו-צדדיות',
            ...Algorithms.isBipartite(state.graph),
          };
          break;
        case 'negativeCycle':
          result = {
            algorithm: 'זיהוי מעגל שלילי',
            hasNegativeCycle: Algorithms.negativeCycle(state.graph),
          };
          break;
        default:
          throw new Error('אלגוריתם לא ידוע');
      }

      dispatch({ type: 'SET_ALGORITHM_RESULT', payload: result });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: `שגיאה: ${(error as Error).message}`,
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="app-container">
      {/* כותרת */}
      <header className="app-header">
        <h1>🔷 ויזואליזציית אלגוריתמי גרפים</h1>
        <p>צור גרף והרץ אלגוריתמים שונים עליו</p>
      </header>

      <div className="main-content">
        {/* תפריט צד */}
        <aside className="sidebar">
          <div className="section">
            <h2>📊 יצירת גרף</h2>

            {/* גרף ידני */}
            <div className="control-group">
              <h3>יצירה ידנית</h3>
              <textarea
                value={matrixInput}
                onChange={(e) => setMatrixInput(e.target.value)}
                placeholder="למשל: [[0,1,0],[0,0,1],[1,0,0]]"
                rows={4}
              />
              <button onClick={handleLoadGraph} className="btn btn-primary">
                📥 טען גרף מ-JSON
              </button>
            </div>

            {/* גרף אוטומטי */}
            <div className="control-group">
              <h3>יצירה אוטומטית</h3>
              <label>
                מספר קודקודים: {vertices}
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={vertices}
                  onChange={(e) => setVertices(Number(e.target.value))}
                />
              </label>
              <label>
                צפיפות: {density.toFixed(2)}
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.1"
                  value={density}
                  onChange={(e) => setDensity(Number(e.target.value))}
                />
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isDirected}
                  onChange={(e) => setIsDirected(e.target.checked)}
                />
                גרף מכוון
              </label>
              <button
                onClick={handleGenerateRandom}
                className="btn btn-success"
              >
                🎲 צור גרף רנדומלי
              </button>
            </div>
          </div>

          {/* אלגוריתמים */}
          <div className="section">
            <h2>🧮 אלגוריתמים</h2>

            <button
              onClick={() => runAlgorithm('isConnected')}
              className="btn btn-algorithm"
              disabled={!state.graph}
            >
              🔗 בדיקת קשירות
            </button>

            <div className="control-group">
              <h3>מסלול קצר</h3>
              <label>
                קודקוד התחלה:
                <input
                  type="number"
                  value={startNode}
                  onChange={(e) => setStartNode(Number(e.target.value))}
                  min="0"
                  max={state.graph ? state.graph.getNumberOfNodes() - 1 : 0}
                />
              </label>
              <label>
                קודקוד סיום:
                <input
                  type="number"
                  value={endNode}
                  onChange={(e) => setEndNode(Number(e.target.value))}
                  min="0"
                  max={state.graph ? state.graph.getNumberOfNodes() - 1 : 0}
                />
              </label>
              <button
                onClick={() => runAlgorithm('shortestPath')}
                className="btn btn-algorithm"
                disabled={!state.graph}
              >
                🛤️ מצא מסלול קצר
              </button>
            </div>

            <button
              onClick={() => runAlgorithm('isContainsCycle')}
              className="btn btn-algorithm"
              disabled={!state.graph}
            >
              🔄 זהה מעגלים
            </button>

            <button
              onClick={() => runAlgorithm('isBipartite')}
              className="btn btn-algorithm"
              disabled={!state.graph}
            >
              ⚖️ בדוק דו-צדדיות
            </button>

            <button
              onClick={() => runAlgorithm('negativeCycle')}
              className="btn btn-algorithm"
              disabled={!state.graph}
            >
              ⚠️ זהה מעגל שלילי
            </button>

            <button
              onClick={() => dispatch({ type: 'CLEAR_RESULT' })}
              className="btn btn-clear"
              disabled={!state.algorithmResult}
            >
              🗑️ נקה תוצאות
            </button>
          </div>
        </aside>

        {/* אזור תצוגה */}
        <main className="visualization-area">
          {state.loading && <div className="loading">⏳ טוען...</div>}

          {state.error && <div className="error">❌ {state.error}</div>}

          {state.graph && (
            <div className="graph-info">
              <p>
                📈 גרף {state.graph.isDirectedGraph() ? 'מכוון' : 'לא מכוון'} עם{' '}
                {state.graph.getNumberOfNodes()} קודקודים
              </p>
            </div>
          )}

          <GraphVisualizer
            graph={state.graph}
            algorithmResult={state.algorithmResult}
          />

          {state.algorithmResult && (
            <div className="result-panel">
              <h3>📋 תוצאות אלגוריתם</h3>
              <pre>{JSON.stringify(state.algorithmResult, null, 2)}</pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
