export const LEAVE_TYPES = {
  PH: {
    key: 'PH',
    name: 'Public Holiday',
    accentColor: 'Orange',
    lightHex: '#F97316',
    darkHex: '#FB923C',
    description: 'Official state or office declared holiday'
  },
  OPH: {
    key: 'OPH',
    name: 'Optional Public Holiday',
    accentColor: 'Yellow',
    lightHex: '#EAB308',
    darkHex: '#FACC15',
    description: 'Elective religious or regional holiday'
  },
  MD: {
    key: 'MD',
    name: 'My Day',
    accentColor: 'Purple',
    lightHex: '#A855F7',
    darkHex: '#C084FC',
    description: 'Personal birthday or work anniversary leave'
  },
  OD: {
    key: 'OD',
    name: 'On Duty',
    accentColor: 'Red',
    lightHex: '#EF4444',
    darkHex: '#F87171',
    description: 'External client site or official work'
  },
  PL: {
    key: 'PL',
    name: 'Privilege Leave',
    accentColor: 'Dark Blue',
    lightHex: '#1D4ED8',
    darkHex: '#3B82F6',
    description: 'Earned annual paid time off'
  },
  SL: {
    key: 'SL',
    name: 'Sick / Casual Leave',
    accentColor: 'Light Blue',
    lightHex: '#0EA5E9',
    darkHex: '#38BDF8',
    description: 'Unplanned health or urgent personal affairs'
  },
  WFH: {
    key: 'WFH',
    name: 'Work From Home',
    accentColor: 'Green',
    lightHex: '#10B981',
    darkHex: '#34D399',
    description: 'Remote work allocation day'
  }
};

export const LEAVE_TYPE_KEYS = Object.keys(LEAVE_TYPES);

export const getLeaveHex = (key, isDark = false) => {
  const type = LEAVE_TYPES[key];
  if (!type) return isDark ? '#374151' : '#E5E7EB';
  return isDark ? type.darkHex : type.lightHex;
};
