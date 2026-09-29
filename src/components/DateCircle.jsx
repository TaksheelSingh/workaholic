import React from 'react';
import { getLeaveHex } from '../constants/leaveTypes';

export const DateCircle = ({
  dayNumber,
  entry,
  isDark = false,
  isCurrentMonth = true,
  isSelected = false,
  isToday = false,
  onClick
}) => {
  let style = {};

  const neutralBg = isDark ? '#374151' : '#F1F5F9';

  if (entry) {
    if (entry.type === 'full' && entry.category) {
      const hex = getLeaveHex(entry.category, isDark);
      style = {
        background: hex,
        color: '#FFFFFF',
        boxShadow: `0 4px 14px ${hex}40`
      };
    } else if (entry.type === 'half') {
      const half1Hex = entry.half1 ? getLeaveHex(entry.half1, isDark) : neutralBg;
      const half2Hex = entry.half2 ? getLeaveHex(entry.half2, isDark) : neutralBg;

      style = {
        background: `linear-gradient(90deg, ${half1Hex} 50%, ${half2Hex} 50%)`,
        color: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      };
    }
  } else {
    style = {
      background: isDark ? '#1F2937' : '#F8FAFC',
      color: isCurrentMonth ? (isDark ? '#D1D5DB' : '#334155') : (isDark ? '#4B5563' : '#94A3B8'),
      border: `1px solid ${isDark ? '#374151' : '#E2E8F0'}`
    };
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer select-none font-bold text-sm
        ${!isCurrentMonth ? 'opacity-30' : ''}
        ${isSelected ? 'ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900 scale-105' : ''}
        ${isToday && !entry ? 'ring-2 ring-indigo-600 border-2 border-indigo-500' : ''}
        hover:scale-105 hover:shadow-lg
      `}
    >
      <span className="leading-none drop-shadow-sm">{dayNumber}</span>
    </button>
  );
};
