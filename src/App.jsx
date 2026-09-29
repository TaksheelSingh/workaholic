import React, { useState, useEffect, useCallback } from 'react';
import {
  loadLeavesData,
  saveLeavesData,
  loadUserProfile,
  loadTheme,
  saveTheme,
  computeKpiMetrics,
  fetchTursoLeaves,
  saveTursoLeave,
  deleteTursoLeave
} from './utils/storage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { LeaveModal } from './components/LeaveModal';

export function App() {
  const [isDark, setIsDark] = useState(() => loadTheme() === 'dark');
  const [user] = useState(() => loadUserProfile());
  const [leaves, setLeaves] = useState(() => loadLeavesData());

  // Date selection state (Default: September 2026)
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(8); // September = 8

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    dateStr: null,
    entry: null
  });

  // Sync data from live database server
  const syncServerData = useCallback(async () => {
    const fetched = await fetchTursoLeaves();
    if (fetched && typeof fetched === 'object') {
      setLeaves(fetched);
    }
  }, []);

  // Poll server every 3 seconds and sync on window focus (tab switch / phone app open)
  useEffect(() => {
    syncServerData();

    const handleFocus = () => syncServerData();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(syncServerData, 3000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [syncServerData]);

  // Apply dark mode class to html document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  // Handle Month Navigation
  const handlePrevMonth = () => {
    if (selectedMonthIndex === 0) {
      setSelectedMonthIndex(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonthIndex === 11) {
      setSelectedMonthIndex(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonthIndex((prev) => prev + 1);
    }
  };

  /**
   * Date Circle Click Interaction Logic:
   * 1st Click on a blank/un-logged date -> Direct quick trigger for "In Office Work" (OFFICE - Light Green)
   * 2nd Click on an already set date -> Opens Leave Modal popup to configure/update leaves or reset
   */
  const handleDateClick = async (dateStr, entry) => {
    if (!entry) {
      // Direct trigger for In Office Work (Light Green)
      const officeEntry = {
        type: 'full',
        category: 'OFFICE'
      };
      await handleSaveLeave(dateStr, officeEntry);
    } else {
      // 2nd click: Open Leave Modal popup to edit / configure
      setModalState({
        isOpen: true,
        dateStr,
        entry: entry
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, dateStr: null, entry: null });
  };

  // Save / Update Leave Allocation
  const handleSaveLeave = async (dateStr, entryData) => {
    const updated = {
      ...leaves,
      [dateStr]: entryData
    };
    setLeaves(updated);
    saveLeavesData(updated);
    await saveTursoLeave(dateStr, entryData);
    syncServerData();
  };

  // Reset / Clear Leave Allocation for a single day
  const handleResetDay = async (dateStr) => {
    const updated = { ...leaves };
    delete updated[dateStr];
    setLeaves(updated);
    saveLeavesData(updated);
    await deleteTursoLeave(dateStr);
    syncServerData();
  };

  // Active Month Key string for KPI computation
  const activeMonthKey = `${selectedYear}-${String(selectedMonthIndex + 1).padStart(2, '0')}`;
  const metrics = computeKpiMetrics(leaves, activeMonthKey);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen overflow-x-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Left Sidebar */}
      <Sidebar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        user={user}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <TopBar />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto">
          <DashboardView
            year={selectedYear}
            monthIndex={selectedMonthIndex}
            leaves={leaves}
            metrics={metrics}
            isDark={isDark}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onDateClick={handleDateClick}
          />
        </main>
      </div>

      {/* 3. Leave Configuration Modal */}
      <LeaveModal
        isOpen={modalState.isOpen}
        dateStr={modalState.dateStr}
        existingEntry={modalState.entry}
        isDark={isDark}
        onSave={handleSaveLeave}
        onReset={handleResetDay}
        onClose={handleCloseModal}
      />

    </div>
  );
}

export default App;
