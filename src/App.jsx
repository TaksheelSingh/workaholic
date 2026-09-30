import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
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
      setLeaves((prev) => {
        // Only update if server data differs from current state
        if (JSON.stringify(prev) !== JSON.stringify(fetched)) {
          return fetched;
        }
        return prev;
      });
    }
  }, []);

  // Poll server every 5 seconds and sync on window focus
  useEffect(() => {
    syncServerData();

    const handleFocus = () => syncServerData();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(syncServerData, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [syncServerData]);

  // Synchronize dark mode class to html document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    saveTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleToggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    const nextDark = !isDark;
    if (nextDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    setIsDark(nextDark);
    saveTheme(nextDark ? 'dark' : 'light');
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 100);
  };

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
  const handleDateClick = (dateStr, entry) => {
    if (!entry) {
      // Direct trigger for In Office Work (Light Green)
      const officeEntry = {
        type: 'full',
        category: 'OFFICE'
      };
      handleSaveLeave(dateStr, officeEntry);
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

  // Optimistic Save / Update Leave Allocation (Instant 0ms UI update)
  const handleSaveLeave = (dateStr, entryData) => {
    setLeaves((prevLeaves) => {
      const updated = {
        ...prevLeaves,
        [dateStr]: entryData
      };
      saveLeavesData(updated);
      return updated;
    });

    // Background server sync (non-blocking fire-and-forget)
    saveTursoLeave(dateStr, entryData).catch((err) => {
      console.error('Background Turso save error:', err);
    });
  };

  // Optimistic Reset / Clear Leave Allocation for a single day (Instant 0ms UI update)
  const handleResetDay = (dateStr) => {
    setLeaves((prevLeaves) => {
      const updated = { ...prevLeaves };
      delete updated[dateStr];
      saveLeavesData(updated);
      return updated;
    });

    // Background server delete (non-blocking fire-and-forget)
    deleteTursoLeave(dateStr).catch((err) => {
      console.error('Background Turso delete error:', err);
    });
  };

  // Active Month Key string for KPI computation
  const activeMonthKey = `${selectedYear}-${String(selectedMonthIndex + 1).padStart(2, '0')}`;
  const metrics = computeKpiMetrics(leaves, activeMonthKey);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans selection:bg-[#0A84FF] selection:text-white">
      
      {/* Mobile Top Header (Matching dabba design) */}
      <header className="mobile-header">
        <div className="font-extrabold text-xl tracking-tight text-[var(--text-primary)]">
          workaholic<span className="text-[#0A84FF]">.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[var(--bg-card-inner)] text-[#0A84FF] text-xs font-bold border border-[var(--border-hover)]">
            Dash
          </span>
          <button
            onClick={handleToggleTheme}
            className="p-1.5 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
        </div>
      </header>

      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        user={user}
      />

      {/* 2. Main Workspace */}
      <main className="main-workspace">
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
