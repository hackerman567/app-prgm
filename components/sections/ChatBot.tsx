import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, BookOpen, Clock, Calendar, CheckSquare, Sparkles, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { Theme } from '../../types';
import { WEEKLY_TIMETABLE, STUDENT_ASSIGNMENTS, STUDY_SESSIONS, UPCOMING_EXAMS, CURRENT_STUDENT } from '../../data/studentData';

interface ChatBotProps {
  theme: Theme;
  user: any;
}

export const ChatBot: React.FC<ChatBotProps> = ({ theme, user }) => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: `Hello ${user?.name || CURRENT_STUDENT.name}! I am your AI Academic Assistant. I can help you navigate your college timetable, schedule study plans during your free gaps, track assignment deadlines, and prepare for exams. What would you like to plan today?`, 
      timestamp: new Date() 
    },
    { 
      sender: 'user', 
      text: `What is my next class and do I have any free periods today?`, 
      timestamp: new Date() 
    },
    { 
      sender: 'bot', 
      text: `Your next lecture is Data Structures & Algorithms with Dr. Saranya K G from 09:00 AM - 10:30 AM in Lecture Hall LH 302. You also have a 1-hour free gap between 12:15 PM and 01:15 PM before Operating Systems, which is ideal for reviewing B-Trees or lab practice!`, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isRoyal = theme === 'royal';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Conversational Academic Intelligence matcher (Offline Resilient)
  const getOfflineResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Next class / Schedule
    if (q.includes('next class') || q.includes('where is my class') || q.includes('room')) {
      const first = WEEKLY_TIMETABLE[0];
      return `Your upcoming lecture is ${first.subjectName} (${first.subjectCode}) in ${first.room} from ${first.time} handled by ${first.faculty}.`;
    }

    // Free periods / Gaps
    if (q.includes('free') || q.includes('gap') || q.includes('break')) {
      return "Today you have a 1-hour free period between 12:15 PM - 01:15 PM (lunch & study gap), and evening self-study hours after 05:00 PM. I suggest utilizing the 12:15 PM slot for your Graph Traversal assignment.";
    }

    // Today's Timetable / Classes
    if (q.includes('today') || q.includes('timetable') || q.includes('schedule') || q.includes('classes')) {
      const todayClasses = WEEKLY_TIMETABLE.filter(c => c.day === 'Monday');
      const list = todayClasses.map(c => `• ${c.time}: ${c.subjectName} (${c.room}, ${c.faculty})`).join('\n');
      return `Here is your schedule for Monday:\n${list}\n\nYou have an open study gap from 12:15 PM to 01:15 PM!`;
    }

    // Study Plan / Exam Prep
    if (q.includes('study plan') || q.includes('study') || q.includes('revision') || q.includes('plan')) {
      return "Study Plan Recommendation for Today:\n1. 12:15 PM - 01:00 PM: Graph Traversals (BFS/DFS) practice (during your free gap).\n2. 05:30 PM - 07:00 PM: Data Structures - Binary Search Trees & Red-Black Balancing.\n3. 07:30 PM - 09:00 PM: Operating Systems - Deadlock Avoidance (Banker's Algorithm).\n\nYou can start the Pomodoro focus timer under the 'Study Plan' tab!";
    }

    // Assignments / Deadlines
    if (q.includes('assignment') || q.includes('homework') || q.includes('due') || q.includes('submission')) {
      const pending = STUDENT_ASSIGNMENTS.filter(a => a.status !== 'Completed');
      const list = pending.map(a => `• [${a.priority.toUpperCase()}] ${a.subject}: ${a.title} (Due: ${a.dueDate})`).join('\n');
      return `You have ${pending.length} pending academic deliverables:\n${list}\n\nImmediate priority: Graph Traversal Implementation due tomorrow at 11:59 PM.`;
    }

    // Attendance
    if (q.includes('attendance') || q.includes('bunk') || q.includes('absent') || q.includes('percentage')) {
      return `Your overall semester attendance is 88.5%. All subjects are above the 75% minimum threshold.\n• Data Structures: 92%\n• DBMS Lab: 96%\n• Discrete Maths: 88%\n• Theory of Computation: 78% (Warning: Do not miss more classes to avoid dropping below 75%).`;
    }

    // Exams
    if (q.includes('exam') || q.includes('test') || q.includes('mid term') || q.includes('finals')) {
      const firstExam = UPCOMING_EXAMS[0];
      return `Upcoming Semester Examinations:\n• ${firstExam.subjectName} (${firstExam.subjectCode}): in ${firstExam.daysRemaining} days (${firstExam.examDate}). You have revised ${firstExam.revisedUnits} of ${firstExam.syllabusUnits} units.\nCheck the 'Exams' tab for your full countdown and revision blueprints.`;
    }

    // Greetings
    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return `Hello ${user?.name?.split(' ')[0] || 'Ram'}! I'm ready to help you plan your studies, check your timetable, find free periods, or review upcoming exams. What would you like to check?`;
    }

    // Default student response
    return `I can help you check today's lectures, detect free study slots, generate revision schedules, check pending assignment deadlines, or monitor your attendance. What would you like to review?`;
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { sender: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', {
        query: textToSend,
        userId: user?.id || 'demo-user-id'
      }, {
        timeout: 2500
      });

      if (res.data && res.data.reply) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: res.data.reply,
          timestamp: new Date()
        }]);
      } else {
        throw new Error('No reply');
      }
    } catch (err) {
      // Deterministic offline fallback tailored to student timetable and study plan
      const fallbackText = getOfflineResponse(textToSend);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: fallbackText,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      { 
        sender: 'bot', 
        text: `Hello ${user?.name || CURRENT_STUDENT.name}! Conversation reset. How may I assist with your college timetable or study plan?`, 
        timestamp: new Date() 
      }
    ]);
  };

  return (
    <div className={`w-full h-[calc(100vh-6.5rem)] min-h-[540px] flex flex-col rounded-2xl border backdrop-blur-xl overflow-hidden shadow-2xl relative ${
      isRoyal ? 'bg-royal-dark/80 border-royal-gold/25' : 'bg-space-950/85 border-neon-cyan/25'
    }`}>
      
      {/* Header Bar */}
      <div className={`px-5 py-3.5 border-b flex items-center justify-between flex-shrink-0 ${
        isRoyal ? 'border-royal-gold/15 bg-black/40' : 'border-white/10 bg-space-900/60'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isRoyal ? 'bg-royal-gold/20 text-royal-gold border border-royal-gold/30' : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
          }`}>
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-display font-bold text-white flex items-center gap-2">
              AI Timetable & Study Assistant
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                ACTIVE
              </span>
            </h2>
            <p className="text-[11px] text-gray-400">
              Trained on {CURRENT_STUDENT.dept} • {CURRENT_STUDENT.semester} schedule
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Reset conversation"
          className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors text-xs flex items-center gap-1 font-mono"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar scroll-smooth"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-reveal`}>
            <div className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                msg.sender === 'user' 
                ? 'bg-white/10 text-white border border-white/15' 
                : (isRoyal ? 'bg-royal-gold/20 text-royal-gold border border-royal-gold/30' : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30')
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className="space-y-1">
                <div className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                  msg.sender === 'user'
                  ? 'bg-white/15 text-white border border-white/20'
                  : (isRoyal 
                      ? 'bg-black/50 border border-royal-gold/25 text-gray-200' 
                      : 'bg-space-900/90 border border-white/10 text-gray-200')
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[9px] text-gray-500 font-mono px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-reveal">
            <div className="flex gap-3">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isRoyal ? 'bg-royal-gold/20 text-royal-gold' : 'bg-neon-cyan/20 text-neon-cyan'
              }`}>
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs italic text-gray-400">
                Analyzing college timetable and study schedule...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts (Tucked right above input bar) */}
      <div className={`px-4 py-2 border-t flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0 ${
        isRoyal ? 'bg-black/40 border-royal-gold/15' : 'bg-black/40 border-white/10'
      }`}>
        <span className="text-[10px] font-mono text-gray-500 uppercase flex-shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          Ask:
        </span>
        {[
          "What is my next class and room?",
          "Do I have any free time to study today?",
          "Generate a study plan for Data Structures",
          "What assignments are due this week?",
          "How is my attendance across subjects?",
          "When is my Operating Systems exam?"
        ].map((suggest, i) => (
          <button
            key={i}
            onClick={() => handleSend(suggest)}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-gray-300 hover:text-white transition-all whitespace-nowrap flex-shrink-0"
          >
            {suggest}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className={`p-3 sm:p-4 border-t flex-shrink-0 ${
        isRoyal ? 'border-royal-gold/15 bg-black/60' : 'border-white/10 bg-black/60'
      }`}>
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about lectures, free periods, assignments, or study plans..."
            className="flex-1 bg-black/60 border border-white/15 rounded-xl py-2.5 sm:py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan text-xs sm:text-sm transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className={`p-2.5 sm:p-3 rounded-xl font-bold transition-all duration-200 flex-shrink-0 ${
              isRoyal
              ? 'bg-royal-gold text-black hover:bg-white disabled:opacity-40'
              : 'bg-neon-cyan text-black hover:bg-white disabled:opacity-40 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
            }`}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
