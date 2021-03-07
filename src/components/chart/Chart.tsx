import React from 'react';

const generateDataset = () => (
  Array(10).fill(0).map(() => ([
    Math.random() * 80 + 10,
    Math.random() * 35 + 10,
  ]))
)

export const Chart = () => {
  const dataset = generateDataset();

  return (
    <svg viewBox="0 0 100 50">
      {dataset.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
        />
      ))}
    </svg>
  )
}
