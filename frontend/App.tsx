import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Overview } from './components/sections/Overview';
import { Features } from './components/sections/Features';
import { Contact } from './components/sections/Contact';
import { StarField } from './components/ui/StarField';
import { Cursor } from './components/ui/Cursor';
import { Theme } from './types';
import { Auth } from './components/sections/Auth';
import { Dashboard } from './components/sections/Dashboard';

function App() {
  const [isWarping, setIsWarping] = useState(false);
  const [theme, setTheme] = useState<Theme>('cyber');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'timetable' | 'chat' | 'study' | 'assignments' | 'exams' | 'progress'>('dashboard');

  useEffect(() => {
    // Hardcoded user for screenshot/demo purposes
    const demoUser = {
      id: 'demo-user-id',
      name: 'Ram Malhotra',
      roll_no: '24Z999',
      dept: 'Computer Science and Engineering',
      batch: '2024-2028'
    };
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    
    if (theme === 'royal') {
      document.body.classList.add('theme-royal');
      document.body.classList.remove('bg-space-950');
      document.body.classList.add('bg-royal-obsidian');
    } else {
      document.body.classList.remove('theme-royal');
      document.body.classList.add('bg-space-950');
      document.body.classList.remove('bg-royal-obsidian');
    }
  }, [theme]);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleWarp = () => {
    setIsWarping(true);
    setTimeout(() => {
      const target = user ? 'app-content' : 'system';
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        setIsWarping(false);
      }, 1000);
    }, 1500);
  };

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(prev => prev === 'cyber' ? 'royal' : 'cyber');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  return (
    <div className={`min-h-screen text-gray-200 selection:text-black transition-colors duration-1000 ${
      theme === 'royal' ? 'selection:bg-royal-gold' : 'selection:bg-neon-cyan'
    }`}>
      
      {isTransitioning && (
         <div className="fixed inset-0 z-[100] bg-white mix-blend-difference animate-glitch pointer-events-none"></div>
      )}

      <Cursor />
      <StarField isWarping={isWarping} theme={theme} />
      
      <div 
         className={`fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] blur-[150px] rounded-full pointer-events-none animate-nebula z-0 opacity-50 transition-colors duration-1000 ${
            theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-purple/5'
         }`}
      ></div>

      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        user={user} 
        onLogout={handleLogout}
        onNavigate={setActiveView}
        activeView={activeView}
      />
      
      <main className="relative z-10">
        {!user ? (
          <>
            <Hero onWarp={handleWarp} />
            <div id="system">
              <Auth onLogin={handleLogin} theme={theme} />
            </div>
            <Overview />
            <Features />
          </>
        ) : (
          <div id="app-content" className="pt-20">
            <Dashboard 
              theme={theme} 
              user={user} 
              activeView={activeView} 
              onNavigate={setActiveView} 
            />
          </div>
        )}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
