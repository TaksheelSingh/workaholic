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
      <div className="flex flex-col w-full">
        
        {/* Logo & Quick Switch Dark/Light Mode with Faded Border Line Below */}
        <div className="flex items-center justify-between w-full mb-8 pb-4 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center space-x-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white font-sans">
              workaholic<span className="text-[#0A84FF]">.</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
        </div>

        {/* Navigation List - Dashboard button with hover effect */}
        <div className="hidden md:block">
          <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-3 px-3 font-mono">
            MAIN
          </span>
          <nav className="space-y-2">
            <button
              type="button"
              className="sidebar-nav-pill active flex items-center justify-start border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#161618] text-indigo-600 dark:text-[#0A84FF] shadow-sm cursor-pointer font-bold"
            >
              <span>Dashboard</span>
            </button>
          </nav>
        </div>

      </div>

      {/* Bottom Profile Badge with live status dot (Matching GMD Reference Specification) */}
      <div 
        className="bottom-status-badge w-full cursor-pointer flex items-center justify-between shadow-sm p-2.5 rounded-full border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#111113] hover:border-gray-200 dark:hover:border-white/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        title="Workaholic Telemetry Active"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#0A84FF] text-white font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0">
            {user?.initials || 'TR'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-gray-900 dark:text-white leading-none truncate">
              {user?.name || 'Taksheel Rawat'}
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">
              Workaholic User
            </div>
          </div>
        </div>

        <div className="pr-1 flex items-center gap-1 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#30D158] live-dot-blinking" title="System Connected" />
        </div>
      </div>

    </aside>
  );
};
