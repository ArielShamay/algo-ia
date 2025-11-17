import React, { useReducer } from 'react';
import GraphVisualizer from './components/GraphVisualizer';

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
    default:
      return state;
  }
}

const App = () => {
  const [state] = useReducer(reducer, initialState);
  // const [state, dispatch] = useReducer(reducer, initialState);

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
