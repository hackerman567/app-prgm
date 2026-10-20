import React from 'react';
import { Github, Twitter, Disc } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-space-950 border-t border-white/5 py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-display font-bold text-white tracking-widest mb-1">
            HALL-O-FLOW
          </h2>
          <p className="text-gray-600 text-xs font-mono">System v1.0.4 // Online</p>
        </div>

        <div className="flex gap-8">
           <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors transform hover:scale-110"><Github size={20} /></a>
           <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors transform hover:scale-110"><Twitter size={20} /></a>
           <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors transform hover:scale-110"><Disc size={20} /></a>
        </div>

        <div className="text-center md:text-right text-xs text-gray-600 font-mono">
          <p>&copy; {new Date().getFullYear()} Hall-o-Flow Systems.</p>
          <p className="mt-1">All protocols reserved.</p>
        </div>

      </div>
    </footer>
  );
};
