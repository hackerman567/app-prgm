import React from 'react';
import { Target, Calendar, Clock, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Theme } from '../../types';
import { UPCOMING_EXAMS } from '../../data/studentData';

interface ExamCountdownProps {
  theme: Theme;
  user: any;
}

export const ExamCountdown: React.FC<ExamCountdownProps> = ({ theme, user }) => {
  const isRoyal = theme === 'royal';

  return (
    <div className="animate-reveal space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-4xl font-display font-bold flex items-center gap-3 ${
            isRoyal ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            <Target className="w-10 h-10" />
            Semester Exam Countdown & Revision Matrix
          </h2>
          <p className="text-gray-400 mt-1">
            Exam dates, revision targets, and syllabus units completion tracking
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 font-mono text-xs ${
          isRoyal ? 'bg-royal-gold/10 border-royal-gold/30 text-royal-gold' : 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan'
        }`}>
          <Calendar className="w-4 h-4" />
          <span className="font-bold">End-Semester Examinations 2026</span>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {UPCOMING_EXAMS.map((exam) => {
          const percent = Math.round((exam.revisedUnits / exam.syllabusUnits) * 100);
          return (
            <div
              key={exam.subjectCode}
              className={`p-6 rounded-2xl border backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${
                isRoyal ? 'bg-royal-dark/60 border-royal-gold/20' : 'bg-space-900/60 border-neon-cyan/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                  isRoyal ? 'bg-royal-gold/15 text-royal-gold' : 'bg-neon-cyan/15 text-neon-cyan'
                }`}>
                  {exam.subjectCode}
                </span>

                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  exam.daysRemaining <= 14 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {exam.daysRemaining} Days Left
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 line-clamp-1">{exam.subjectName}</h4>
              
              <div className="space-y-1.5 text-xs text-gray-400 mb-6">
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {exam.examDate}
                </p>
                <p className="flex items-center gap-2 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {exam.time}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Syllabus Revised</span>
                  <span className="font-mono font-bold text-white">
                    {exam.revisedUnits} / {exam.syllabusUnits} Units ({percent}%)
                  </span>
                </div>
                
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      percent >= 80 ? 'bg-green-400' : isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
