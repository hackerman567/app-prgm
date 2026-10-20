import React from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle2, Clock, AlertTriangle, BookOpen, GraduationCap } from 'lucide-react';
import { Theme } from '../../types';

interface ProgressTrackerProps {
  theme: Theme;
  user: any;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ theme, user }) => {
  const isRoyal = theme === 'royal';

  const subjectAttendance = [
    { subject: 'DBMS Lab Hands-on', attendance: 96, safe: true },
    { subject: 'Data Structures & Algorithms', attendance: 92, safe: true },
    { subject: 'Ethics & Professional Values', attendance: 91, safe: true },
    { subject: 'Discrete Maths & Graph Theory', attendance: 88, safe: true },
    { subject: 'Operating Systems Principles', attendance: 85, safe: true },
    { subject: 'Computer Networks & Security', attendance: 84, safe: true },
    { subject: 'Theory of Computation', attendance: 78, safe: false }, // warning
  ];

  const weeklyStudyHours = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.5 },
    { day: 'Wed', hours: 4.0 },
    { day: 'Thu', hours: 3.0 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 2.0 },
  ];

  return (
    <div className="animate-reveal space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-4xl font-display font-bold flex items-center gap-3 ${
            isRoyal ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            <BarChart3 className="w-10 h-10" />
            Student Academic Progress & Attendance Telemetry
          </h2>
          <p className="text-gray-400 mt-1">
            Student: {user?.name || 'Ram Malhotra'} • Roll No: {user?.roll_no || '24Z999'} • {user?.dept || 'CSE'}
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 font-mono text-xs ${
          isRoyal ? 'bg-royal-gold/10 border-royal-gold/30 text-royal-gold' : 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan'
        }`}>
          <GraduationCap className="w-4 h-4" />
          <span className="font-bold">Semester 5 • CGPA: 8.64</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} 
          label="Overall Attendance" 
          value="87.8%" 
          subLabel="Eligible for End-Sem Exams (Min 75%)"
          theme={theme}
        />
        <StatCard 
          icon={<Clock className="w-5 h-5 text-blue-400" />} 
          label="Weekly Study Hours" 
          value="21.5h" 
          subLabel="Across 12 scheduled study sessions"
          theme={theme}
        />
        <StatCard 
          icon={<BookOpen className="w-5 h-5 text-purple-400" />} 
          label="Coursework Completed" 
          value="82%" 
          subLabel="4 of 5 assignments submitted"
          theme={theme}
        />
        <StatCard 
          icon={<Award className="w-5 h-5 text-yellow-400" />} 
          label="Exam Readiness Index" 
          value="88 / 100" 
          subLabel="High confidence across 5 subjects"
          theme={theme}
        />
      </div>

      {/* Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Subject-wise Attendance */}
        <div className={`p-8 rounded-2xl border backdrop-blur-xl ${
          isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-display text-white">Subject Attendance Tracking</h3>
            <span className="text-xs text-gray-500 font-mono">Threshold: 75%</span>
          </div>

          <div className="space-y-4">
            {subjectAttendance.map((sub, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-medium flex items-center gap-1.5">
                    {!sub.safe && <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />}
                    {sub.subject}
                  </span>
                  <span className={`font-mono font-bold ${!sub.safe ? 'text-yellow-400' : 'text-white'}`}>
                    {sub.attendance}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      !sub.safe ? 'bg-yellow-400' : isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'
                    }`}
                    style={{ width: `${sub.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Study Time Bar Chart */}
        <div className={`p-8 rounded-2xl border backdrop-blur-xl flex flex-col justify-between ${
          isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-display text-white">Daily Study Hours Log</h3>
              <span className="text-xs text-gray-500 font-mono">This Week</span>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Average study time per day: <span className="text-white font-bold">3.07 hours</span>
            </p>
          </div>

          <div className="flex items-end justify-between gap-3 h-44 pt-4 border-t border-white/5">
            {weeklyStudyHours.map((d, i) => {
              const maxHours = 5;
              const heightPercent = Math.round((d.hours / maxHours) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400">{d.hours}h</span>
                  <div className="w-full bg-white/5 rounded-t-lg h-32 flex items-end overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ${
                        isRoyal ? 'bg-royal-gold/60 hover:bg-royal-gold' : 'bg-neon-cyan/60 hover:bg-neon-cyan'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-300">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

const StatCard = ({ icon, label, value, subLabel, theme }: any) => {
  const isRoyal = theme === 'royal';
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
      isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
    }`}>
      <div className={`p-3 w-fit rounded-xl mb-4 ${
        isRoyal ? 'bg-royal-gold/10 text-royal-gold' : 'bg-neon-cyan/10 text-neon-cyan'
      }`}>
        {icon}
      </div>
      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</h4>
      <p className="text-3xl font-display font-bold text-white mb-1">{value}</p>
      <p className="text-[11px] text-gray-500">{subLabel}</p>
    </div>
  );
};
