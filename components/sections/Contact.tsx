import React from 'react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
       <div className="absolute inset-0 bg-space-950">
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-neon-purple/5 to-transparent"></div>
       </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        <Reveal>
          <span className="text-neon-cyan text-xs font-mono tracking-widest uppercase mb-6 block">Join the Beta</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
            Ready to Upgrade Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Mindset?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-gray-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">
            Early access is limited. Secure your spot in the next generation of time engineering.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <form className="max-w-md mx-auto space-y-4">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="ENTER_EMAIL_ADDRESS" 
                className="w-full bg-space-900/50 border border-white/10 py-4 px-6 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan transition-colors rounded-lg font-mono text-sm"
              />
              <div className="absolute inset-0 border border-neon-cyan/0 group-hover:border-neon-cyan/20 rounded-lg pointer-events-none transition-all"></div>
            </div>
            <div className="pt-4">
              <Button variant="primary" className="w-full">
                REQUEST ACCESS
              </Button>
            </div>
          </form>
          <p className="mt-8 text-xs text-gray-600 font-mono">
             ENCRYPTED CONNECTION // SECURE PROTOCOL
          </p>
        </Reveal>

      </div>
    </section>
  );
};
