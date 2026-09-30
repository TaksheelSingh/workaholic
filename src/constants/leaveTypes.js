export const LEAVE_TYPES = {
  OFFICE: {
    key: 'OFFICE',
    name: 'In Office Work',
    accentColor: 'Light Green',
    lightHex: '#34D399',
    darkHex: '#10B981',
    description: 'On-site office attendance day'
  },
  WFH: {
    key: 'WFH',
    name: 'Work From Home',
    accentColor: 'Dark Green',
    lightHex: '#047857',
    darkHex: '#065F46',
    description: 'Remote work allocation day'
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
  PH: {
    key: 'PH',
    name: 'Public Holiday',
    accentColor: 'Orange',
    lightHex: '#F97316',
    darkHex: '#FB923C',
    description: 'Official corporate & state holiday'
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
  SHL: {
    key: 'SHL',
    name: 'Short Leave',
    accentColor: 'Light Brown',
    lightHex: '#B45309',
    darkHex: '#D97706',
    description: 'Short duration or partial hours leave'
  }
};

export const LEAVE_TYPE_KEYS = Object.keys(LEAVE_TYPES);

export const getLeaveHex = (key, isDark = false) => {
  const type = LEAVE_TYPES[key];
  if (!type) return isDark ? '#374151' : '#E5E7EB';
  return isDark ? type.darkHex : type.lightHex;
};
