import AdminShell from '../../../components/admin/AdminShell';
import CancellationsOversight from '../../../components/admin/cancellations/CancellationsOversight';

export default function AdminCancellationsPage() {
  return (
    <AdminShell>
      <CancellationsOversight />
    </AdminShell>
  );
}