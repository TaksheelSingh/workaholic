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
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 space-y-6 transition-colors duration-200">
      
      {/* Centered Month Navigation: < September 2026 > */}
      <div className="flex items-center justify-between px-4 pb-2">
        <button
          type="button"
          onClick={onPrevMonth}
          className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
          {MONTH_NAMES[monthIndex]} {year}
        </h2>

        <button
          type="button"
          onClick={onNextMonth}
          className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 7-Column Weekday Headers */}
      <div className="grid grid-cols-7 gap-3 text-center">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest py-1"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day Circles Grid */}
      <div className="grid grid-cols-7 gap-3 justify-items-center">
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
