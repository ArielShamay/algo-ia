import React from 'react';
import './MatrixView.css';

interface MatrixViewProps {
    matrix: number[][];
}

const MatrixView: React.FC<MatrixViewProps> = ({ matrix }) => {
    const getCellClass = (value: number) => {
        if (value === 0) return 'zero-weight';
        if (value < 0) return 'negative-weight';
        if (value > 0) return 'positive-weight has-edge';
        return '';
    };

    return (
        <div className="matrix-view-container">
            <table className="matrix-table">
                <thead>
                    <tr>
                        <th></th>
                        {matrix.map((_, index) => (
                            <th key={index}>{index}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <th>{rowIndex}</th>
                            {row.map((cell, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={getCellClass(cell)}
                                    title={`[${rowIndex}][${colIndex}] = ${cell}`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="matrix-legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ background: '#e8ffe8' }}></div>
                    <span>משקל חיובי</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ background: '#ffe8e8' }}></div>
                    <span>משקל שלילי</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ background: 'white', color: '#ccc' }}></div>
                    <span>אין קשת (0)</span>
                </div>
            </div>
        </div>
    );
};

export default MatrixView;