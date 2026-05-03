export type Season = 'sun' | 'aut' | 'win' | 'spr';

export interface Month {
  label: string;
  mo: number; // 0=Jan … 11=Dec
  d: number;  // days in month
  s: Season;
}

// 18-month sequence starting Jun 2026 — explicit mo+d per entry to avoid PSH lookup bugs
export const MONTHS: Month[] = [
  { label: 'Jun 26', mo: 5,  d: 30, s: 'sun' },
  { label: 'Jul 26', mo: 6,  d: 31, s: 'sun' },
  { label: 'Aug 26', mo: 7,  d: 31, s: 'sun' },
  { label: 'Sep 26', mo: 8,  d: 30, s: 'aut' },
  { label: 'Oct 26', mo: 9,  d: 31, s: 'aut' },
  { label: 'Nov 26', mo: 10, d: 30, s: 'win' },
  { label: 'Dec 26', mo: 11, d: 31, s: 'win' },
  { label: 'Jan 27', mo: 0,  d: 31, s: 'win' },
  { label: 'Feb 27', mo: 1,  d: 28, s: 'win' },
  { label: 'Mar 27', mo: 2,  d: 31, s: 'spr' },
  { label: 'Apr 27', mo: 3,  d: 30, s: 'spr' },
  { label: 'May 27', mo: 4,  d: 31, s: 'spr' },
  { label: 'Jun 27', mo: 5,  d: 30, s: 'sun' },
  { label: 'Jul 27', mo: 6,  d: 31, s: 'sun' },
  { label: 'Aug 27', mo: 7,  d: 31, s: 'sun' },
  { label: 'Sep 27', mo: 8,  d: 30, s: 'aut' },
  { label: 'Oct 27', mo: 9,  d: 31, s: 'aut' },
  { label: 'Nov 27', mo: 10, d: 30, s: 'win' },
];

// a0–a11 (Jun→May) maps to month indices 5,6,7,8,9,10,11,0,1,2,3,4
export const A_TO_MO = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];
