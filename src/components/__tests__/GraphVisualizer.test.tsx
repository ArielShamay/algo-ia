import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GraphVisualizer from '../GraphVisualizer';
import { Graph } from '../../core/Graph';

describe('GraphVisualizer Component', () => {
    test('renders without crashing when graph is null', () => {
        render(<GraphVisualizer graph={null} />);
        expect(screen.getByText(/no graph data available/i)).toBeInTheDocument();
    });

    test('renders MatrixView by default', () => {
        const graph = new Graph();
        graph.loadGraph([[0, 1], [1, 0]]);
        render(<GraphVisualizer graph={graph} />);
        
        // MatrixView should be displayed by default
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    test('switches to NodeEdgeView when button is clicked', () => {
        const graph = new Graph();
        graph.loadGraph([[0, 1], [1, 0]]);
        render(<GraphVisualizer graph={graph} />);
        
        // Find and click the button to switch to Node/Edge View
        const switchButton = screen.getByRole('button', { name: /switch to node\/edge view/i });
        fireEvent.click(switchButton);

        // After clicking, we should see an SVG element (part of NodeEdgeView)
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    test('switches back to MatrixView when button is clicked again', () => {
        const graph = new Graph();
        graph.loadGraph([[0, 1], [1, 0]]);
        render(<GraphVisualizer graph={graph} />);
        
        // Click to switch to Node/Edge View
        const switchButton = screen.getByRole('button');
        fireEvent.click(switchButton);
        
        // Click again to switch back to Matrix View
        fireEvent.click(switchButton);
        
        expect(screen.getByRole('table')).toBeInTheDocument();
    });
});
