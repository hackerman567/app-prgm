import React, { useEffect, useRef } from 'react';
import { Theme } from '../../types';

interface StarFieldProps {
  speedMultiplier?: number;
  isWarping?: boolean;
  theme?: Theme;
}

export const StarField: React.FC<StarFieldProps> = ({ 
  speedMultiplier = 1,
  isWarping = false,
  theme = 'cyber'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; size: number }[] = [];
    
    const initStars = () => {
      stars = [];
      const numStars = isWarping ? 1500 : 800; 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          size: Math.random() * 2
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const animate = () => {
      const isRoyal = theme === 'royal';
      
      ctx.fillStyle = isRoyal ? '#050505' : '#030014';
      
      if (isWarping) {
         ctx.fillStyle = isRoyal ? 'rgba(5, 5, 5, 0.2)' : 'rgba(3, 0, 20, 0.2)';
      }
      
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      const baseSpeed = isWarping ? 50 : 0.2;
      const speed = baseSpeed * speedMultiplier;

      stars.forEach((star) => {
        star.z -= speed;
        
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const x = (star.x / star.z) * canvas.width + cx;
        const y = (star.y / star.z) * canvas.height + cy;
        
        const radius = (1 - star.z / canvas.width) * star.size * (isWarping ? 0.5 : 1.5);

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          const alpha = 1 - star.z / canvas.width;
          
          ctx.beginPath();
          
          if (isWarping) {
             const prevX = (star.x / (star.z + speed * 2)) * canvas.width + cx;
             const prevY = (star.y / (star.z + speed * 2)) * canvas.height + cy;
             
             ctx.moveTo(prevX, prevY);
             ctx.lineTo(x, y);
             ctx.strokeStyle = isRoyal 
                ? `rgba(212, 175, 55, ${alpha})` 
                : `rgba(188, 19, 254, ${alpha})`;
             ctx.lineWidth = radius * 2;
             ctx.stroke();
          } else {
             ctx.arc(x, y, radius, 0, Math.PI * 2);
             
             const rand = Math.random();
             if (isRoyal) {
                if (rand > 0.95) ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
                else if (rand > 0.9) ctx.fillStyle = `rgba(229, 228, 226, ${alpha})`;
                else ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
             } else {
                if (rand > 0.95) ctx.fillStyle = `rgba(188, 19, 254, ${alpha})`;
                else if (rand > 0.9) ctx.fillStyle = `rgba(0, 243, 255, ${alpha})`;
                else ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
             }
             
             ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier, isWarping, theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: isWarping ? 1 : 0.7 }}
    />
  );
};
