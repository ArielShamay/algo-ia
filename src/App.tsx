import React, { useReducer, useState } from 'react';
import GraphVisualizer from './components/GraphVisualizer';
import { Graph } from './core/Graph';
import Algorithms from './core/Algorithms';
import './App.css';

const initialState = {
    graph: null,
    algorithmResult: null,
    loading: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: any, action: any) {
    switch (action.type) {
        case 'LOAD_GRAPH':
            return { ...state, graph: action.payload, loading: false };
        case 'SET_ALGORITHM_RESULT':
            return { ...state, algorithmResult: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: true };
        case 'CLEAR':
            return { ...initialState };
        default:
            return state;
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Graph generation parameters
    const [numNodes, setNumNodes] = useState(5);
    const [density, setDensity] = useState(0.3);
    const [minWeight, setMinWeight] = useState(1);
    const [maxWeight, setMaxWeight] = useState(10);
    const [isDirected, setIsDirected] = useState(false);
    const [allowSelfLoops, setAllowSelfLoops] = useState(false);
    
    // Algorithm parameters
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
    const [startNode, setStartNode] = useState(0);
    const [endNode, setEndNode] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const generateRandomGraph = () => {
        try {
            setError(null);
            dispatch({ type: 'SET_LOADING' });
            
            const graph = Graph.generateRandomGraph({
                vertices: numNodes,
                directed: isDirected,
                density: density,
                weightRange: [minWeight, maxWeight],
                seed: Date.now(),
                allowSelfLoops: allowSelfLoops,
            });
            
            dispatch({ type: 'LOAD_GRAPH', payload: graph });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'שגיאה ביצירת הגרף');
        }
    };

    const runAlgorithm = () => {
        if (!state.graph) {
            setError('אנא צור גרף תחילה');
            return;
        }

        try {
            setError(null);
            dispatch({ type: 'SET_LOADING' });
            let result;

            switch (selectedAlgorithm) {
                case 'dfs':
                case 'bfs':
                    setError('אלגוריתמים אלו טרם מומשו במלואם');
                    dispatch({ type: 'SET_ALGORITHM_RESULT', payload: null });
                    break;
                case 'shortest-path':
                    result = Algorithms.shortestPath(state.graph, startNode, endNode);
                    dispatch({ type: 'SET_ALGORITHM_RESULT', payload: { type: 'shortest-path', ...result } });
                    break;
                case 'cycle':
                    result = Algorithms.isContainsCycle(state.graph);
                    dispatch({ type: 'SET_ALGORITHM_RESULT', payload: { type: 'cycle', ...result } });
                    break;
                case 'bipartite':
                    result = Algorithms.isBipartite(state.graph);
                    dispatch({ type: 'SET_ALGORITHM_RESULT', payload: { type: 'bipartite', ...result } });
                    break;
                case 'negative-cycle':
                    result = Algorithms.negativeCycle(state.graph);
                    dispatch({ type: 'SET_ALGORITHM_RESULT', payload: { type: 'negative-cycle', hasNegativeCycle: result } });
                    break;
                case 'connected':
                    result = Algorithms.isConnected(state.graph);
                    dispatch({ type: 'SET_ALGORITHM_RESULT', payload: { type: 'connected', isConnected: result } });
                    break;
                default:
                    setError('אנא בחר אלגוריתם');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'שגיאה בהרצת האלגוריתם');
        }
    };

    const clearAll = () => {
        dispatch({ type: 'CLEAR' });
        setError(null);
    };

    const renderAlgorithmResult = () => {
        if (!state.algorithmResult) return null;

        const { type, ...data } = state.algorithmResult;

        switch (type) {
            case 'shortest-path':
                return (
                    <div className="result-item">
                        <div className="result-label">מסלול קצר ביותר:</div>
                        <div className="result-value">
                            <div>מרחק: {data.distance === Infinity ? 'אין מסלול' : data.distance}</div>
                            {data.path && <div>מסלול: {data.path.join(' → ')}</div>}
                        </div>
                    </div>
                );
            case 'cycle':
                return (
                    <div className="result-item">
                        <div className="result-label">זיהוי מעגלים:</div>
                        <div className="result-value">
                            {data.hasCycle ? 'הגרף מכיל מעגל' : 'הגרף אינו מכיל מעגל'}
                        </div>
                    </div>
                );
            case 'bipartite':
                return (
                    <div className="result-item">
                        <div className="result-label">בדיקת דו-צדדיות:</div>
                        <div className="result-value">
                            {data.isBipartite ? 'הגרף הוא דו-צדדי' : 'הגרף אינו דו-צדדי'}
                        </div>
                    </div>
                );
            case 'negative-cycle':
                return (
                    <div className="result-item">
                        <div className="result-label">מעגל שלילי:</div>
                        <div className="result-value">
                            {data.hasNegativeCycle ? 'נמצא מעגל שלילי' : 'לא נמצא מעגל שלילי'}
                        </div>
                    </div>
                );
            case 'connected':
                return (
                    <div className="result-item">
                        <div className="result-label">קשירות:</div>
                        <div className="result-value">
                            {data.isConnected ? 'הגרף קשיר' : 'הגרף אינו קשיר'}
                        </div>
                    </div>
                );
            default:
                return <pre>{JSON.stringify(data, null, 2)}</pre>;
        }
    };

    return (
        <div className="app-container">
            <div className="app-header">
                <h1>ויזואליזציית אלגוריתמי גרפים</h1>
                <p>כלי אינטראקטיבי להמחשת אלגוריתמי גרפים</p>
            </div>

            <div className="controls-section">
                <h2>הגדרות גרף</h2>
                <div className="control-row">
                    <div className="control-group">
                        <label>מספר צמתים:</label>
                        <input
                            type="number"
                            min="2"
                            max="20"
                            value={numNodes}
                            onChange={(e) => setNumNodes(parseInt(e.target.value) || 2)}
                        />
                    </div>
                    <div className="control-group">
                        <label>צפיפות (0-1):</label>
                        <input
                            type="number"
                            min="0"
                            max="1"
                            step="0.1"
                            value={density}
                            onChange={(e) => setDensity(parseFloat(e.target.value) || 0)}
                        />
                    </div>
                    <div className="control-group">
                        <label>משקל מינימלי:</label>
                        <input
                            type="number"
                            value={minWeight}
                            onChange={(e) => setMinWeight(parseInt(e.target.value) || 1)}
                        />
                    </div>
                    <div className="control-group">
                        <label>משקל מקסימלי:</label>
                        <input
                            type="number"
                            value={maxWeight}
                            onChange={(e) => setMaxWeight(parseInt(e.target.value) || 10)}
                        />
                    </div>
                </div>
                <div className="control-row">
                    <div className="control-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={isDirected}
                                onChange={(e) => setIsDirected(e.target.checked)}
                            />
                            {' '}גרף מכוון
                        </label>
                    </div>
                    <div className="control-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={allowSelfLoops}
                                onChange={(e) => setAllowSelfLoops(e.target.checked)}
                            />
                            {' '}אפשר לולאות עצמיות
                        </label>
                    </div>
                </div>
                <div className="button-group">
                    <button className="btn btn-primary" onClick={generateRandomGraph}>
                        צור גרף אקראי
                    </button>
                    <button className="btn btn-warning" onClick={clearAll}>
                        נקה הכל
                    </button>
                </div>
            </div>

            {state.graph && (
                <div className="controls-section">
                    <h2>בחירת אלגוריתם</h2>
                    <div className="control-row">
                        <div className="control-group">
                            <label>אלגוריתם:</label>
                            <select
                                value={selectedAlgorithm}
                                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                            >
                                <option value="">-- בחר אלגוריתם --</option>
                                <option value="shortest-path">מסלול קצר ביותר</option>
                                <option value="cycle">זיהוי מעגלים</option>
                                <option value="bipartite">בדיקת דו-צדדיות</option>
                                <option value="negative-cycle">זיהוי מעגל שלילי</option>
                                <option value="connected">בדיקת קשירות</option>
                            </select>
                        </div>
                        {selectedAlgorithm === 'shortest-path' && (
                            <>
                                <div className="control-group">
                                    <label>צומת התחלה:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max={numNodes - 1}
                                        value={startNode}
                                        onChange={(e) => setStartNode(parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="control-group">
                                    <label>צומת סיום:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max={numNodes - 1}
                                        value={endNode}
                                        onChange={(e) => setEndNode(parseInt(e.target.value) || 0)}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="button-group">
                        <button
                            className="btn btn-success"
                            onClick={runAlgorithm}
                            disabled={!selectedAlgorithm}
                        >
                            הרץ אלגוריתם
                        </button>
                    </div>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="visualization-section">
                <GraphVisualizer graph={state.graph} algorithmResult={state.algorithmResult} />
            </div>

            {state.algorithmResult && (
                <div className="results-section">
                    <h2 className="results-title">תוצאות האלגוריתם</h2>
                    {renderAlgorithmResult()}
                </div>
            )}
        </div>
    );
};

export default App;