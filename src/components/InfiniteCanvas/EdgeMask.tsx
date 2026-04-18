import React from 'react';

interface EdgeMaskProps {
  direction: 'left' | 'right';
  width?: number;
}

export const EdgeMask: React.FC<EdgeMaskProps> = ({
  direction,
  width = 120,
}) => {
  const isLeft = direction === 'left';

  return (
    <div
      className="absolute top-0 bottom-0 pointer-events-none z-10"
      style={{
        width,
        [isLeft ? 'left' : 'right']: 0,
        background: isLeft
          ? 'linear-gradient(to right, var(--background), transparent)'
          : 'linear-gradient(to left, var(--background), transparent)',
      }}
    />
  );
};
