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
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-fadeIn min-h-full flex flex-col justify-between">
      
      {/* Dashboard Layout: Interactive Calendar + KPI Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 1. Interactive Calendar Card (6 Columns) */}
        <div className="lg:col-span-6">
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

        {/* 2. KPI Metrics Grid for 7 Categories (6 Columns) */}
        <div className="lg:col-span-6">
          <div className="space-y-3">
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest block px-1">
              ACCUMULATED LEAVE METRICS (7 CATEGORIES)
            </span>
            <KpiMetricsGrid metrics={metrics} isDark={isDark} />
          </div>
        </div>

      </div>

      {/* Footer with Divider Line separating footer from cards */}
      <footer className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-800/80 text-center text-xs font-medium text-gray-400 dark:text-gray-500 space-y-1">
        <p>© 2026 workaholic. All workdays accounted for. Zero attendance confusion, zero math headaches.</p>
        <p className="text-[11px] text-gray-400/80 dark:text-gray-500/80">Made by Taksheel Rawat · Attendance & Leave Tracker</p>
      </footer>

    </div>
  );
};
