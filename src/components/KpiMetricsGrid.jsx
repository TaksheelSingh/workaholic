import { LEAVE_TYPES, LEAVE_TYPE_KEYS, getLeaveHex } from '../constants/leaveTypes';

export const KpiMetricsGrid = ({ metrics, isDark, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full">
      {LEAVE_TYPE_KEYS.map((key) => {
        const typeInfo = LEAVE_TYPES[key];
        const data = metrics[key] || { fullCount: 0, halfCount: 0, total: 0, formattedTotal: '0.0' };
        const hex = getLeaveHex(key, isDark);

        return (
          <div
            key={key}
            onClick={() => onCategoryClick && onCategoryClick(key)}
            className="kpi-hover-card group relative bg-[var(--bg-card)] rounded-2xl p-3.5 border border-[var(--border-color)] shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[var(--border-hover)] transition-all duration-200 ease-out cursor-pointer overflow-hidden space-y-1.5"
          >
            {/* Category Indicator Dot & Name */}
            <div className="flex items-center space-x-2">
              <div
                style={{ backgroundColor: hex }}
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
              />
              <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-widest truncate font-mono" title={typeInfo.name}>
                {key} <span className="font-semibold text-[var(--text-secondary)] font-sans">· {typeInfo.name}</span>
              </span>
            </div>

            {/* Total Value */}
            <div className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">
              {data.formattedTotal} <span className="text-[10px] font-bold text-[var(--text-muted)] font-mono">DAYS</span>
            </div>

            {/* Sub-metrics breakdown (Full Days vs Half Days) */}
            <div className="text-[10px] font-semibold text-[var(--text-muted)] flex justify-between pt-1 border-t border-[var(--border-color)] font-mono">
              <span>Full: <strong className="text-[var(--text-primary)] font-sans">{data.fullCount}</strong></span>
              <span>Half: <strong className="text-[var(--text-primary)] font-sans">{data.halfCount}</strong></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
