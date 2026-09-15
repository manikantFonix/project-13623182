import AdminShell from '../../../components/admin/AdminShell';
import SubscriptionsOversight from '../../../components/admin/subscriptions/SubscriptionsOversight';

export default function AdminSubscriptionsPage() {
  return (
    <AdminShell>
      <SubscriptionsOversight />
    </AdminShell>
  );
}