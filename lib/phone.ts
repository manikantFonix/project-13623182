export interface Country {
  name: string;
  dial: string;
}

export const COUNTRIES: Country[] = [
  { name: 'United States', dial: '+1' },
  { name: 'Canada', dial: '+1' },
  { name: 'United Kingdom', dial: '+44' },
  { name: 'Ireland', dial: '+353' },
  { name: 'France', dial: '+33' },
  { name: 'Germany', dial: '+49' },
  { name: 'Italy', dial: '+39' },
  { name: 'Spain', dial: '+34' },
  { name: 'Portugal', dial: '+351' },
  { name: 'Netherlands', dial: '+31' },
  { name: 'Belgium', dial: '+32' },
  { name: 'Switzerland', dial: '+41' },
  { name: 'Austria', dial: '+43' },
  { name: 'Monaco', dial: '+377' },
  { name: 'Sweden', dial: '+46' },
  { name: 'Norway', dial: '+47' },
  { name: 'Denmark', dial: '+45' },
  { name: 'Finland', dial: '+358' },
  { name: 'Poland', dial: '+48' },
  { name: 'Czechia', dial: '+420' },
  { name: 'Greece', dial: '+30' },
  { name: 'Turkey', dial: '+90' },
  { name: 'Ukraine', dial: '+380' },
  { name: 'United Arab Emirates', dial: '+971' },
  { name: 'Saudi Arabia', dial: '+966' },
  { name: 'Qatar', dial: '+974' },
  { name: 'Kuwait', dial: '+965' },
  { name: 'Bahrain', dial: '+973' },
  { name: 'Oman', dial: '+968' },
  { name: 'Israel', dial: '+972' },
  { name: 'Egypt', dial: '+20' },
  { name: 'South Africa', dial: '+27' },
  { name: 'Nigeria', dial: '+234' },
  { name: 'Kenya', dial: '+254' },
  { name: 'Morocco', dial: '+212' },
  { name: 'India', dial: '+91' },
  { name: 'Pakistan', dial: '+92' },
  { name: 'Bangladesh', dial: '+880' },
  { name: 'Sri Lanka', dial: '+94' },
  { name: 'China', dial: '+86' },
  { name: 'Hong Kong', dial: '+852' },
  { name: 'Taiwan', dial: '+886' },
  { name: 'Japan', dial: '+81' },
  { name: 'South Korea', dial: '+82' },
  { name: 'Singapore', dial: '+65' },
  { name: 'Malaysia', dial: '+60' },
  { name: 'Thailand', dial: '+66' },
  { name: 'Indonesia', dial: '+62' },
  { name: 'Philippines', dial: '+63' },
  { name: 'Vietnam', dial: '+84' },
  { name: 'Australia', dial: '+61' },
  { name: 'New Zealand', dial: '+64' },
  { name: 'Brazil', dial: '+55' },
  { name: 'Mexico', dial: '+52' },
  { name: 'Argentina', dial: '+54' },
  { name: 'Chile', dial: '+56' },
  { name: 'Colombia', dial: '+57' },
  { name: 'Peru', dial: '+51' },
];

export const DEFAULT_DIAL = '+1';

const SORTED_DIALS = [...COUNTRIES].sort(
  (a, b) => b.dial.length - a.dial.length
);

export function parsePhone(value: string): { dial: string; national: string } {
  const v = (value ?? '').trim();
  if (!v.startsWith('+')) {
    return { dial: DEFAULT_DIAL, national: v };
  }
  for (const c of SORTED_DIALS) {
    if (v === c.dial) return { dial: c.dial, national: '' };
    if (v.startsWith(c.dial)) {
      const rest = v.slice(c.dial.length);
      if (rest === '' || /^[\s0-9()\-.]/.test(rest)) {
        return { dial: c.dial, national: rest.trim() };
      }
    }
  }
  return { dial: DEFAULT_DIAL, national: v };
}

export function composePhone(dial: string, national: string): string {
  const nat = national.trim();
  return nat ? `${dial} ${nat}` : dial;
}