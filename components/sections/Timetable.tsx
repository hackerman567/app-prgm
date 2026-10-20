import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Search, Filter, BookOpen, Coffee, AlertTriangle } from 'lucide-react';
import { Theme, TimetableClass } from '../../types';
import { WEEKLY_TIMETABLE } from '../../data/studentData';

interface TimetableProps {
  theme: Theme;
  user: any;
}

export const Timetable: React.FC<TimetableProps> = ({ theme, user }) => {
  const [activeDay, setActiveDay] = useState('Monday');
  const [searchQuery, setSearchQuery] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const isRoyal = theme === 'royal';

  const dayClasses = WEEKLY_TIMETABLE.filter(item => 
    item.day === activeDay &&
    (item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.faculty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-reveal space-y-8">
      
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className={`text-4xl font-display font-bold flex items-center gap-4 ${
            isRoyal ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            <Calendar className="w-10 h-10" />
            College Academic Timetable
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Weekly class flow with faculty details, lecture hall locations, and free study gaps
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
             <input 
              type="text"
              placeholder="Filter by subject or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-neon-cyan"
             />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  activeDay === day
                  ? (isRoyal ? 'bg-royal-gold border-royal-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-neon-cyan border-neon-cyan text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]')
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Free Study Gap Banner for the Day */}
      <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
        isRoyal ? 'bg-royal-gold/10 border-royal-gold/30' : 'bg-neon-cyan/10 border-neon-cyan/30'
      }`}>
        <div className="flex items-center gap-3">
          <Coffee className={`w-5 h-5 flex-shrink-0 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
          <div>
            <p className="text-xs font-bold text-white">
              Identified Study Gaps for {activeDay}:
            </p>
            <p className="text-[11px] text-gray-300">
              {activeDay === 'Monday' && '12:15 PM - 01:15 PM (60 min break after Maths) • 05:00 PM onwards'}
              {activeDay === 'Tuesday' && '12:15 PM - 01:15 PM (Lunch) • 02:45 PM - 05:00 PM (Afternoon Study Window)'}
              {activeDay === 'Wednesday' && '12:45 PM - 02:00 PM (75 min post-lab break)'}
              {activeDay === 'Thursday' && '12:15 PM - 01:15 PM (60 min break) • 02:45 PM onwards'}
              {activeDay === 'Friday' && '12:45 PM - 02:00 PM (Post-Database Lab break)'}
              {activeDay === 'Saturday' && '01:00 PM onwards (Weekend Project & Hackathon block)'}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-green-400 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20 whitespace-nowrap">
          OPTIMIZED GAP
        </span>
      </div>

      {/* Classes List */}
      <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden ${
        isRoyal ? 'bg-royal-dark/50 border-royal-gold/20' : 'bg-space-900/50 border-neon-cyan/20'
      }`}>
        <div className="grid grid-cols-1 divide-y divide-white/5">
          {dayClasses.length > 0 ? dayClasses.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 md:w-48">
                <Clock className={`w-5 h-5 flex-shrink-0 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                <span className="font-mono font-bold text-sm text-white">{item.time}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isRoyal ? 'bg-royal-gold/15 text-royal-gold' : 'bg-neon-cyan/15 text-neon-cyan'
                  }`}>
                    {item.subjectCode}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                    item.type === 'Lab' ? 'bg-purple-500/20 text-purple-400' : item.type === 'Tutorial' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.subjectName}</h4>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {item.faculty}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.room}
                  </span>
                  <span className="font-mono text-gray-500">
                    Credits: {item.credits}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Attendance</p>
                  <p className={`font-mono text-sm font-bold ${
                    item.attendance < 80 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {item.attendance}%
                  </p>
                </div>
                {item.attendance < 80 && (
                  <span title="Attendance close to 75% threshold">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </span>
                )}
              </div>
            </div>
          )) : (
            <div className="p-16 text-center space-y-4">
              <Filter className="w-12 h-12 text-gray-600 mx-auto opacity-20" />
              <p className="text-gray-400">No classes scheduled for {activeDay}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
