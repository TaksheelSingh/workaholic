import React, { useState } from 'react';
import { LEAVE_TYPES, getLeaveHex, LEAVE_TYPE_KEYS } from '../constants/leaveTypes';
import { formatNiceDate } from '../utils/calendarUtils';
import { Search, Filter, Trash2, Edit3, Download, Calendar, Tag, FileText, ChevronDown } from 'lucide-react';

export const LeaveHistoryView = ({
  leaves,
  isDark,
  onEditDate,
  onDeleteDate,
  onExportJson
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Convert object to array of sorted records
  const records = Object.entries(leaves)
    .map(([dateStr, entry]) => ({ dateStr, ...entry }))
    .sort((a, b) => b.dateStr.localeCompare(a.dateStr));

  // Filter records
  const filteredRecords = records.filter((rec) => {
    // Type filter
    if (filterType !== 'ALL') {
      if (rec.type === 'full' && rec.category !== filterType) return false;
      if (rec.type === 'half' && rec.half1 !== filterType && rec.half2 !== filterType) return false;
    }

    // Search filter
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const dateMatch = rec.dateStr.toLowerCase().includes(q);
      const noteMatch = rec.note ? rec.note.toLowerCase().includes(q) : false;
      const catMatch = rec.category ? rec.category.toLowerCase().includes(q) : false;
      const h1Match = rec.half1 ? rec.half1.toLowerCase().includes(q) : false;
      const h2Match = rec.half2 ? rec.half2.toLowerCase().includes(q) : false;
      return dateMatch || noteMatch || catMatch || h1Match || h2Match;
    }

    return true;
  });

  const exportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,Date,Type,Category / Allocation,Units,Note\n';
    filteredRecords.forEach((r) => {
      const typeStr = r.type === 'full' ? 'Full Day' : 'Half Day';
      const catStr = r.type === 'full'
        ? `${LEAVE_TYPES[r.category]?.name || r.category} (${r.category})`
        : `1st Half: ${r.half1 || 'Working'} | 2nd Half: ${r.half2 || 'Working'}`;
      const units = r.type === 'full' ? '1.0' : '0.5';
      const noteClean = (r.note || '').replace(/"/g, '""');
      csvContent += `"${r.dateStr}","${typeStr}","${catStr}","${units}","${noteClean}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `presentia_leave_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      
      {/* Controls Bar: Search, Category Dropdown, Export */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0a0a0c] p-4 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search date, category, note..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filter & CSV Export */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          
          <div className="relative flex items-center">
            <Filter className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2 text-xs rounded-xl bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {LEAVE_TYPE_KEYS.map((k) => (
                <option key={k} value={k}>
                  {LEAVE_TYPES[k].name} ({k})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

        </div>

      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-[#0a0a0c] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-gray-400 dark:text-gray-500 space-y-3">
            <Calendar className="w-12 h-12 mx-auto stroke-1 opacity-50" />
            <p className="text-sm font-medium">No leave records found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-gray-900/50 text-[11px] font-extrabold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Allocation Type</th>
                  <th className="py-3.5 px-6">Category Breakdown</th>
                  <th className="py-3.5 px-6">Units</th>
                  <th className="py-3.5 px-6">Note</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10 text-xs">
                {filteredRecords.map((r) => {
                  return (
                    <tr key={r.dateStr} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition">
                      
                      {/* Date */}
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        {formatNiceDate(r.dateStr)}
                      </td>

                      {/* Allocation Type */}
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${r.type === 'full' ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400'}`}>
                          {r.type === 'full' ? 'Full Day' : 'Half Day'}
                        </span>
                      </td>

                      {/* Category Breakdown */}
                      <td className="py-4 px-6">
                        {r.type === 'full' ? (
                          <div className="flex items-center space-x-2">
                            <div
                              style={{ backgroundColor: getLeaveHex(r.category, isDark) }}
                              className="w-3 h-3 rounded-full flex-shrink-0"
                            />
                            <span className="font-bold text-gray-800 dark:text-gray-200">
                              {LEAVE_TYPES[r.category]?.name || r.category} ({r.category})
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-bold text-gray-400">1ST HALF:</span>
                              {r.half1 ? (
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {LEAVE_TYPES[r.half1]?.name} ({r.half1})
                                </span>
                              ) : (
                                <span className="text-gray-400 italic">Working</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-bold text-gray-400">2ND HALF:</span>
                              {r.half2 ? (
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {LEAVE_TYPES[r.half2]?.name} ({r.half2})
                                </span>
                              ) : (
                                <span className="text-gray-400 italic">Working</span>
                              )}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Units */}
                      <td className="py-4 px-6 font-mono font-bold text-gray-900 dark:text-white">
                        {r.type === 'full' ? '1.0' : (r.half1 && r.half2 ? '1.0' : '0.5')}
                      </td>

                      {/* Note */}
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {r.note || '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => onEditDate(r.dateStr, r)}
                          title="Edit Allocation"
                          className="w-7 h-7 rounded-full text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition inline-flex items-center justify-center hover:scale-110"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteDate(r.dateStr)}
                          title="Delete Allocation"
                          className="w-7 h-7 rounded-full text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition inline-flex items-center justify-center hover:scale-110"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
