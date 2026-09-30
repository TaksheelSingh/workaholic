import { MONTH_NAMES, WEEKDAYS, getMonthDetails, formatDateKey } from '../utils/calendarUtils';
import { DateCircle } from './DateCircle';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarCard = ({
  year,
  monthIndex,
  leaves,
  isDark,
  onPrevMonth,
  onNextMonth,
  onDateClick
}) => {
  const days = getMonthDetails(year, monthIndex);
  const todayKey = formatDateKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  return (
    <div className="h-full flex flex-col justify-between bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-sm p-4 sm:p-5 space-y-4 transition-colors duration-200">
      
      {/* Month Navigation: Left arrow far left, Centered Month Name on top, Year below, Right arrow far right */}
      <div className="flex items-center justify-between px-1 pb-3 border-b border-[var(--border-color)]">
        <button
          type="button"
          onClick={onPrevMonth}
          title="Previous Month"
          className="w-9 h-9 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--border-hover)] transition cursor-pointer flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Middle Aligned Month & Year Header */}
        <div className="flex flex-col items-center justify-center text-center mx-auto">
          <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)] tracking-tight leading-none">
            {MONTH_NAMES[monthIndex]}
          </h2>
          <span className="text-xs font-semibold text-[var(--text-muted)] tracking-widest mt-1">
            {year}
          </span>
        </div>

        <button
          type="button"
          onClick={onNextMonth}
          title="Next Month"
          className="w-9 h-9 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--border-hover)] transition cursor-pointer flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7-Column Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider py-1 font-mono"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day Circles Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 justify-items-center">
        {days.map((dayObj) => {
          const entry = leaves[dayObj.dateStr];
          const isToday = dayObj.dateStr === todayKey;

          return (
            <div key={dayObj.dateStr} className="relative flex items-center justify-center">
              <DateCircle
                dayNumber={dayObj.dayNumber}
                entry={entry}
                isDark={isDark}
                isCurrentMonth={dayObj.isCurrentMonth}
                isToday={isToday}
                onClick={() => onDateClick(dayObj.dateStr, entry)}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};
