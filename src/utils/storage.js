import { INITIAL_LEAVES, DEFAULT_USER } from './initialData';
import { LEAVE_TYPE_KEYS } from '../constants/leaveTypes';

const STORAGE_KEYS = {
  LEAVES: 'workaholic_leaves_data_v2',
  USER: 'workaholic_user_profile_v2',
  THEME: 'workaholic_theme_v2'
};

const API_BASE = '/api/leaves';

export const fetchTursoLeaves = async () => {
  try {
    const res = await fetch(API_BASE);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.leaves) {
        saveLeavesData(data.leaves);
        return data.leaves;
      }
    }
  } catch (e) {
    // API server not running (e.g. standalone Vite dev without node server) -> use local storage
  }
  return loadLeavesData();
};

export const saveTursoLeave = async (dateStr, entryData) => {
  try {
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateStr, entryData })
    });
  } catch (e) {
    // ignore offline sync
  }
};

export const deleteTursoLeave = async (dateStr) => {
  try {
    await fetch(`${API_BASE}/${dateStr}`, {
      method: 'DELETE'
    });
  } catch (e) {
    // ignore offline sync
  }
};

export const loadLeavesData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEAVES);
    if (!raw) {
      return INITIAL_LEAVES;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_LEAVES;
  }
};

export const saveLeavesData = (leaves) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(leaves));
  } catch (err) {
    console.error('Error saving leaves data to localStorage:', err);
  }
};

export const loadUserProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return DEFAULT_USER;
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_USER;
  }
};

export const saveUserProfile = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (err) {
    console.error('Error saving user profile:', err);
  }
};

export const loadTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch (err) {
    return 'light';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (err) {
    console.error('Error saving theme:', err);
  }
};

/**
 * Mathematical Computation Engine:
 * Total(C) = N_full(C) * 1.0 + N_half(C) * 0.5
 */
export const computeKpiMetrics = (leaves, monthKey = null) => {
  const metrics = {};

  LEAVE_TYPE_KEYS.forEach((key) => {
    metrics[key] = {
      fullCount: 0,
      halfCount: 0,
      total: 0
    };
  });

  Object.entries(leaves || {}).forEach(([dateStr, entry]) => {
    if (monthKey && !dateStr.startsWith(monthKey)) {
      return;
    }

    if (!entry) return;

    if (entry.type === 'full' && entry.category) {
      if (metrics[entry.category]) {
        metrics[entry.category].fullCount += 1;
      }
    } else if (entry.type === 'half') {
      if (entry.half1 && metrics[entry.half1]) {
        metrics[entry.half1].halfCount += 1;
      }
      if (entry.half2 && metrics[entry.half2]) {
        metrics[entry.half2].halfCount += 1;
      }
    }
  });

  LEAVE_TYPE_KEYS.forEach((key) => {
    const item = metrics[key];
    item.total = item.fullCount * 1.0 + item.halfCount * 0.5;
    item.formattedTotal = item.total.toFixed(1);
  });

  return metrics;
};
