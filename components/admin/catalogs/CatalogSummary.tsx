'use client';

import CatalogFigure from './CatalogFigure';
import { fmt } from '../data';
import type { CatalogSummaryData } from './data';

export default function CatalogSummary({ summary }: { summary: CatalogSummaryData }) {
  return (
    <section aria-label="Platform catalog state" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <CatalogFigure
        label="Catalogs"
        value={fmt(summary.catalogs)}
        caption={`across ${fmt(summary.retailers)} retailers`}
      />
      <CatalogFigure
        label="Published"
        value={fmt(summary.published)}
        caption="live to anyone holding the link"
      />
      <CatalogFigure
        label="Products serving"
        value={fmt(summary.servingProducts)}
        caption={`of ${fmt(summary.publishedProducts)} published`}
      />
      <CatalogFigure
        label="Not being served"
        value={fmt(summary.notServed)}
        caption="renders still flagged or generating"
        attention={summary.notServed > 0}
      />
    </section>
  );
}