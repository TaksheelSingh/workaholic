import { Sun, Moon } from 'lucide-react';

export const Sidebar = ({
  isDark,
  onToggleTheme,
  user
}) => {
  return (
    <aside className="sidebar flex flex-col justify-between">
      
      {/* Top Header: workaholic. Brand Name + Theme Toggle beside it */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-2xl tracking-tight text-[var(--text-primary)]">
              workaholic<span className="text-[#0A84FF]">.</span>
            </span>
          </div>

          {/* Theme Toggle Button right beside workaholic. */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm cursor-pointer"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
        </div>

        {/* Section Label: MAIN */}
        <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest px-3 mb-3 font-mono">
          MAIN
        </div>

        {/* Sidebar Navigation Item */}
        <nav className="space-y-2">
          <button
            className="sidebar-nav-pill active"
          >
            <span>Dashboard</span>
          </button>
        </nav>
      </div>

      {/* BOTTOM LEFT USER BADGE (Matching GMD Reference Specification) */}
      <div 
        className="bottom-status-badge w-full cursor-pointer flex items-center justify-between shadow-sm"
        title="Workaholic Telemetry Active"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#0A84FF] text-white font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0">
            {user?.initials || 'TR'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[var(--text-primary)] leading-none truncate">
              {user?.name || 'Taksheel Rawat'}
            </div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5 truncate">
              Workaholic User
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
};
