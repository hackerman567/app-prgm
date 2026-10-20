import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  BarChart3, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  Target,
  GraduationCap,
  MapPin,
  Coffee,
  Check
} from 'lucide-react';
import { Theme } from '../../types';
import { Timetable } from './Timetable';
import { ChatBot } from './ChatBot';
import { StudyPlan } from './StudyPlan';
import { ProgressTracker } from './ProgressTracker';
import { AssignmentsTracker } from './AssignmentsTracker';
import { ExamCountdown } from './ExamCountdown';
import { CURRENT_STUDENT, WEEKLY_TIMETABLE, STUDENT_ASSIGNMENTS, STUDY_SESSIONS, UPCOMING_EXAMS } from '../../data/studentData';

interface DashboardProps {
  theme: Theme;
  user: any;
  activeView: 'dashboard' | 'timetable' | 'chat' | 'study' | 'assignments' | 'exams' | 'progress';
  onNavigate: (view: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ theme, user, activeView, onNavigate }) => {
  const isRoyal = theme === 'royal';
  const student = CURRENT_STUDENT;
  const todayClasses = WEEKLY_TIMETABLE.filter(c => c.day === 'Monday');
  const todaySessions = STUDY_SESSIONS.filter(s => s.day === 'Monday');

  const renderView = () => {
    switch (activeView) {
      case 'timetable':
        return <Timetable theme={theme} user={user} />;
      case 'chat':
        return <ChatBot theme={theme} user={user} />;
      case 'study':
        return <StudyPlan theme={theme} user={user} />;
      case 'assignments':
        return <AssignmentsTracker theme={theme} user={user} />;
      case 'exams':
        return <ExamCountdown theme={theme} user={user} />;
      case 'progress':
        return <ProgressTracker theme={theme} user={user} />;
      default:
        return (
          <div className="space-y-8 animate-reveal">
            
            {/* Top Student Banner */}
            <div className={`p-6 rounded-2xl border backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
              isRoyal ? 'bg-royal-dark/60 border-royal-gold/20' : 'bg-space-900/60 border-neon-cyan/20'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl ${
                  isRoyal ? 'bg-royal-gold/15 text-royal-gold' : 'bg-neon-cyan/15 text-neon-cyan'
                }`}>
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl text-white font-display">
                      Welcome, {student.name}
                    </h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isRoyal ? 'bg-royal-gold/20 text-royal-gold' : 'bg-neon-cyan/20 text-neon-cyan'
                    }`}>
                      {student.roll_no}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {student.dept} • {student.semester} • CGPA: {student.cgpa}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('chat')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs text-black flex items-center gap-1.5 transition-all ${
                    isRoyal ? 'bg-royal-gold hover:bg-white' : 'bg-neon-cyan hover:bg-white shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask Timetable Assistant</span>
                </button>
                <button
                  onClick={() => onNavigate('study')}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  Study Plan →
                </button>
              </div>
            </div>

            {/* Quick Ask Bar */}
            <div className={`p-4 rounded-xl border backdrop-blur-xl flex items-center justify-between gap-4 ${
              isRoyal ? 'bg-royal-dark/40 border-royal-gold/20' : 'bg-space-900/40 border-neon-cyan/20'
            }`}>
              <div className="flex items-center gap-3 flex-1">
                <MessageSquare className={`w-5 h-5 flex-shrink-0 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                <span className="text-xs text-gray-400">Quick Query Assistant:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What are my classes today?",
                    "When is my free slot?",
                    "Show assignments due this week",
                    "Exam countdown"
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigate('chat')}
                      className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
                isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isRoyal ? 'bg-royal-gold/10 text-royal-gold' : 'bg-neon-cyan/10 text-neon-cyan'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Today's Class</span>
                </div>
                <p className="text-gray-400 text-xs">Next Lecture</p>
                <p className="text-xl font-display font-bold text-white mt-1 truncate">Data Structures</p>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">
                  09:00 AM • LH 302
                </p>
              </div>

              <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
                isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Timetable Gap</span>
                </div>
                <p className="text-gray-400 text-xs">Free Study Window</p>
                <p className="text-xl font-display font-bold text-green-400 mt-1">12:15 PM - 01:15 PM</p>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">
                  60 min post-Maths break
                </p>
              </div>

              <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
                isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Coursework</span>
                </div>
                <p className="text-gray-400 text-xs">Pending Deadlines</p>
                <p className="text-xl font-display font-bold text-orange-400 mt-1">3 Assignments</p>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">
                  Graph Traversal in C++ due tomorrow
                </p>
              </div>

              <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
                isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">End-Semester</span>
                </div>
                <p className="text-gray-400 text-xs">Exam Countdown</p>
                <p className="text-xl font-display font-bold text-purple-400 mt-1">14 Days Left</p>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">
                  First paper: CS501 DSA
                </p>
              </div>

            </div>

            {/* Mid Grid: Today's Class Timetable & Today's Study Targets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left 7 Cols: Today's Class Timeline */}
              <div className={`lg:col-span-7 p-6 rounded-2xl border backdrop-blur-xl space-y-4 ${
                isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
              }`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <Calendar className={`w-5 h-5 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                    Today's Classes (Monday)
                  </h3>
                  <button
                    onClick={() => onNavigate('timetable')}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Full Week</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {todayClasses.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            isRoyal ? 'bg-royal-gold/15 text-royal-gold' : 'bg-neon-cyan/15 text-neon-cyan'
                          }`}>
                            {c.subjectCode}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                            c.type === 'Lab' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {c.type}
                          </span>
                          <span className="text-xs font-mono text-gray-400">{c.time}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1">{c.subjectName}</h4>
                        <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                          <span>{c.room}</span> • <span>{c.faculty}</span>
                        </p>
                      </div>

                      <div className="text-right self-start sm:self-center">
                        <span className="text-[10px] font-mono uppercase text-gray-500 block">Attendance</span>
                        <span className={`font-mono text-xs font-bold ${c.attendance < 80 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {c.attendance}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Today's Scheduled Study Targets */}
              <div className={`lg:col-span-5 p-6 rounded-2xl border backdrop-blur-xl space-y-4 ${
                isRoyal ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
              }`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <BookOpen className={`w-5 h-5 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                    Today's Study Plan
                  </h3>
                  <button
                    onClick={() => onNavigate('study')}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Open Planner
                  </button>
                </div>

                <div className="space-y-3">
                  {todaySessions.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between gap-3 hover:bg-white/10 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                          isRoyal ? 'bg-royal-gold/15 text-royal-gold' : 'bg-neon-cyan/15 text-neon-cyan'
                        }`}>
                          {s.type} • {s.durationMinutes}m
                        </span>
                        <h5 className="font-bold text-white text-xs mt-1 truncate">{s.subject}</h5>
                        <p className="text-[11px] text-gray-400 truncate">{s.topic}</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {s.timeSlot}
                        </p>
                      </div>

                      <span className={`p-1 rounded-md text-[10px] font-mono ${
                        s.completed ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'
                      }`}>
                        {s.completed ? 'Done' : 'Target'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-start">
        
        {/* Sidebar Navigation (Sticky) */}
        <div className="w-full md:w-60 lg:w-64 space-y-1.5 flex-shrink-0 md:sticky md:top-20 md:self-start">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Overview" 
            active={activeView === 'dashboard'} 
            onClick={() => onNavigate('dashboard')}
            theme={theme}
          />
          <NavItem 
            icon={<Calendar />} 
            label="Class Timetable" 
            active={activeView === 'timetable'} 
            onClick={() => onNavigate('timetable')}
            theme={theme}
            badge="Weekly"
          />
          <NavItem 
            icon={<MessageSquare />} 
            label="Study Assistant" 
            active={activeView === 'chat'} 
            onClick={() => onNavigate('chat')}
            theme={theme}
            badge="AI Chat"
          />
          <NavItem 
            icon={<BookOpen />} 
            label="Study Planner" 
            active={activeView === 'study'} 
            onClick={() => onNavigate('study')}
            theme={theme}
          />
          <NavItem 
            icon={<FileText />} 
            label="Assignments" 
            active={activeView === 'assignments'} 
            onClick={() => onNavigate('assignments')}
            theme={theme}
          />
          <NavItem 
            icon={<Target />} 
            label="Exam Countdown" 
            active={activeView === 'exams'} 
            onClick={() => onNavigate('exams')}
            theme={theme}
          />
          <NavItem 
            icon={<BarChart3 />} 
            label="Academic Telemetry" 
            active={activeView === 'progress'} 
            onClick={() => onNavigate('progress')}
            theme={theme}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 w-full">
          {renderView()}
        </div>

      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, theme, badge }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
      active 
      ? (theme === 'royal' ? 'bg-royal-gold text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-neon-cyan text-black font-bold shadow-[0_0_15px_rgba(0,243,255,0.3)]')
      : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
    }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      {React.cloneElement(icon, { className: `w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0` })}
      <span className="font-bold text-xs tracking-wide truncate">{label}</span>
    </div>
    {badge && !active && (
      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 flex-shrink-0 ml-2">
        {badge}
      </span>
    )}
  </button>
);
