import React, { useState } from 'react';
import { Mail, Lock, User, Hash, GraduationCap, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface AuthProps {
  onLogin: (user: any) => void;
  theme: 'cyber' | 'royal';
}

export const Auth: React.FC<AuthProps> = ({ onLogin, theme }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    roll_no: '',
    dept: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Use Case 3.2.1 Validation
    if (!isLogin) {
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError('Invalid email format (user@domain)');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      if (!formData.roll_no.match(/^[A-Z0-9]+$/i)) {
        setError('Invalid roll number format');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
      const response = await axios.post(endpoint, formData);
      
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin(response.data.user);
      } else {
        setIsLogin(true);
        setError('Registration successful! Please login.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
        theme === 'royal' 
        ? 'bg-royal-dark/80 border-royal-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]' 
        : 'bg-space-900/80 border-neon-cyan/30 shadow-[0_0_50px_rgba(0,243,255,0.1)]'
      }`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-display font-bold mb-2 ${
            theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400">
            {isLogin ? 'Access your Hall-o-Flow operational dashboard' : 'Join the campus hall scheduling community'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="roll_no"
                    placeholder="Roll No"
                    required
                    value={formData.roll_no}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="dept"
                    placeholder="Dept"
                    required
                    value={formData.dept}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-neon-cyan transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all duration-300 ${
              theme === 'royal'
              ? 'bg-royal-gold text-black hover:bg-white'
              : 'bg-neon-cyan text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]'
            }`}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login Now' : 'Register Now')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
