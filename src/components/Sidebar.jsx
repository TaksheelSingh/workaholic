import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const Sidebar = ({
  isDark,
  onToggleTheme,
  user
}) => {
  return (
    <aside className="w-full md:w-[240px] md:h-screen flex-shrink-0 bg-white dark:bg-black border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/10 flex flex-row md:flex-col justify-between p-4 md:px-[18px] md:py-[24px] transition-colors duration-200 sticky top-0 z-40 md:static">
      
      {/* Top Section */}
      <div className="flex flex-row md:flex-col items-center md:items-stretch justify-between w-full md:w-auto space-y-0 md:space-y-8">
        
        {/* Logo & Quick Switch Dark/Light Mode */}
        <div className="flex items-center justify-between w-auto md:w-full space-x-3 md:space-x-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white font-sans">
              workaholic<span className="text-indigo-600 dark:text-indigo-400">.</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 rounded-full text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition cursor-pointer"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600 fill-indigo-500" />}
          </button>
        </div>

        {/* Navigation List - Dashboard button with hover effect */}
        <div className="hidden md:block">
          <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-4 px-3">
            MAIN
          </span>
          <nav className="space-y-2">
            <button
              type="button"
              className="sidebar-nav-pill active flex items-center justify-start border border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm cursor-pointer"
            >
              <span>Dashboard</span>
            </button>
          </nav>
        </div>

      </div>

      {/* Bottom Profile Badge with live status dot */}
      <div 
        className="p-2.5 md:p-3 rounded-full bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-200 dark:hover:border-white/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer"
        title="Workaholic Telemetry Active"
      >
        <div className="flex items-center space-x-2.5 md:space-x-3 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#0A84FF] text-white text-xs font-bold flex items-center justify-center shadow-sm">
              {user?.initials || 'TR'}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black live-dot-blinking" title="System Connected" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {user?.name || 'Taksheel Rawat'}
            </h4>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate flex items-center space-x-1">
              <span>Workaholic User</span>
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
};
