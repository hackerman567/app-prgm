import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  Filter, 
  BookOpen, 
  Calendar, 
  Check, 
  FileText 
} from 'lucide-react';
import { Theme, Assignment } from '../../types';
import { STUDENT_ASSIGNMENTS } from '../../data/studentData';

interface AssignmentsTrackerProps {
  theme: Theme;
  user: any;
}

export const AssignmentsTracker: React.FC<AssignmentsTrackerProps> = ({ theme, user }) => {
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('student_assignments');
    return saved ? JSON.parse(saved) : STUDENT_ASSIGNMENTS;
  });

  const [filterType, setFilterType] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Data Structures & Algorithms');
  const [newDueDate, setNewDueDate] = useState('In 2 Days');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [showAddForm, setShowAddForm] = useState(false);

  const isRoyal = theme === 'royal';

  const toggleStatus = (id: string) => {
    const updated = assignments.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: (a.status === 'Completed' ? 'Pending' : 'Completed') as any
        };
      }
      return a;
    });
    setAssignments(updated);
    localStorage.setItem('student_assignments', JSON.stringify(updated));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: Assignment = {
      id: `asg-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      dueDate: newDueDate,
      priority: newPriority,
      status: 'Pending',
      description: 'Added by student to schedule plan',
      type: 'Assignment'
    };

    const updated = [newItem, ...assignments];
    setAssignments(updated);
    localStorage.setItem('student_assignments', JSON.stringify(updated));
    setNewTitle('');
    setShowAddForm(false);
  };

  const filtered = assignments.filter(a => {
    if (filterType === 'Pending') return a.status !== 'Completed';
    if (filterType === 'Completed') return a.status === 'Completed';
    return true;
  });

  return (
    <div className="animate-reveal space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-4xl font-display font-bold flex items-center gap-3 ${
            isRoyal ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            <FileText className="w-10 h-10" />
            Assignments & Lab Work Tracker
          </h2>
          <p className="text-gray-400 mt-1">
            Track coursework deadlines, lab records, problem sheets, and submission status
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isRoyal
                ? 'bg-royal-gold text-black hover:bg-white'
                : 'bg-neon-cyan text-black hover:bg-white shadow-[0_0_15px_rgba(0,243,255,0.3)]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Add Assignment'}</span>
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className={`p-6 rounded-2xl border backdrop-blur-xl animate-fade-in space-y-4 ${
          isRoyal ? 'bg-royal-dark border-royal-gold/30' : 'bg-space-900 border-neon-cyan/30'
        }`}>
          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">Add New Academic Task</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-gray-400 mb-1">Task / Assignment Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Implement AVL Tree rotation in C++"
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-neon-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">Subject</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-neon-cyan"
              >
                <option value="Data Structures & Algorithms">Data Structures</option>
                <option value="Operating Systems Principles">Operating Systems</option>
                <option value="DBMS Lab Hands-on">DBMS Lab</option>
                <option value="Discrete Maths & Graph Theory">Discrete Maths</option>
                <option value="Theory of Computation">Theory of Computation</option>
                <option value="Computer Networks & Security">Computer Networks</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-neon-cyan"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className={`px-6 py-2 rounded-xl text-xs font-bold ${
                isRoyal ? 'bg-royal-gold text-black' : 'bg-neon-cyan text-black'
              }`}
            >
              Save Assignment
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Pending', 'Completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filterType === f
                ? (isRoyal ? 'bg-royal-gold border-royal-gold text-black' : 'bg-neon-cyan border-neon-cyan text-black')
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isDone = item.status === 'Completed';
          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border backdrop-blur-xl transition-all ${
                isDone ? 'opacity-60 bg-white/5 border-white/5' : isRoyal ? 'bg-royal-dark/60 border-royal-gold/20' : 'bg-space-900/60 border-neon-cyan/20'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase tracking-widest">
                  {item.type} • {item.subject}
                </span>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  item.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : item.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.priority} Priority
                </span>
              </div>

              <h4 className={`text-base font-bold text-white mb-2 ${isDone ? 'line-through text-gray-400' : ''}`}>
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 mb-4">{item.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs text-orange-400 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Due: {item.dueDate}
                </span>

                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-white/10 text-gray-400 hover:text-white'
                      : isRoyal
                        ? 'bg-royal-gold/20 text-royal-gold hover:bg-royal-gold hover:text-black'
                        : 'bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Mark Pending' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
