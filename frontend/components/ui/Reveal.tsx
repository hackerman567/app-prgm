import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: 'fit-content' | '100%';
  direction?: 'up' | 'left' | 'right';
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  delay = 0, 
  width = '100%',
  direction = 'up'
}) => {
  const [ref, isVisible] = useIntersectionObserver(0.15);

  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-50px)';
      case 'right': return 'translateX(50px)';
      case 'up': 
      default: return 'translateY(75px)';
    }
  };

  return (
    <div ref={ref} style={{ width, overflow: 'hidden' }}>
      <div
        style={{
          transform: isVisible ? 'translate(0, 0)' : getTransform(),
          opacity: isVisible ? 1 : 0,
          transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
