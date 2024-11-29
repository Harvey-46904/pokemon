// src/components/StatBar.tsx
import React from 'react';

interface StatBarProps {
  name: string;
  value: number;
}

const StatBar: React.FC<StatBarProps> = ({ name, value }) => {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between">
        <strong>{name}:</strong>
        <span>{value}</span>
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${value}%` }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;
