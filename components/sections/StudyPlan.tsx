import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, CheckCircle2, Play, Pause, RefreshCw, AlertCircle, Check } from 'lucide-react';
import { Theme, StudySession } from '../../types';
import { STUDY_SESSIONS } from '../../data/studentData';

interface StudyPlanProps {
  theme: Theme;
  user: any;
}

export const StudyPlan: React.FC<StudyPlanProps> = ({ theme, user }) => {
  const [activeDay, setActiveDay] = useState('Monday');
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('student_study_sessions');
    return saved ? JSON.parse(saved) : STUDY_SESSIONS;
  });

  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [activeTimerSession, setActiveTimerSession] = useState<string>('Binary Search Trees & Red-Black Balancing');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const isRoyal = theme === 'royal';

  React.useEffect(() => {
    let interval: any;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSessionComplete = (id: string) => {
    const updated = sessions.map(s => {
      if (s.id === id) return { ...s, completed: !s.completed };
      return s;
    });
    setSessions(updated);
    localStorage.setItem('student_study_sessions', JSON.stringify(updated));
  };

  const daySessions = sessions.filter(s => s.day === activeDay);

  return (
    <div className="animate-reveal space-y-8">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-4xl font-display font-bold flex items-center gap-3 ${
            isRoyal ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            <BookOpen className="w-10 h-10" />
            Adaptive Study Planner & Revision Blocks
          </h2>
          <p className="text-gray-400 mt-1">
            Personalized study sessions scheduled automatically around your college timetable gaps
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {days.map(d => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeDay === d
                  ? (isRoyal ? 'bg-royal-gold border-royal-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-neon-cyan border-neon-cyan text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]')
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Integrated Study Timer & Target Widget */}
      <div className={`p-6 rounded-2xl border backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
        isRoyal ? 'bg-royal-dark/70 border-royal-gold/25' : 'bg-space-900/70 border-neon-cyan/25'
      }`}>
        <div className="space-y-1">
          <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
            isRoyal ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            FOCUS STUDY TIMER (POMODORO)
          </span>
          <h4 className="text-xl font-bold text-white font-display">
            Active Target: {activeTimerSession}
          </h4>
          <p className="text-xs text-gray-400">
            Next break scheduled in 25 minutes • Notifications silenced
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center font-mono">
            <span className="text-4xl font-bold tracking-tight text-white font-display drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
              {formatTimer(timeLeft)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                timerRunning
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : isRoyal
                    ? 'bg-royal-gold text-black hover:bg-white'
                    : 'bg-neon-cyan text-black hover:bg-white shadow-[0_0_15px_rgba(0,243,255,0.3)]'
              }`}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{timerRunning ? 'Pause' : 'Start Focus'}</span>
            </button>

            <button
              onClick={() => { setTimerRunning(false); setTimeLeft(25 * 60); }}
              className="p-2.5 rounded-xl bg-white/10 text-gray-400 hover:text-white transition-all"
              title="Reset Timer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Planned Sessions for the Day */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
          <span>Scheduled Study Targets for {activeDay}</span>
          <span className="text-xs text-gray-500 font-mono">({daySessions.length} Sessions)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {daySessions.map((session) => (
            <div
              key={session.id}
              className={`p-6 rounded-2xl border backdrop-blur-xl transition-all ${
                session.completed
                  ? 'opacity-60 bg-white/5 border-white/5'
                  : isRoyal
                    ? 'bg-royal-dark/60 border-royal-gold/20 hover:border-royal-gold/40'
                    : 'bg-space-900/60 border-neon-cyan/20 hover:border-neon-cyan/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  isRoyal ? 'bg-royal-gold/15 text-royal-gold' : 'bg-neon-cyan/15 text-neon-cyan'
                }`}>
                  {session.type}
                </span>

                <span className="text-xs font-mono text-gray-400">
                  {session.durationMinutes} Mins
                </span>
              </div>

              <h4 className={`text-base font-bold text-white mb-1 ${session.completed ? 'line-through text-gray-400' : ''}`}>
                {session.subject}
              </h4>
              <p className="text-xs text-gray-400 mb-4">{session.topic}</p>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {session.timeSlot}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTimerSession(`${session.subject} - ${session.topic}`);
                      setTimeLeft(session.durationMinutes * 60);
                      setTimerRunning(true);
                    }}
                    className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:text-white"
                    title="Load into timer"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleSessionComplete(session.id)}
                    className={`p-1.5 rounded-lg transition-all ${
                      session.completed
                        ? 'bg-green-500 text-black'
                        : 'bg-white/10 text-gray-400 hover:text-white'
                    }`}
                    title="Mark Done"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
