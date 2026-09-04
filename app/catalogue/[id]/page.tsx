import Sidebar from '../../../components/Sidebar';
import CatalogueWorkspace from '../../../components/CatalogueWorkspace';

export function generateStaticParams() {
  return [
    { id: 'bridal-2026' },
    { id: 'everyday-gold' },
    { id: 'solitaire-collection' },
    { id: 'festive-drops' },
  ];
}

export default function CataloguePage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-[116px]">
        <CatalogueWorkspace />
      </div>
    </div>
  );
}