import React from 'react';
import { LEAVE_TYPES, LEAVE_TYPE_KEYS, getLeaveHex } from '../constants/leaveTypes';

export const KpiMetricsGrid = ({ metrics, isDark, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {LEAVE_TYPE_KEYS.map((key) => {
        const typeInfo = LEAVE_TYPES[key];
        const data = metrics[key] || { fullCount: 0, halfCount: 0, total: 0, formattedTotal: '0.0' };
        const hex = getLeaveHex(key, isDark);

        return (
          <div
            key={key}
            onClick={() => onCategoryClick && onCategoryClick(key)}
            className="kpi-hover-card group relative bg-white dark:bg-[#0a0a0c] rounded-3xl p-4 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-250 ease-out cursor-pointer overflow-hidden space-y-2"
          >
            {/* Category Indicator Dot & Name */}
            <div className="flex items-center space-x-2">
              <div
                style={{ backgroundColor: hex }}
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
              />
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest truncate" title={typeInfo.name}>
                {key} <span className="font-semibold text-gray-700 dark:text-gray-300">· {typeInfo.name}</span>
              </span>
            </div>

            {/* Total Value */}
            <div className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              {data.formattedTotal} <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">DAYS</span>
            </div>

            {/* Sub-metrics breakdown (Full Days vs Half Days) */}
            <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 flex justify-between pt-1 border-t border-gray-100 dark:border-white/10">
              <span>Full Days: <strong className="text-gray-700 dark:text-gray-300">{data.fullCount}</strong></span>
              <span>Half Days: <strong className="text-gray-700 dark:text-gray-300">{data.halfCount}</strong></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
