import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-8 py-3 uppercase font-display tracking-[0.15em] text-sm font-bold overflow-hidden group transition-all duration-300";
  
  const variants = {
    primary: "bg-transparent text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:border-white/40 hover:bg-white/10 backdrop-blur-md",
    glass: "bg-glass border border-white/10 text-gray-300 hover:text-white hover:border-neon-purple/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
         <div className="absolute inset-0 bg-neon-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
      )}
    </button>
  );
};
