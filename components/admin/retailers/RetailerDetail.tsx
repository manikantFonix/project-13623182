'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RetailerHeader from './RetailerHeader';
import AccountSection from './AccountSection';
import SubscriptionSection from './SubscriptionSection';
import ConsumptionSection from './ConsumptionSection';
import CatalogsSection from './CatalogsSection';
import WidgetSection from './WidgetSection';
import RetailerDetailNote from './RetailerDetailNote';
import RetailerDetailSkeleton from './RetailerDetailSkeleton';
import RetailerDetailErrorState from './RetailerDetailErrorState';
import RetailerDetailStateControl, { type DetailPreview } from './RetailerDetailStateControl';
import DisableDialog from './DisableDialog';
import EnableDialog from './EnableDialog';
import { VARIANT_IDS, getDetail, type DetailVariant, type RetailerStatus } from './data';

type Variant = DetailVariant | 'route';
type Dialog = { kind: 'disable' } | { kind: 'enable' };

export default function RetailerDetail({ retailerId }: { retailerId: string }) {
  const router = useRouter();
  const search = useSearchParams();

  const [variant, setVariant] = useState<Variant>('route');
  const [phase, setPhase] = useState<'ready' | 'loading' | 'error'>('ready');
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, RetailerStatus>>({});

  const shownId = variant === 'route' ? retailerId : VARIANT_IDS[variant];
  const statusOverride = overrides[shownId];
  const detail = getDetail(shownId, statusOverride);

  const basePath = `/admin/retailers/${retailerId}`;

  const openDialog = useCallback(
    (next: Dialog) => {
      setDialog(next);
      const query = next.kind === 'disable' ? '?disable=1' : '?enable=1';
      router.replace(`${basePath}${query}`, { scroll: false });
    },
    [router, basePath]
  );

  const closeDialog = useCallback(() => {
    if (submitting) return;
    setDialog(null);
    setSubmitting(false);
    if (search.toString()) router.replace(basePath, { scroll: false });
  }, [submitting, router, basePath, search]);

  useEffect(() => {
    if (search.get('disable') === '1') {
      setPhase('ready');
      setDialog({ kind: 'disable' });
    } else if (search.get('enable') === '1') {
      setPhase('ready');
      setDialog({ kind: 'enable' });
    }
  }, [search]);

  const confirmDisable = () => {
    setSubmitting(true);
    setTimeout(() => {
      setOverrides((prev) => ({ ...prev, [shownId]: 'disabled' }));
      setSubmitting(false);
      setDialog(null);
      router.replace(basePath, { scroll: false });
    }, 900);
  };

  const confirmEnable = () => {
    setSubmitting(true);
    setTimeout(() => {
      setOverrides((prev) => ({ ...prev, [shownId]: 'active' }));
      setSubmitting(false);
      setDialog(null);
      router.replace(basePath, { scroll: false });
    }, 900);
  };

  const onPreview = (next: DetailPreview) => {
    setSubmitting(false);
    if (next === 'loading' || next === 'error') {
      setPhase(next);
      setDialog(null);
      if (search.toString()) router.replace(basePath, { scroll: false });
      return;
    }
    setPhase('ready');
    if (next === 'disable' || next === 'disable-submitting') {
      setVariant('route');
      setDialog({ kind: 'disable' });
      setSubmitting(next === 'disable-submitting');
      router.replace(`${basePath}?disable=1`, { scroll: false });
      return;
    }
    if (next === 'enable') {
      setDialog({ kind: 'enable' });
      router.replace(`${basePath}?enable=1`, { scroll: false });
      return;
    }
    setVariant(next);
    setDialog(null);
    if (search.toString()) router.replace(basePath, { scroll: false });
  };

  const preview: DetailPreview =
    phase === 'loading'
      ? 'loading'
      : phase === 'error'
        ? 'error'
        : dialog
          ? dialog.kind === 'disable'
            ? submitting
              ? 'disable-submitting'
              : 'disable'
            : 'enable'
          : variant === 'route'
            ? 'active'
            : variant;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      {phase === 'loading' ? (
        <RetailerDetailSkeleton />
      ) : phase === 'error' ? (
        <div className="max-w-[1280px]">
          <RetailerDetailErrorState onRetry={() => setPhase('ready')} />
        </div>
      ) : !detail ? (
        <div className="max-w-[1280px]">
          <RetailerDetailErrorState onRetry={() => router.push('/admin/retailers')} />
        </div>
      ) : (
        <>
          <RetailerHeader
            retailer={detail.retailer}
            onDisable={() => openDialog({ kind: 'disable' })}
            onEnable={() => openDialog({ kind: 'enable' })}
          />

          <div className="mt-8 max-w-[1280px] flex flex-col gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <AccountSection retailer={detail.retailer} />
              <SubscriptionSection subscription={detail.subscription} />
            </div>
            <ConsumptionSection consumption={detail.consumption} />
            <div className="grid gap-4 lg:grid-cols-2">
              <CatalogsSection catalogs={detail.catalogs} />
              <WidgetSection widget={detail.widget} />
            </div>
            <div className="mt-6">
              <RetailerDetailNote />
            </div>
          </div>
        </>
      )}

      <RetailerDetailStateControl state={preview} onChange={onPreview} />

      {dialog?.kind === 'disable' && detail && (
        <DisableDialog
          name={detail.retailer.name}
          catalogCount={detail.catalogs.filter((c) => c.published).length}
          widgetOrigin={detail.widget ? detail.widget.origin : null}
          submitting={submitting}
          onCancel={closeDialog}
          onConfirm={confirmDisable}
        />
      )}

      {dialog?.kind === 'enable' && detail && (
        <EnableDialog
          name={detail.retailer.name}
          submitting={submitting}
          onCancel={closeDialog}
          onConfirm={confirmEnable}
        />
      )}
    </main>
  );
}