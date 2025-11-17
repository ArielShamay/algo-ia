import React from 'react';

interface MatrixViewProps {
  matrix: number[][];
}

const MatrixView: React.FC<MatrixViewProps> = ({ matrix }) => {
  return (
    <table>
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
              <td key={colIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatrixView;
