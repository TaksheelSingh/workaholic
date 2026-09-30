import React from 'react';
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
    <div className="bg-white dark:bg-[#0a0a0c] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-4 sm:p-6 md:p-8 space-y-6 transition-colors duration-200">
      
      {/* Month Navigation: Left arrow far left, Centered Month Name on top, Year below, Right arrow far right */}
      <div className="flex items-center justify-between px-2 sm:px-4 pb-4 border-b border-gray-100 dark:border-white/10">
        <button
          type="button"
          onClick={onPrevMonth}
          title="Previous Month"
          className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-[#161618] border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Middle Aligned Month & Year Header */}
        <div className="flex flex-col items-center justify-center text-center mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
            {MONTH_NAMES[monthIndex]}
          </h2>
          <span className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 tracking-widest mt-1">
            {year}
          </span>
        </div>

        <button
          type="button"
          onClick={onNextMonth}
          title="Next Month"
          className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-[#161618] border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer flex-shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 7-Column Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 text-center">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="text-[10px] sm:text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider py-1"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day Circles Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 md:gap-3 justify-items-center">
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
