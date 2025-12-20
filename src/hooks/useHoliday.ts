export type Holiday = 'christmas' | 'easter' | 'valentines' | 'newyear' | null;

// Berechnet Ostersonntag für ein Jahr (Gauss-Algorithmus)
function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

export function getCurrentHoliday(): Holiday {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();
  const year = now.getFullYear();

  // Weihnachten: 20. Dezember - 26. Dezember
  if (month === 11 && day >= 20 && day <= 26) {
    return 'christmas';
  }

  // Valentinstag: 13. - 15. Februar
  if (month === 1 && day >= 13 && day <= 15) {
    return 'valentines';
  }

  // Silvester/Neujahr: 30. Dezember - 2. Januar
  if ((month === 11 && day >= 30) || (month === 0 && day <= 2)) {
    return 'newyear';
  }

  // Ostern: 3 Tage vor bis 2 Tage nach Ostersonntag
  const easter = getEasterDate(year);
  const easterStart = new Date(easter);
  easterStart.setDate(easter.getDate() - 3);
  const easterEnd = new Date(easter);
  easterEnd.setDate(easter.getDate() + 2);
  
  if (now >= easterStart && now <= easterEnd) {
    return 'easter';
  }

  return null;
}

export function getHolidayEmoji(holiday: Holiday): string {
  switch (holiday) {
    case 'christmas': return '🎄';
    case 'easter': return '🐰';
    case 'valentines': return '💕';
    case 'newyear': return '🎆';
    default: return '';
  }
}

export function getHolidayName(holiday: Holiday): string {
  switch (holiday) {
    case 'christmas': return 'Boże Narodzenie';
    case 'easter': return 'Wielkanoc';
    case 'valentines': return 'Walentynki';
    case 'newyear': return 'Sylwester';
    default: return '';
  }
}
