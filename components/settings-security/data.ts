export type SecurityPreview =
  | 'default'
  | 'onlyCurrent'
  | 'loading'
  | 'error'
  | 'partial'
  | 'mismatch'
  | 'short'
  | 'wrongCurrent'
  | 'updating'
  | 'updated'
  | 'updateFailed'
  | 'signOutConfirm'
  | 'signOutAllConfirm'
  | 'signingOut';

export interface Session {
  id: string;
  ref: string;
  signedIn: string;
  expires: string;
  current: boolean;
  sortAt: number;
}

export const defaultSessions: Session[] = [
  {
    id: 'cur',
    ref: 'Session 1563',
    signedIn: 'Signed in 9 September 2026, 4:41 AM',
    expires: 'Expires 9 October 2026',
    current: true,
    sortAt: 100,
  },
  {
    id: 's1',
    ref: 'Session 1548',
    signedIn: 'Signed in 2 September 2026, 11:26 PM',
    expires: 'Expires 2 October 2026',
    current: false,
    sortAt: 40,
  },
  {
    id: 's2',
    ref: 'Session 1531',
    signedIn: 'Signed in 29 August 2026, 8:15 PM',
    expires: 'Expires 23 September 2026',
    current: false,
    sortAt: 35,
  },
  {
    id: 's3',
    ref: 'Session 1507',
    signedIn: 'Signed in 18 August 2026, 3:02 PM',
    expires: 'Expires 12 September 2026',
    current: false,
    sortAt: 30,
  },
  {
    id: 's4',
    ref: 'Session 1482',
    signedIn: 'Signed in 7 August 2026, 9:40 AM',
    expires: 'Expires 7 September 2026',
    current: false,
    sortAt: 25,
  },
];

export const onlyCurrentSessions: Session[] = [
  {
    id: 'cur',
    ref: 'Session 1563',
    signedIn: 'Signed in 9 September 2026, 4:41 AM',
    expires: 'Expires 9 October 2026',
    current: true,
    sortAt: 100,
  },
];