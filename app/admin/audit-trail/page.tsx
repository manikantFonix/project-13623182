import AdminShell from '../../../components/admin/AdminShell';
import AuditOversight from '../../../components/admin/audit/AuditOversight';

export default function AdminAuditTrailPage() {
  return (
    <AdminShell>
      <AuditOversight />
    </AdminShell>
  );
}