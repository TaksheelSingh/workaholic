export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const formatDateKey = (year, monthIndex, day) => {
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
};

export const parseDateKey = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, monthIndex: month - 1, day };
};

export const getMonthDetails = (year, monthIndex) => {
  const firstDay = new Date(year, monthIndex, 1);
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sun, 1 = Mon ...
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

  const days = [];

  // Previous month padding
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDayNumber = daysInPrevMonth - i;
    const prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevYear = monthIndex === 0 ? year - 1 : year;
    days.push({
      dateStr: formatDateKey(prevYear, prevMonthIndex, prevDayNumber),
      dayNumber: prevDayNumber,
      isCurrentMonth: false,
      isPrevMonth: true,
      year: prevYear,
      monthIndex: prevMonthIndex
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      dateStr: formatDateKey(year, monthIndex, d),
      dayNumber: d,
      isCurrentMonth: true,
      year,
      monthIndex
    });
  }

  // Next month padding to fill grid to 35 or 42 cells
  const totalCellsSoFar = days.length;
  const targetCells = totalCellsSoFar > 35 ? 42 : 35;
  const nextMonthPaddingNeeded = targetCells - totalCellsSoFar;

  for (let n = 1; n <= nextMonthPaddingNeeded; n++) {
    const nextMonthIndex = monthIndex === 11 ? 0 : monthIndex + 1;
    const nextYear = monthIndex === 11 ? year + 1 : year;
    days.push({
      dateStr: formatDateKey(nextYear, nextMonthIndex, n),
      dayNumber: n,
      isCurrentMonth: false,
      isNextMonth: true,
      year: nextYear,
      monthIndex: nextMonthIndex
    });
  }

  return days;
};

export const formatNiceDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
