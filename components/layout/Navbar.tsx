import React, { useState, useEffect } from 'react';
import { Menu, X, Atom, User, BrainCircuit, Sun, Sparkles, LogOut, Clock, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { NavItem, Theme } from '../../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'System', href: '#system' },
  { label: 'Intelligence', href: '#features' },
  { label: 'Planner', href: '#demo' },
  { label: 'Connect', href: '#contact' },
];

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  user: any;
  onLogout: () => void;
  onNavigate: (view: any) => void;
  activeView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, user, onLogout, onNavigate, activeView = 'dashboard' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const isRoyal = theme === 'royal';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (user) {
      const view = href.replace('#', '');
      onNavigate(view as any);
      setIsMobileMenuOpen(false);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const menuItems = user ? [
    { label: 'Overview', href: 'dashboard' },
    { label: 'Timetable', href: 'timetable' },
    { label: 'Assistant', href: 'chat' },
    { label: 'Study Plan', href: 'study' },
    { label: 'Assignments', href: 'assignments' },
    { label: 'Exams', href: 'exams' },
    { label: 'Telemetry', href: 'progress' },
  ] : NAV_ITEMS;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled || isMobileMenuOpen || isVaultOpen
            ? isRoyal 
              ? 'bg-royal-obsidian/95 border-royal-gold/20 backdrop-blur-xl py-3'
              : 'bg-space-950/90 border-neon-cyan/20 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-space-950/70 border-white/5 backdrop-blur-md py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={(e) => handleNavClick(e, user ? '#dashboard' : '#hero')} 
            className="flex items-center gap-2.5 group relative z-50 cursor-pointer flex-shrink-0"
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity animate-pulse ${isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'}`}></div>
              <Atom className={`w-8 h-8 relative z-10 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'} group-hover:rotate-180 transition-transform duration-1000`} />
            </div>
            <div className="flex flex-col">
               <span className={`text-lg font-bold tracking-[0.2em] leading-none transition-colors duration-500 ${isRoyal ? 'font-serif text-royal-gold' : 'font-display text-white'}`}>
                 STUDY
               </span>
               <span className={`text-[10px] tracking-[0.35em] leading-none ${isRoyal ? 'text-white' : 'text-neon-cyan font-bold'}`}>FLOW</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2.5 xl:gap-3 flex-wrap justify-center flex-1 max-w-2xl px-2">
            {menuItems.map((item) => {
              const isActive = user && activeView === item.href;
              return (
                <a
                  key={item.label}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, `#${item.href}`)}
                  className={`text-[10px] lg:text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap relative
                    ${isActive
                      ? (isRoyal 
                          ? 'bg-royal-gold/15 text-royal-gold border border-royal-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                          : 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)]')
                      : (isRoyal
                          ? 'font-serif text-gray-300 hover:text-royal-gold hover:bg-white/5'
                          : 'font-display text-gray-300 hover:text-white hover:bg-white/5')
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 flex-shrink-0">
            
            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all duration-300 ${
                isRoyal ? 'border-royal-gold/30 bg-royal-gold/5 text-royal-gold hover:bg-royal-gold/15' : 'border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/15'
              }`}
              title="Toggle Theme"
            >
              {isRoyal ? <Sun size={16} className="animate-spin-slow" /> : <Sparkles size={16} className="animate-pulse" />}
            </button>

            {/* User / Auth Info */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden xl:inline-block text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10 whitespace-nowrap">
                  {user.roll_no || '24Z999'}
                </span>
                <button 
                  onClick={onLogout}
                  className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                    isRoyal 
                    ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' 
                    : 'border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5'
                  }`}
                  title="Logout"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={(e) => handleNavClick(e, '#system')}
                className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                  isRoyal ? 'text-royal-silver hover:text-royal-gold border-royal-gold/20' : 'text-gray-300 hover:text-neon-cyan border-white/10'
                }`}
              >
                <User size={13} />
                <span>Login</span>
              </button>
            )}

            {/* Quick Study Modes Vault Trigger */}
            <button 
              onClick={() => setIsVaultOpen(true)}
              className={`p-1.5 px-3 transition-all duration-300 flex items-center gap-1.5 border rounded-lg whitespace-nowrap ${
                isRoyal ? 'border-royal-gold/30 text-royal-gold hover:bg-royal-gold/10' : 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10'
              }`}
            >
               <span className="text-[10px] tracking-wider font-bold uppercase hidden lg:block">Study Modes</span>
               <BrainCircuit size={15} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${isRoyal ? 'text-royal-gold' : 'text-white hover:text-neon-cyan'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 md:hidden pt-20 px-6 backdrop-blur-2xl transition-all duration-300 ${
          isRoyal ? 'bg-royal-obsidian/95 text-white' : 'bg-space-950/95 text-white'
        }`}>
          <div className="flex flex-col space-y-3 pt-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, `#${item.href}`)}
                className={`text-sm uppercase tracking-wider font-bold p-3 rounded-xl border border-white/5 ${
                  user && activeView === item.href
                    ? (isRoyal ? 'bg-royal-gold/20 text-royal-gold border-royal-gold/40' : 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/40')
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={onToggleTheme}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-sm"
              >
                <span>Toggle Appearance Theme</span>
                {isRoyal ? <Sun size={18} className="text-royal-gold" /> : <Sparkles size={18} className="text-neon-cyan" />}
              </button>

              {user && (
                <button
                  onClick={onLogout}
                  className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-bold"
                >
                  <span>Logout ({user.name})</span>
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Study Modes Modal Vault */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-reveal">
          <div className={`max-w-md w-full rounded-2xl border p-6 space-y-6 ${
            isRoyal ? 'bg-royal-dark border-royal-gold/30' : 'bg-space-900 border-neon-cyan/30'
          }`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <BrainCircuit className={isRoyal ? 'text-royal-gold' : 'text-neon-cyan'} size={22} />
                <h3 className="font-bold text-white font-display text-lg">Active Study Modes</h3>
              </div>
              <button onClick={() => setIsVaultOpen(false)} className="text-gray-400 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Pomodoro Deep Focus', desc: '25 min study sprints + 5 min break', badge: 'Active' },
                { title: 'Timetable Gap Micro-Learning', desc: 'Syncs study blocks with free periods', badge: 'Enabled' },
                { title: 'Exam Readiness Countdown', desc: 'Daily syllabus target tracking', badge: 'Active' },
                { title: '75% Attendance Safeguard', desc: 'Alerts before bunking risk limits', badge: 'Monitored' },
              ].map((mode, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{mode.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{mode.desc}</p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                    {mode.badge}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsVaultOpen(false)}
              className={`w-full py-2.5 rounded-xl font-bold text-xs ${
                isRoyal ? 'bg-royal-gold text-black' : 'bg-neon-cyan text-black'
              }`}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
