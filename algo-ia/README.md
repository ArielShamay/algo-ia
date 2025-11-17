# Project Title: Graph Algorithm Visualization

## Overview

This project is a web application designed to visualize various graph algorithms. Built using TypeScript and React, it allows users to interact with graph data and see the results of different algorithms in real-time.

## Features

- **Graph Visualization**: Display graphs in both matrix and node-edge formats.
- **Algorithm Implementation**: Includes implementations for various graph algorithms such as:
  - Depth-First Search (DFS)
  - Breadth-First Search (BFS)
  - Bellman-Ford for shortest paths
  - Cycle detection
  - Bipartite checking
- **Random Graph Generation**: Ability to generate random graphs based on user-defined parameters.

## Project Structure

```
algo-ia
├── src
│   ├── core
│   │   ├── Graph.ts          # Class for managing graph data
│   │   ├── Algorithms.ts     # Static methods for graph algorithms
│   │   └── types.ts          # Type definitions and interfaces
│   ├── components
│   │   ├── GraphVisualizer.tsx # Main component for graph display
│   │   ├── MatrixView.tsx    # Component for displaying adjacency matrix
│   │   └── NodeEdgeView.tsx  # Component for rendering graph with SVG
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Entry point for the React application
├── public
│   └── index.html            # Main HTML file
├── tests
│   ├── core
│   │   ├── Graph.test.ts     # Unit tests for Graph class
│   │   └── Algorithms.test.ts # Unit tests for Algorithms class
│   └── components
│       └── GraphVisualizer.test.tsx # Unit tests for GraphVisualizer component
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── jest.config.js             # Jest configuration for testing
├── .eslintrc.js               # ESLint configuration
├── .prettierrc                # Prettier configuration
└── README.md                  # Project documentation
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd algo-ia
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## Testing

To run the tests, use the following command:

```
npm test
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
