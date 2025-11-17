import React from 'react';
import { render, screen } from '@testing-library/react';
import GraphVisualizer from '../../src/components/GraphVisualizer';
import { Graph } from '../../src/core/Graph';

describe('GraphVisualizer Component', () => {
    test('renders without crashing when graph is null', () => {
        render(<GraphVisualizer graph={null} />);
        expect(screen.getByText(/no graph data available/i)).toBeInTheDocument();
    });

    test('renders MatrixView when selected', () => {
        const graph = new Graph();
        graph.loadGraph([[0, 1], [1, 0]]);
        render(<GraphVisualizer graph={graph} />);
        
        // Assuming there's a way to switch to MatrixView
        // This part would depend on how the component is implemented
        // For example, if there's a button to switch views:
        const switchToMatrixViewButton = screen.getByRole('button', { name: /matrix view/i });
        switchToMatrixViewButton.click();

        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    test('renders NodeEdgeView when selected', () => {
        const graph = new Graph();
        graph.loadGraph([[0, 1], [1, 0]]);
        render(<GraphVisualizer graph={graph} />);
        
        // Assuming there's a way to switch to NodeEdgeView
        const switchToNodeEdgeViewButton = screen.getByRole('button', { name: /node edge view/i });
        switchToNodeEdgeViewButton.click();

        expect(screen.getByTestId('svg-graph')).toBeInTheDocument();
    });
});