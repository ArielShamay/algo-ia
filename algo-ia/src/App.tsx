import React, { useReducer } from 'react';
import GraphVisualizer from './components/GraphVisualizer';
import { Graph } from './core/Graph';
import { AlgorithmResultType } from './core/types';

const initialState = {
    graph: null,
    algorithmResult: null,
    loading: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'LOAD_GRAPH':
            return { ...state, graph: action.payload, loading: false };
        case 'SET_ALGORITHM_RESULT':
            return { ...state, algorithmResult: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: true };
        default:
            return state;
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <GraphVisualizer graph={state.graph} />
            {state.algorithmResult && (
                <pre>{JSON.stringify(state.algorithmResult, null, 2)}</pre>
            )}
        </div>
    );
};

export default App;