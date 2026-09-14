export type NotificationIcon =
  | 'ri-user-follow-line'
  | 'ri-price-tag-3-line'
  | 'ri-inbox-line'
  | 'ri-image-line'
  | 'ri-error-warning-line'
  | 'ri-battery-low-line'
  | 'ri-bank-card-line';

export interface NotificationItem {
  id: string;
  icon: NotificationIcon;
  message: string;
  time: string;
  href: string;
  read: boolean;
}

const base = (): NotificationItem[] => [
  { id: 'n1', icon: 'ri-battery-low-line', message: 'Your render balance is running low — 48 left.', time: '2 hours ago', href: '/settings/usage', read: false },
  { id: 'n2', icon: 'ri-user-follow-line', message: 'Sarah Mitchell approved JCX-102.', time: '2 hours ago', href: '/requests/r1?tab=customer', read: false },
  { id: 'n3', icon: 'ri-price-tag-3-line', message: 'PlatinumCraft sent a quote for JCX-102.', time: '3 hours ago', href: '/requests/r1?tab=manufacturer', read: false },
  { id: 'n4', icon: 'ri-inbox-line', message: 'New inquiry from Priya Nair about 3 pieces.', time: '5 hours ago', href: '/leads/c-1002', read: true },
  { id: 'n5', icon: 'ri-image-line', message: '24 renders finished in Bridal 2026.', time: '6 hours ago', href: '/catalog/bridal-2026/render-status', read: false },
  { id: 'n6', icon: 'ri-bank-card-line', message: 'Your plan renews on 12 April.', time: 'Yesterday', href: '/settings/usage', read: true },
  { id: 'n7', icon: 'ri-error-warning-line', message: '8 renders were flagged in Bridal 2026.', time: 'Yesterday', href: '/catalog/bridal-2026/render-status?state=flagged', read: false },
  { id: 'n8', icon: 'ri-battery-low-line', message: "You've run out of renders.", time: '12 Mar', href: '/settings/usage', read: true },
  { id: 'n9', icon: 'ri-bank-card-line', message: "We couldn't take payment for this period.", time: '12 Mar', href: '/settings/usage', read: true },
  { id: 'n10', icon: 'ri-image-line', message: '18 renders finished in Everyday gold.', time: '11 Mar', href: '/catalog/everyday-gold/render-status', read: true },
  { id: 'n11', icon: 'ri-user-follow-line', message: 'Sarah Mitchell rejected JCX-108.', time: '10 Mar', href: '/requests/r2?tab=customer', read: true },
  { id: 'n12', icon: 'ri-price-tag-3-line', message: 'Atelier Monaco sent a quote for JCX-129.', time: '9 Mar', href: '/requests/r8?tab=manufacturer', read: true },
  { id: 'n13', icon: 'ri-inbox-line', message: 'New inquiry from Marcus Bell about 3 pieces.', time: '8 Mar', href: '/leads/c-1005', read: true },
  { id: 'n14', icon: 'ri-error-warning-line', message: '4 renders were flagged in Solitaire collection.', time: '7 Mar', href: '/catalog/solitaire-collection/render-status?state=flagged', read: true },
  { id: 'n15', icon: 'ri-battery-low-line', message: 'Your render balance is running low — 12 left.', time: '6 Mar', href: '/settings/usage', read: true },
  { id: 'n16', icon: 'ri-bank-card-line', message: 'Your plan renews on 12 April.', time: '5 Mar', href: '/settings/usage', read: true },
  { id: 'n17', icon: 'ri-image-line', message: '12 renders finished in Festive drops.', time: '4 Mar', href: '/catalog/festive-drops/render-status', read: true },
  { id: 'n18', icon: 'ri-user-follow-line', message: 'Elena Marchetti approved JCX-108.', time: '3 Mar', href: '/requests/r2?tab=customer', read: true },
  { id: 'n19', icon: 'ri-inbox-line', message: 'New inquiry from Amelia Grant about 3 pieces.', time: '2 Mar', href: '/leads/c-1006', read: true },
  { id: 'n20', icon: 'ri-price-tag-3-line', message: 'Craftline Guild sent a quote for JCX-130.', time: '1 Mar', href: '/requests/r12?tab=manufacturer', read: true },
];

const more = (): NotificationItem[] => [
  { id: 'n21', icon: 'ri-image-line', message: '22 renders finished in Anniversary bands.', time: '28 Feb', href: '/catalog/anniversary-bands/render-status', read: true },
  { id: 'n22', icon: 'ri-error-warning-line', message: '3 renders were flagged in Gemstone classics.', time: '27 Feb', href: '/catalog/gemstone-classics/render-status?state=flagged', read: true },
  { id: 'n23', icon: 'ri-bank-card-line', message: "We couldn't take payment for this period.", time: '25 Feb', href: '/settings/usage', read: true },
  { id: 'n24', icon: 'ri-battery-low-line', message: "You've run out of renders.", time: '24 Feb', href: '/settings/usage', read: true },
  { id: 'n25', icon: 'ri-user-follow-line', message: 'Sophia Reed approved JCX-107.', time: '22 Feb', href: '/requests/r7?tab=customer', read: true },
  { id: 'n26', icon: 'ri-inbox-line', message: 'New inquiry from Chloe Dubois about 3 pieces.', time: '20 Feb', href: '/leads/w-2003', read: true },
  { id: 'n27', icon: 'ri-price-tag-3-line', message: 'Novum Fineworks sent a quote for JCX-131.', time: '18 Feb', href: '/requests/r9?tab=manufacturer', read: true },
  { id: 'n28', icon: 'ri-image-line', message: '16 renders finished in Bridal 2026.', time: '16 Feb', href: '/catalog/bridal-2026/render-status', read: true },
  { id: 'n29', icon: 'ri-bank-card-line', message: 'Your plan renews on 12 April.', time: '14 Feb', href: '/settings/usage', read: true },
  { id: 'n30', icon: 'ri-user-follow-line', message: 'Ethan Walker approved JCX-129.', time: '12 Feb', href: '/requests/r8?tab=customer', read: true },
];

export function buildNotifications(): NotificationItem[] {
  return [...base(), ...more()];
}

export const PAGE_SIZE = 20;