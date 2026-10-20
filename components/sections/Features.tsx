import React from 'react';
import { Feature } from '../../types';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { Calendar, Brain, Clock, CheckSquare, Award, AlertCircle } from 'lucide-react';

const FEATURES: Feature[] = [
  {
    id: 1,
    title: "DYNAMIC TIMETABLE MATRIX",
    description: "Weekly class schedule visualization with classroom numbers, course codes, and faculty details.",
    icon: <Calendar className="w-5 h-5 text-neon-cyan" />
  },
  {
    id: 2,
    title: "FREE PERIOD INTELLIGENCE",
    description: "Automatically detects gaps between lectures to schedule productive revision and lab prep.",
    icon: <Clock className="w-5 h-5 text-neon-purple" />
  },
  {
    id: 3,
    title: "CONVERSATIONAL ACADEMIC AI",
    description: "Natural dialogue for asking next class locations, exam dates, syllabus status, and study advice.",
    icon: <Brain className="w-5 h-5 text-yellow-400" />
  },
  {
    id: 4,
    title: "STUDY PLANNER & FOCUS TIMER",
    description: "Built-in Pomodoro focus timer with structured revision goals mapped to your exam syllabus.",
    icon: <Clock className="w-5 h-5 text-pink-500" />
  },
  {
    id: 5,
    title: "ASSIGNMENTS & LAB TRACKER",
    description: "Priority-tagged submission tracker with deadline countdowns and one-click completion toggles.",
    icon: <CheckSquare className="w-5 h-5 text-green-400" />
  },
  {
    id: 6,
    title: "ATTENDANCE CRITICAL TELEMETRY",
    description: "Active monitoring of the 75% mandatory attendance threshold with early warning alerts.",
    icon: <AlertCircle className="w-5 h-5 text-blue-400" />
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-space-900 relative">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/5 pb-8">
            <div>
               <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">STUDENT INTELLIGENCE</h2>
               <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                  College Timetable & Study Planning Core Modules
               </p>
            </div>
            <div className="text-right hidden md:block">
               <span className="text-xs font-mono text-neon-cyan">SEMESTER 5 READY</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.id} delay={index * 0.1}>
              <TiltCard>
                <div className="h-full p-8 rounded-2xl bg-space-950/40 border border-white/5 hover:border-neon-cyan/50 transition-all duration-500 group flex flex-col justify-between">
                   <div>
                      <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-neon-cyan/30 transition-all duration-300 mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold font-display text-white mb-3 group-hover:text-neon-cyan transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">
                        {feature.description}
                      </p>
                   </div>
                   
                   <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-600">MOD_0{feature.id}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-neon-cyan transition-colors"></div>
                   </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};
