import Sidebar from '../../../../components/Sidebar';
import CatalogueSettings from '../../../../components/CatalogueSettings';

export function generateStaticParams() {
  return [
    { id: 'bridal-2026' },
    { id: 'everyday-gold' },
    { id: 'solitaire-collection' },
    { id: 'festive-drops' },
  ];
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-[116px]">
        <CatalogueSettings />
      </div>
    </div>
  );
}