import AdminShell from '../../../components/admin/AdminShell';
import LeadsOversight from '../../../components/admin/leads/LeadsOversight';

export default function AdminLeadsPage() {
  return (
    <AdminShell>
      <LeadsOversight />
    </AdminShell>
  );
}