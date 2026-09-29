import React, { useState } from 'react';
import { exportDataJson, importDataJson, resetToDefaults } from '../utils/storage';
import { LEAVE_TYPES, LEAVE_TYPE_KEYS, getLeaveHex } from '../constants/leaveTypes';
import { User, Shield, Download, Upload, RotateCcw, Check, AlertCircle, Sun, Moon } from 'lucide-react';

export const SettingsView = ({
  user,
  onSaveUser,
  isDark,
  onToggleTheme,
  leaves,
  onDataImported,
  onResetData
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || 'Taksheel Rawat',
    initials: user?.initials || 'TR',
    role: user?.role || 'Local User',
    email: user?.email || 'taksheel.rawat@company.com'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'name' && value.trim()) {
        const words = value.trim().split(' ');
        const initials = words.map((w) => w[0]).join('').toUpperCase().slice(0, 2);
        updated.initials = initials;
      }
      return updated;
    });
  };

  const handleUserSave = (e) => {
    e.preventDefault();
    onSaveUser(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content) {
        const result = importDataJson(content);
        if (result.success) {
          onDataImported(result.leaves, result.user);
          setImportStatus({ success: true, message: 'Successfully imported leave backup!' });
        } else {
          setImportStatus({ success: false, message: result.error });
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto animate-fadeIn">
      
      {/* 1. Profile Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-sm p-6 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              User Profile & Account
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Personalize your dashboard profile initials and role attributes.
            </p>
          </div>
        </div>

        <form onSubmit={handleUserSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleUserChange}
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Initials Badge
              </label>
              <input
                type="text"
                name="initials"
                value={formData.initials}
                onChange={handleUserChange}
                maxLength={3}
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Role Subtext
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleUserChange}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleUserChange}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-fadeIn">
                Profile saved successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 2. Theme & Preference */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Appearance Mode
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Toggle between light and dark theme mode according to your preference.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Switch to {isDark ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </div>

      {/* 3. Leave Policy Reference Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-sm p-6 space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Configured Leave Types & Hex Palette
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              System-wide leave categories and their light/dark theme accent colors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEAVE_TYPE_KEYS.map((k) => {
            const item = LEAVE_TYPES[k];
            const hex = getLeaveHex(k, isDark);
            return (
              <div key={k} className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex items-center space-x-3">
                <div style={{ backgroundColor: hex }} className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {item.name} ({k})
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    Light: {item.lightHex} | Dark: {item.darkHex}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Data Storage & Backup (JSON Export / Import / Reset) */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-sm p-6 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Data Storage & JSON Backup / Restore
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Export your attendance database to JSON or restore from a previous backup file.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Export JSON */}
          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-3">
            <span className="text-xs font-bold text-gray-900 dark:text-white block">
              1. Export JSON Data
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Download a complete JSON file containing all user entries and parameters.
            </p>
            <button
              type="button"
              onClick={() => exportDataJson(leaves, user)}
              className="w-full inline-flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition"
            >
              <Download className="w-4 h-4" />
              <span>Export Backup JSON</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-3">
            <span className="text-xs font-bold text-gray-900 dark:text-white block">
              2. Import JSON Backup
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Restore presentia data from an existing JSON backup file.
            </p>
            <label className="w-full inline-flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm cursor-pointer transition">
              <Upload className="w-4 h-4" />
              <span>Choose File to Import</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset Defaults */}
          <div className="p-4 rounded-xl border border-red-100 dark:border-red-950/50 bg-red-50/30 dark:bg-red-950/20 space-y-3">
            <span className="text-xs font-bold text-red-900 dark:text-red-300 block">
              3. Reset to Sample Data
            </span>
            <p className="text-[11px] text-red-600/80 dark:text-red-400/80">
              Reset all attendance entries back to original sample dataset for Sep 2026.
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all data back to original sample data?')) {
                  onResetData();
                }
              }}
              className="w-full inline-flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-xl transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Data</span>
            </button>
          </div>

        </div>

        {importStatus && (
          <div className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${importStatus.success ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300'}`}>
            {importStatus.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{importStatus.message}</span>
          </div>
        )}

      </div>

    </div>
  );
};
