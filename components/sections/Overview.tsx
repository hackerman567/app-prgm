import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { BrainCircuit, Clock, Sparkles, BookOpen, Calendar, Target } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <section id="system" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <div className="relative order-2 lg:order-1">
          <Reveal direction="right">
            <TiltCard className="group">
              <div className="relative rounded-2xl border border-white/10 bg-space-900/50 backdrop-blur-xl p-6 md:p-10 overflow-hidden">
                 
                 <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="text-xs font-mono text-neon-cyan">STUDY_AI_TELEMETRY</div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Study Focus Rating</div>
                          <div className="text-4xl font-display text-white">92.4<span className="text-sm text-neon-purple">%</span></div>
                       </div>
                       <div className="h-16 w-32 flex items-end gap-1">
                          {[40, 60, 30, 80, 50, 90, 70, 100].map((h, i) => (
                             <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan opacity-80 rounded-t-sm"></div>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-space-950/50 p-4 rounded border border-white/5">
                          <div className="text-xs text-gray-500 mb-2">NEXT LECTURE</div>
                          <div className="text-white font-mono text-sm">Data Structures</div>
                          <div className="text-neon-cyan text-xs mt-1">LH-302 • 10:30 AM</div>
                       </div>
                       <div className="bg-space-950/50 p-4 rounded border border-white/5">
                          <div className="text-xs text-gray-500 mb-2">STUDY GAP TODAY</div>
                          <div className="text-white font-mono text-sm">90 min Available</div>
                          <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                             <div className="bg-neon-cyan w-[75%] h-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="absolute bottom-4 right-4 text-[10px] text-gray-700 font-mono opacity-20 pointer-events-none">
                    {`{ student: "Ram Malhotra", sem: 5, status: "Active" }`}
                 </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
           <Reveal delay={0.2}>
             <h4 className="text-neon-cyan text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-neon-cyan"></span> Academic System Architecture
             </h4>
           </Reveal>
           
           <Reveal delay={0.3}>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
               Not just a timetable. <br />
               An <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-blue-500">Intelligent Academic Copilot</span> for students.
             </h2>
           </Reveal>
           
           <Reveal delay={0.4}>
             <div className="space-y-8">
                <div className="flex gap-4">
                   <div className="mt-1 p-2 bg-neon-cyan/10 rounded-lg h-fit">
                      <BrainCircuit className="text-neon-cyan w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl text-white font-bold mb-2">Conversational Timetable Navigation</h3>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                         Instantly query where your next class is, check faculty office hours, or get alerted about room changes through natural dialogue.
                      </p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="mt-1 p-2 bg-neon-purple/10 rounded-lg h-fit">
                      <Sparkles className="text-neon-purple w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl text-white font-bold mb-2">Autonomous Free-Period Study Planning</h3>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                         Detects gaps between college lectures and schedules micro-study blocks mapped directly to your upcoming exam syllabus and assignments.
                      </p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="mt-1 p-2 bg-blue-500/10 rounded-lg h-fit">
                      <Clock className="text-blue-400 w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl text-white font-bold mb-2">Attendance & Exam Readiness Telemetry</h3>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                         Proactively alerts you before attendance drops below the university 75% threshold, with countdown timers for semester exams.
                      </p>
                   </div>
                </div>
             </div>
           </Reveal>
        </div>

      </div>
    </section>
  );
};
