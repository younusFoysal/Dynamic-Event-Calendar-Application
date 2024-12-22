export function getDaysInMonth(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];

  // Add days from previous month to start on Sunday
  const firstDay = date.getDay();
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }

  // Add all days of current month
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  // Add days from next month to complete the grid
  const lastDay = days[days.length - 1].getDay();
  for (let i = 1; i < 7 - lastDay; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isSameMonth(date: Date, month: number): boolean {
  return date.getMonth() === month;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];