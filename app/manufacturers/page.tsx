import AppShell from '../../components/AppShell';
import RecordsWorkspace from '../../components/records/RecordsWorkspace';
import { MANUFACTURER_CONFIG } from '../../components/records/data';

export default function ManufacturersPage() {
  return (
    <AppShell>
      <RecordsWorkspace config={MANUFACTURER_CONFIG} />
    </AppShell>
  );
}