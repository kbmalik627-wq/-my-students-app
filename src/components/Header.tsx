import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { googleSignIn, logout } from '../services/firebaseAuth';
import { 
  GraduationCap, 
  Search, 
  MessageCircle, 
  Cloud, 
  FileSpreadsheet, 
  LogOut, 
  CheckCircle2, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onUserChange: (user: User | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenDriveModal: () => void;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onUserChange,
  searchQuery,
  onSearchChange,
  onOpenDriveModal,
  onSelectTab,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        onUserChange(res.user);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      // Alert with non-blocking toast or banner
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    onUserChange(null);
    setShowUserMenu(false);
  };

  const openWhatsAppOfficial = () => {
    const text = encodeURIComponent('Salam AW Assignment Work, mujhe solved assignments / notes ki information chahiye.');
    window.open(`https://wa.me/923267976823?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#2196F3] text-white shadow-md select-none">
      {/* Top Android status & emergency notice */}
      <div className="bg-[#1976D2] text-[11px] font-medium px-4 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>AIOU Autumn & Spring Solved Assignments Ready (300 PKR)</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={openWhatsAppOfficial}
            className="flex items-center space-x-1 text-emerald-200 hover:text-white transition"
          >
            <PhoneCall className="w-3 h-3" />
            <span>03267976823</span>
          </button>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#2196F3] flex items-center justify-center font-black text-xl shadow-md border-2 border-blue-100">
            AW
          </div>
          <div>
            <h1 className="font-extrabold text-base md:text-lg leading-tight tracking-tight flex items-center gap-1.5">
              AW Assignment Work
            </h1>
            <p className="text-[11px] text-blue-100 font-medium">All Solved Notes & Services</p>
          </div>
        </div>

        {/* Action icons & Google Auth */}
        <div className="flex items-center space-x-2">
          {/* Quick Search Toggle */}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className={`p-2 rounded-full transition ${
              showSearchInput ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white'
            }`}
            title="Search notes, assignments, AIOU codes"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* WhatsApp Direct Help */}
          <button
            onClick={openWhatsAppOfficial}
            className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm flex items-center justify-center transition"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Google Workspace Account / Sign In */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1.5 rounded-full text-xs font-semibold transition border border-white/20"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-6 h-6 rounded-full border border-white" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <span className="hidden sm:inline max-w-[90px] truncate">{user.displayName?.split(' ')[0]}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900 truncate">{user.displayName || 'Student'}</p>
                    <p className="text-slate-500 truncate text-[11px]">{user.email}</p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                      <Cloud className="w-3 h-3" />
                      Google Drive & Sheets Connected
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenDriveModal();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center space-x-2 text-slate-700 font-medium"
                  >
                    <Cloud className="w-4 h-4 text-[#2196F3]" />
                    <span>My Saved Drive Files & Sheet</span>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 flex items-center space-x-2 text-red-600 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="bg-white text-slate-800 hover:bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center space-x-1.5 shadow-sm transition active:scale-95 disabled:opacity-75"
              title="Connect Google Drive to save solved notes"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="hidden sm:inline">Google Connect</span>
              <span className="sm:hidden">Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearchInput && (
        <div className="bg-white text-slate-800 px-4 py-2 border-t border-blue-300 shadow-inner animate-in slide-in-from-top-1">
          <div className="max-w-4xl mx-auto relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search by code (e.g. 1423, 8601), Urdu Mazmoon, Tenses, Physics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#2196F3] border border-slate-200"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
