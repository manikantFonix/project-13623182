import AppShell from '../../components/AppShell';
import RecordsWorkspace from '../../components/records/RecordsWorkspace';
import { CUSTOMER_CONFIG } from '../../components/records/data';

export default function CustomersPage() {
  return (
    <AppShell>
      <RecordsWorkspace config={CUSTOMER_CONFIG} />
    </AppShell>
  );
}