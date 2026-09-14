'use client';

import { useState } from 'react';
import { resolveCatalog, servableProducts, type ConsumerProduct } from './data';
import ConsumerHeader from './ConsumerHeader';
import SelectionBar from './SelectionBar';
import UnavailablePage from './UnavailablePage';
import PreviewControl, { type PreviewScenario } from './PreviewControl';
import { consumerTokenStyle } from './consumerTokens';
import ProductDetailView, { WithdrawnView } from './ProductDetailView';

const DETAIL_SCENARIOS: PreviewScenario[] = [
  { id: 'default', label: 'Default' },
  { id: 'singled', label: 'One color' },
  { id: 'noprice', label: 'No price' },
  { id: 'nodesc', label: 'No description' },
  { id: 'viewfail', label: 'Failed view' },
  { id: 'withdrawn', label: 'Withdrawn' },
  { id: 'loading', label: 'Loading' },
  { id: 'unavailable', label: 'Unavailable' },
  { id: 'sel-over', label: 'Over PDF cap' },
  { id: 'brand-nologo', label: 'No logo' },
  { id: 'brand-nocontact', label: 'No contact' },
];

export default function ConsumerProductRoute({
  token,
  productId,
}: {
  token: string;
  productId: string;
}) {
  const catalog = resolveCatalog(token);
  const [scenario, setScenario] = useState('default');

  const product = catalog
    ? servableProducts(catalog).find((p) => p.id === productId)
    : undefined;

  if (!catalog || !catalog.available || scenario === 'unavailable') {
    return <UnavailablePage />;
  }

  if (!product || product.id === 'broken-preview') {
    return <UnavailablePage />;
  }

  if (scenario === 'withdrawn') {
    return (
      <div
        className="min-h-screen bg-[#EDF1FA]"
        style={consumerTokenStyle(catalog.brand.primaryColor)}
      >
        <ConsumerHeader brand={catalog.brand} />
        <WithdrawnView token={token} />
        <SelectionBar token={token} brand={catalog.brand} />
        <PreviewControl
          scenarios={DETAIL_SCENARIOS}
          value={scenario}
          onChange={setScenario}
        />
      </div>
    );
  }

  const showLogo = scenario !== 'brand-nologo';
  const noContact = scenario === 'brand-nocontact';
  const effectiveBrand = noContact
    ? { ...catalog.brand, email: undefined, phone: undefined }
    : catalog.brand;

  const displayProduct: ConsumerProduct = (() => {
    if (scenario === 'singled') {
      const m = product.metals[0];
      return {
        ...product,
        metals: [m],
        images: { [m]: product.images[m] },
      };
    }
    if (scenario === 'noprice') return { ...product, price: null };
    if (scenario === 'nodesc') return { ...product, description: undefined };
    if (scenario === 'viewfail') {
      const m = product.metals[0];
      return {
        ...product,
        images: {
          ...product.images,
          [m]: { ...product.images[m], worn: '/missing-view.jpg' },
        },
      };
    }
    return product;
  })();

  const loading = scenario === 'loading';

  return (
    <div
      className="min-h-screen bg-[#EDF1FA]"
      style={consumerTokenStyle(catalog.brand.primaryColor)}
    >
      <ConsumerHeader brand={effectiveBrand} showLogo={showLogo} />
      <ProductDetailView
        product={displayProduct}
        token={token}
        withdrawn={false}
        loading={loading}
      />
      <SelectionBar token={token} brand={catalog.brand} scenario={scenario} />
      <PreviewControl
        scenarios={DETAIL_SCENARIOS}
        value={scenario}
        onChange={setScenario}
      />
    </div>
  );
}