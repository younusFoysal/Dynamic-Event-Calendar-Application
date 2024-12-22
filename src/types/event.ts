export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  color?: 'default' | 'work' | 'personal' | 'other';
}

export type EventColor = Event['color'];

export interface DayEvents {
  [date: string]: Event[];
}