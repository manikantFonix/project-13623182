import { getBottleneckView } from './bottlenecks/data';
import { WIDGETS_ATTENTION } from './widgets/data';

export interface AdminNavScreenDef {
  label: string;
  icon: string;
  href?: string;
  count?: number;
  countLabel?: string;
}

export interface AdminNavAreaDef {
  key: string;
  label: string;
  icon: string;
  href?: string;
  children?: AdminNavScreenDef[];
}

const openBottlenecks = getBottleneckView('attention').aboveCount;
const widgetAttention = WIDGETS_ATTENTION;

export const adminNav: AdminNavAreaDef[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'ri-dashboard-3-line',
    href: '/admin',
  },
  {
    key: 'monitoring',
    label: 'Monitoring',
    icon: 'ri-line-chart-line',
    children: [
      {
        label: 'Bottlenecks',
        icon: 'ri-alarm-warning-line',
        href: '/admin/bottlenecks',
        count: openBottlenecks,
        countLabel: `${openBottlenecks} open bottlenecks need a look`,
      },
      { label: 'Catalogs', icon: 'ri-book-2-line', href: '/admin/catalogs' },
      { label: 'Leads', icon: 'ri-user-received-2-line', href: '/admin/leads' },
      {
        label: 'Widgets',
        icon: 'ri-layout-right-2-line',
        href: '/admin/widgets',
        count: widgetAttention,
        countLabel: `${widgetAttention} widgets need attention`,
      },
    ],
  },
  {
    key: 'customers',
    label: 'Customers',
    icon: 'ri-user-search-line',
    href: '/admin/customers',
  },
  {
    key: 'manufacturers',
    label: 'Manufacturers',
    icon: 'ri-building-2-line',
    href: '/admin/manufacturers',
  },
  {
    key: 'retailers',
    label: 'Retailers',
    icon: 'ri-store-2-line',
    href: '/admin/retailers',
  },
  {
    key: 'billing',
    label: 'Subscriptions and Billing',
    icon: 'ri-bank-card-line',
    children: [
      { label: 'Plans & top-ups', icon: 'ri-stack-line', href: '/admin/plans' },
      { label: 'Subscriptions', icon: 'ri-repeat-line', href: '/admin/subscriptions' },
      { label: 'Invoices', icon: 'ri-file-list-3-line', href: '/admin/invoices' },
      { label: 'Providers', icon: 'ri-plug-line', href: '/admin/providers' },
      { label: 'Cancellations', icon: 'ri-user-unfollow-line', href: '/admin/cancellations' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'ri-settings-3-line',
    children: [
      { label: 'Prompts', icon: 'ri-chat-3-line', href: '/admin/prompts' },
      { label: 'Estimator', icon: 'ri-scales-3-line', href: '/admin/estimator' },
      { label: 'Audit trail', icon: 'ri-file-shield-2-line', href: '/admin/audit-trail' },
    ],
  },
];