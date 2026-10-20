import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-cyan/50 pointer-events-none z-[100] transition-transform duration-100 ease-out hidden md:block mix-blend-difference"
        style={{ 
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})` 
        }}
      >
        <div className="absolute inset-0 rounded-full bg-neon-cyan/10 animate-pulse"></div>
      </div>
      <div 
        className="fixed top-0 left-0 w-1 h-1 bg-neon-purple rounded-full pointer-events-none z-[100] hidden md:block"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)` 
        }}
      />
    </>
  );
};
