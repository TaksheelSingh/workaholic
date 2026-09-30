import React from 'react';
import { CalendarCard } from './CalendarCard';
import { KpiMetricsGrid } from './KpiMetricsGrid';

export const DashboardView = ({
  year,
  monthIndex,
  leaves,
  metrics,
  isDark,
  onPrevMonth,
  onNextMonth,
  onDateClick
}) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto animate-fadeIn min-h-full flex flex-col justify-between">
      
      {/* Responsive Dashboard Grid: Desktop 2-column, Mobile single column stack */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 items-start">
        
        {/* 1. Interactive Calendar Card (6 Columns Desktop, 100% Mobile) */}
        <div className="xl:col-span-6 w-full">
          <CalendarCard
            year={year}
            monthIndex={monthIndex}
            leaves={leaves}
            isDark={isDark}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            onDateClick={onDateClick}
          />
        </div>

        {/* 2. KPI Metrics Grid for Categories (6 Columns Desktop, 100% Mobile) */}
        <div className="xl:col-span-6 w-full">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest block px-1">
              ACCUMULATED ATTENDANCE & LEAVE METRICS
            </span>
            <KpiMetricsGrid metrics={metrics} isDark={isDark} />
          </div>
        </div>

      </div>

      {/* Bottom-Anchored Footer with Dashed Top Separator Line */}
      <footer className="mt-auto pt-6 pb-4 border-t border-dashed border-gray-200 dark:border-white/10 text-center text-xs text-gray-400 dark:text-gray-500 space-y-1">
        <p className="font-semibold text-gray-700 dark:text-gray-200">
          © 2026 workaholic. All workdays accounted for. Zero attendance confusion, zero math headaches.
        </p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">
          Made by Taksheel Rawat
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          Telemetry monitored by Workaholic Engine
        </p>
      </footer>

    </div>
  );
};
