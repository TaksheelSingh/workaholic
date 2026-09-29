import React, { useState } from 'react';
import { CalendarCard } from './CalendarCard';
import { LEAVE_TYPES, LEAVE_TYPE_KEYS, getLeaveHex } from '../constants/leaveTypes';
import { MONTH_NAMES } from '../utils/calendarUtils';
import { Filter, Calendar, Sparkles } from 'lucide-react';

export const CalendarView = ({
  year,
  monthIndex,
  leaves,
  isDark,
  onPrevMonth,
  onNextMonth,
  onDateClick
}) => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto animate-fadeIn">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Filter Calendar By Leave Category:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`
              px-3 py-1.5 text-xs font-bold rounded-xl transition
              ${
                selectedFilter === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            All Entries
          </button>

          {LEAVE_TYPE_KEYS.map((key) => {
            const isSel = selectedFilter === key;
            const hex = getLeaveHex(key, isDark);

            return (
              <button
                key={key}
                onClick={() => setSelectedFilter(key)}
                className={`
                  flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition
                  ${
                    isSel
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                <div style={{ backgroundColor: hex }} className="w-2.5 h-2.5 rounded-full" />
                <span>{key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Card */}
      <CalendarCard
        year={year}
        monthIndex={monthIndex}
        leaves={leaves}
        isDark={isDark}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onDateClick={onDateClick}
        activeCategoryFilter={selectedFilter === 'ALL' ? null : selectedFilter}
      />

    </div>
  );
};
