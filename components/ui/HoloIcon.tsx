import React from 'react';
import { Mood } from '../../types';

interface HoloIconProps {
  type: Mood | string;
  theme: 'cyber' | 'royal';
}

export const HoloIcon: React.FC<HoloIconProps> = ({ type, theme }) => {
  const color = theme === 'cyber' ? '#00f3ff' : '#D4AF37';
  const secondary = theme === 'cyber' ? '#bc13fe' : '#E5E4E2';

  const renderIcon = () => {
    switch (type) {
      case 'focus':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1 overflow-visible">
            <defs>
              <filter id="glow-focus">
                 <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                 <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="1" fill="none" strokeOpacity="0.3" />
            <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="1" fill="none" strokeDasharray="60" className="animate-spin-slow" />
            <circle cx="50" cy="50" r="15" fill={color} className="animate-pulse" filter="url(#glow-focus)" />
            <line x1="50" y1="20" x2="50" y2="35" stroke={secondary} strokeWidth="2" />
            <line x1="50" y1="65" x2="50" y2="80" stroke={secondary} strokeWidth="2" />
            <line x1="20" y1="50" x2="35" y2="50" stroke={secondary} strokeWidth="2" />
            <line x1="65" y1="50" x2="80" y2="50" stroke={secondary} strokeWidth="2" />
          </svg>
        );
      case 'creative':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1 overflow-visible">
             <path d="M30,70 Q50,10 70,70" stroke={color} strokeWidth="2" fill="none" className="animate-[float_3s_ease-in-out_infinite]" />
             <path d="M20,60 Q50,0 80,60" stroke={secondary} strokeWidth="1" fill="none" className="animate-[float_4s_ease-in-out_infinite]" style={{animationDelay: '1s'}} />
             <circle cx="50" cy="40" r="5" fill={color} className="animate-ping" />
             <circle cx="30" cy="70" r="3" fill={secondary} />
             <circle cx="70" cy="70" r="3" fill={secondary} />
          </svg>
        );
      case 'recovery':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1 overflow-visible">
             <circle cx="50" cy="50" r="35" stroke={secondary} strokeWidth="1" fill="none" opacity="0.5" />
             <path d="M50,85 A35,35 0 0,1 50,15" stroke={color} strokeWidth="2" fill="none" className="animate-[spin_4s_linear_infinite]" />
             <circle cx="50" cy="50" r="20" fill={color} opacity="0.2" className="animate-pulse" />
          </svg>
        );
      case 'maintenance':
        return (
           <svg viewBox="0 0 100 100" className="w-full h-full p-1 overflow-visible">
             <rect x="25" y="25" width="50" height="50" stroke={color} strokeWidth="1" fill="none" />
             <rect x="30" y="30" width="40" height="40" stroke={secondary} strokeWidth="1" fill="none" />
             <line x1="25" y1="25" x2="35" y2="35" stroke={color} strokeWidth="1" />
             <line x1="75" y1="25" x2="65" y2="35" stroke={color} strokeWidth="1" />
             <line x1="25" y1="75" x2="35" y2="65" stroke={color} strokeWidth="1" />
             <line x1="75" y1="75" x2="65" y2="65" stroke={color} strokeWidth="1" />
             <rect x="45" y="45" width="10" height="10" fill={color} className="animate-spin" />
           </svg>
        );
      default:
        return (
           <svg viewBox="0 0 100 100" className="w-full h-full p-1 overflow-visible">
              <circle cx="50" cy="50" r="10" fill={color} />
           </svg>
        );
    }
  };

  return (
    <div className={`w-12 h-12 relative group-hover:scale-105 transition-transform duration-500`}>
      {renderIcon()}
    </div>
  );
};
