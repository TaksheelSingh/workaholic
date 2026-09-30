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
    <div className="flex-1 flex flex-col justify-between h-full space-y-6">
      
      {/* Dynamic View Content */}
      <div className="space-y-6">
        
        {/* Dashboard Title & Subtitle with Line Below (Exact GMD Specification) */}
        <div className="mb-6 pb-4 border-b border-[var(--border-color)]">
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 font-normal">
            Real-time leave balances, half-day allocations, and monthly attendance tracking.
          </p>
        </div>

        {/* Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 items-stretch">
          
          {/* 1. Interactive Calendar Card */}
          <div className="xl:col-span-6 w-full h-full flex flex-col justify-between">
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

          {/* 2. KPI Metrics Grid for Categories */}
          <div className="xl:col-span-6 w-full h-full flex flex-col justify-between">
            <KpiMetricsGrid metrics={metrics} isDark={isDark} />
          </div>

        </div>
      </div>

      {/* Bottom Footer Anchored at Very Bottom with Dashed Line Directly Above (Matching GMD Reference) */}
      <footer className="mt-auto pt-4 pb-4 border-t border-dashed border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)] space-y-1">
        <p className="font-semibold text-xs text-[var(--text-primary)]">
          &copy; 2026 workaholic. All workdays accounted for. Zero attendance confusion, zero math headaches.
        </p>
        <p className="text-[11px] text-[var(--text-muted)] font-normal">
          Made by Taksheel Rawat
        </p>
        <p className="text-[11px] text-[var(--text-muted)] font-normal">
          Telemetry monitored by Workaholic Engine
        </p>
      </footer>

    </div>
  );
};
