import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const Sidebar = ({
  isDark,
  onToggleTheme,
  user
}) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between p-6 transition-colors duration-200">
      
      {/* Top Section */}
      <div className="space-y-8">
        
        {/* Logo & Quick Switch Dark/Light Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white font-sans">
              workaholic<span className="text-indigo-600 dark:text-indigo-400">.</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 rounded-full text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600 fill-indigo-500" />}
          </button>
        </div>

        {/* Navigation List - Dashboard button with hover effect */}
        <div>
          <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-4 px-3">
            MAIN
          </span>
          <nav className="space-y-2">
            <button
              type="button"
              className="w-full flex items-center px-4 py-2.5 rounded-full text-xs font-bold border border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/60 hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>Dashboard</span>
            </button>
          </nav>
        </div>

      </div>

      {/* Bottom Profile Badge with hover effect */}
      <div className="p-3 rounded-full bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {user?.initials || 'TR'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {user?.name || 'Taksheel Rawat'}
            </h4>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
              {user?.role || 'Local User'}
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
};
