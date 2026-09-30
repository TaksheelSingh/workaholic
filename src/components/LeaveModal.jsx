import React, { useState, useEffect } from 'react';
import { LEAVE_TYPES, LEAVE_TYPE_KEYS } from '../constants/leaveTypes';
import { formatNiceDate } from '../utils/calendarUtils';
import { X, Check, Trash2, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LeaveModal = ({
  isOpen,
  dateStr,
  existingEntry,
  isDark,
  onSave,
  onReset,
  onClose
}) => {
  const [allocationMode, setAllocationMode] = useState('full'); // 'full', 'half1', 'half2', 'split'
  const [selectedCategory, setSelectedCategory] = useState('PL');
  const [half1Category, setHalf1Category] = useState('OFFICE');
  const [half2Category, setHalf2Category] = useState('OD');

  // All categories available in dropdown list (including In Office Work)
  const dropdownCategories = LEAVE_TYPE_KEYS;

  useEffect(() => {
    if (existingEntry) {
      if (existingEntry.type === 'full') {
        setAllocationMode('full');
        setSelectedCategory(existingEntry.category || 'PL');
        setHalf1Category('OFFICE');
        setHalf2Category('OD');
      } else if (existingEntry.type === 'half') {
        if (existingEntry.half1 && existingEntry.half2) {
          setAllocationMode('split');
          setHalf1Category(existingEntry.half1);
          setHalf2Category(existingEntry.half2);
          setSelectedCategory(existingEntry.half1);
        } else if (existingEntry.half2) {
          setAllocationMode('half2');
          setSelectedCategory(existingEntry.half2);
          setHalf1Category('OFFICE');
          setHalf2Category(existingEntry.half2);
        } else {
          setAllocationMode('half1');
          setSelectedCategory(existingEntry.half1 || 'SL');
          setHalf1Category(existingEntry.half1 || 'SL');
          setHalf2Category('OD');
        }
      }
    } else {
      setAllocationMode('full');
      setSelectedCategory('PL');
      setHalf1Category('OFFICE');
      setHalf2Category('OD');
    }
  }, [existingEntry, isOpen, dateStr]);

  if (!isOpen || !dateStr) return null;

  const handleSave = () => {
    let entryData = null;

    if (allocationMode === 'full') {
      entryData = {
        type: 'full',
        category: selectedCategory
      };
    } else if (allocationMode === 'half1') {
      entryData = {
        type: 'half',
        half1: selectedCategory,
        half2: null
      };
    } else if (allocationMode === 'half2') {
      entryData = {
        type: 'half',
        half1: null,
        half2: selectedCategory
      };
    } else if (allocationMode === 'split') {
      entryData = {
        type: 'half',
        half1: half1Category,
        half2: half2Category
      };
    }

    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore if confetti fails
    }

    onSave(dateStr, entryData);
    onClose();
  };

  const handleReset = () => {
    onReset(dateStr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all text-gray-900 dark:text-gray-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Configure Leave
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatNiceDate(dateStr)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          
          {/* 1. Duration Allocation */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              1. Duration Allocation
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'full', label: 'Full Day', sub: '1.0 Day' },
                { id: 'half1', label: '1st Half', sub: '0.5 Day' },
                { id: 'half2', label: '2nd Half', sub: '0.5 Day' },
                { id: 'split', label: 'Dual Half', sub: '0.5 + 0.5' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAllocationMode(item.id)}
                  className={`
                    flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer
                    ${
                      allocationMode === item.id
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-75 mt-0.5">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Leave Category Selector(s) */}
          {allocationMode === 'split' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>2A. 1st Half Category (Left Half)</span>
                </label>
                <div className="relative">
                  <select
                    value={half1Category}
                    onChange={(e) => setHalf1Category(e.target.value)}
                    className="w-full appearance-none pl-4 pr-10 py-2.5 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                  >
                    {dropdownCategories.map((key) => {
                      const item = LEAVE_TYPES[key];
                      return (
                        <option key={key} value={key} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                          {item.name} ({key})
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 dark:text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>2B. 2nd Half Category (Right Half)</span>
                </label>
                <div className="relative">
                  <select
                    value={half2Category}
                    onChange={(e) => setHalf2Category(e.target.value)}
                    className="w-full appearance-none pl-4 pr-10 py-2.5 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                  >
                    {dropdownCategories.map((key) => {
                      const item = LEAVE_TYPES[key];
                      return (
                        <option key={key} value={key} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                          {item.name} ({key})
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 dark:text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {allocationMode === 'half1'
                  ? '2. Select 1st Half Category (Left Half)'
                  : allocationMode === 'half2'
                  ? '2. Select 2nd Half Category (Right Half)'
                  : '2. Select Leave Category'}
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-3 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                >
                  {dropdownCategories.map((key) => {
                    const item = LEAVE_TYPES[key];
                    return (
                      <option key={key} value={key} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        {item.name} ({key})
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 dark:text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/80">
          <div>
            {existingEntry ? (
              <button
                type="button"
                onClick={handleReset}
                title="Reset Day"
                className="w-10 h-10 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/60 bg-red-50 dark:bg-red-950/30 transition cursor-pointer flex items-center justify-center shadow-sm active:scale-95"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            ) : <div className="w-10 h-10" />}
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              title={existingEntry ? 'Update' : 'Save'}
              className="w-10 h-10 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
