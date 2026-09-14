export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tag?: string;
  location?: string;
}

export const customers: Customer[] = [
  {
    id: 'c1',
    name: 'Elena Marchetti',
    email: 'elena.marchetti@example.com',
    phone: '+39 02 5550 0177',
    tag: 'VIP Client',
    location: 'Milan, Italy',
  },
  {
    id: 'c2',
    name: 'Oliver Bennett',
    email: 'oliver.bennett@example.com',
    phone: '+44 20 7946 0241',
    tag: 'Wholesale',
    location: 'London, United Kingdom',
  },
  {
    id: 'c3',
    name: 'Mia Taylor',
    email: 'mia.taylor@example.com',
    phone: '+61 2 5550 0139',
    tag: 'Retail',
    location: 'Sydney, Australia',
  },
  {
    id: 'c4',
    name: 'Ava Clarke',
    email: 'ava.clarke@example.com',
    phone: '+1 416 555 0228',
    tag: 'Wholesale',
    location: 'Toronto, Canada',
  },
  {
    id: 'c5',
    name: 'Sophia Reed',
    email: 'sophia.reed@example.com',
    phone: '+33 1 44 55 0206',
    tag: 'Private',
    location: 'Paris, France',
  },
  {
    id: 'c6',
    name: 'Ethan Walker',
    email: 'ethan.walker@example.com',
    phone: '+1 212 555 0256',
    tag: 'VIP Client',
    location: 'New York, United States',
  },
  {
    id: 'c7',
    name: 'Grace Hall',
    email: 'grace.hall@example.com',
    phone: '+353 1 555 0194',
    tag: 'Retail',
    location: 'Dublin, Ireland',
  },
];

export const CUSTOMER_TAGS = ['VIP Client', 'Wholesale', 'Retail', 'Private'];

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}