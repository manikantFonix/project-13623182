'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import PlansTable from './PlansTable';
import PlanFeatureGrid from './PlanFeatureGrid';
import TopUpsTable from './TopUpsTable';
import PlansNote from './PlansNote';
import PlansSkeleton from './PlansSkeleton';
import PlansErrorState from './PlansErrorState';
import PlansStateControl, { type PlansPreview } from './PlansStateControl';
import PlanDialog from './PlanDialog';
import ArchiveDialog from './ArchiveDialog';
import RestoreDialog from './RestoreDialog';
import TopUpDialog from './TopUpDialog';
import { PLANS, TOPUPS, type Plan, type TopUp } from './data';

type Modal =
  | { kind: 'create' }
  | { kind: 'edit'; planId: string }
  | { kind: 'archive'; planId: string; zero?: boolean }
  | { kind: 'restore'; planId: string }
  | { kind: 'topup'; id: string };

export default function PlansOversight() {
  const router = useRouter();
  const search = useSearchParams();
  const archiveParam = search.get('archive');

  const [state, setState] = useState<'populated' | 'loading' | 'error'>('populated');
  const [preview, setPreview] = useState<PlansPreview>('populated');
  const [plans, setPlans] = useState<Plan[]>(PLANS);
  const [topups, setTopups] = useState<TopUp[]>(TOPUPS);
  const [modal, setModal] = useState<Modal | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    if (archiveParam && PLANS.some((plan) => plan.id === archiveParam)) {
      setState('populated');
      setPreview('archive');
      setSubmitting(false);
      setFailed(false);
      setModal({ kind: 'archive', planId: archiveParam });
    }
  }, [archiveParam]);

  const persist = (apply: () => void, message: string, back?: string) => {
    setSubmitting(true);
    setFailed(false);
    window.setTimeout(() => {
      apply();
      setSubmitting(false);
      setModal(null);
      setPreview('populated');
      setAnnounce(message);
      if (back) router.replace(back, { scroll: false });
    }, 900);
  };

  const openEdit = (planId: string) => {
    setState('populated');
    setFailed(false);
    setSubmitting(false);
    setPreview('populated');
    setModal({ kind: 'edit', planId });
  };

  const openArchive = (planId: string) => {
    setState('populated');
    setFailed(false);
    setSubmitting(false);
    setPreview('archive');
    setModal({ kind: 'archive', planId });
  };

  const openRestore = (planId: string) => {
    setState('populated');
    setFailed(false);
    setSubmitting(false);
    setPreview('restore');
    setModal({ kind: 'restore', planId });
  };

  const closeModal = () => {
    if (submitting) return;
    setModal(null);
    setSubmitting(false);
    setFailed(false);
    setPreview('populated');
    if (archiveParam) router.replace('/admin/plans', { scroll: false });
  };

  const live = plans.filter((plan) => plan.status === 'live');
  const archived = plans.filter((plan) => plan.status === 'archived');
  const activePlan = modal && 'planId' in modal ? plans.find((p) => p.id === modal.planId) : undefined;
  const activePack = modal?.kind === 'topup' ? topups.find((p) => p.id === modal.id) : undefined;

  const applyPreview = (next: PlansPreview) => {
    setSubmitting(false);
    setFailed(false);
    setState('populated');
    setModal(null);
    if (next === 'loading' || next === 'error') {
      setState(next);
      return;
    }
    switch (next) {
      case 'create':
        setModal({ kind: 'create' });
        break;
      case 'edit':
        setModal({ kind: 'edit', planId: 'starter' });
        break;
      case 'archive':
        setModal({ kind: 'archive', planId: 'starter' });
        break;
      case 'archive-zero':
        setModal({ kind: 'archive', planId: 'starter', zero: true });
        break;
      case 'restore':
        setModal({ kind: 'restore', planId: 'free-trial' });
        break;
      case 'topup':
        setModal({ kind: 'topup', id: 'pack-25' });
        break;
      case 'saving':
        setModal({ kind: 'edit', planId: 'starter' });
        setSubmitting(true);
        break;
      case 'save-failed':
        setModal({ kind: 'edit', planId: 'starter' });
        setFailed(true);
        break;
      default:
        break;
    }
  };

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      <header className="max-w-[1180px]">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
          Plans &amp; top-ups
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
          Every plan and top-up pack on the platform. Sizes and prices are editable; gating is not.
        </p>
        <p className="mt-2 text-[12px] text-[var(--muted-text)]">
          Plans are archived, never deleted. Gating is read-only.
        </p>
      </header>

      <div aria-live="polite" className="sr-only">
        {announce}
      </div>

      <div className="mt-7 max-w-[1280px]">
        {state === 'loading' ? (
          <PlansSkeleton />
        ) : state === 'error' ? (
          <PlansErrorState onRetry={() => applyPreview('populated')} />
        ) : (
          <>
            <section aria-label="Live plans">
              <div className="flex items-start justify-between gap-4">
                <SectionHeading
                  title="Plans"
                  purpose="What a retailer can be put on. Subscriber counts show who each plan touches."
                  period={`${live.length} live · ${archived.length} archived`}
                />
                <button
                  type="button"
                  onClick={() => applyPreview('create')}
                  className="mt-0.5 shrink-0 h-9 px-4 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[var(--accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
                >
                  Create a plan
                </button>
              </div>
              <PlansTable
                plans={live}
                caption="Live plans. A retailer can be put on any of these."
                onEdit={openEdit}
                onArchive={openArchive}
                onRestore={openRestore}
              />
            </section>

            {archived.length > 0 && (
              <section aria-label="Archived plans" className="mt-9">
                <SectionHeading
                  title="Archived"
                  purpose="Not offered to new retailers. Restoring returns a plan to the list above."
                  period={`${archived.length} archived`}
                />
                <PlansTable
                  plans={archived}
                  caption="Archived plans. Subscribers stay on them at their existing terms."
                  onEdit={openEdit}
                  onArchive={openArchive}
                  onRestore={openRestore}
                />
              </section>
            )}

            <section aria-label="What each plan includes" className="mt-9">
              <SectionHeading
                title="What each plan includes"
                purpose="Capabilities per tier. Shown for reference and not editable here."
              />
              <PlanFeatureGrid plans={plans} />
            </section>

            <section aria-label="Top-up products" className="mt-9">
              <SectionHeading
                title="Top-up products"
                purpose="Three packs. Both the size and the price of a pack can be changed."
              />
              <TopUpsTable
                packs={topups}
                onEdit={(id) => setModal({ kind: 'topup', id })}
                onToggle={(id) =>
                  setTopups((prev) =>
                    prev.map((pack) =>
                      pack.id === id ? { ...pack, enabled: !pack.enabled } : pack
                    )
                  )
                }
              />
            </section>

            <div className="mt-10">
              <PlansNote />
            </div>
          </>
        )}
      </div>

      {modal?.kind === 'create' && (
        <PlanDialog
          submitting={submitting}
          failed={failed}
          onCancel={closeModal}
          onConfirm={(values) =>
            persist(
              () =>
                setPlans((prev) => [
                  ...prev,
                  {
                    id: `plan-${prev.length + 1}`,
                    subscribers: 0,
                    features: ['bespoke'],
                    ...values,
                  },
                ]),
              `${values.name} created.`
            )
          }
        />
      )}

      {modal?.kind === 'edit' && activePlan && (
        <PlanDialog
          plan={activePlan}
          submitting={submitting}
          failed={failed}
          onCancel={closeModal}
          onConfirm={(values) =>
            persist(() => {
              setPlans((prev) =>
                prev.map((plan) => (plan.id === activePlan.id ? { ...plan, ...values } : plan))
              );
            }, `${values.name} saved.`)
          }
        />
      )}

      {modal?.kind === 'archive' && activePlan && (
        <ArchiveDialog
          name={activePlan.name}
          subscribers={modal.zero ? 0 : activePlan.subscribers}
          submitting={submitting}
          onCancel={closeModal}
          onConfirm={() =>
            persist(
              () =>
                setPlans((prev) =>
                  prev.map((plan) =>
                    plan.id === activePlan.id ? { ...plan, status: 'archived' } : plan
                  )
                ),
              `${activePlan.name} archived. Subscribers stay on it.`,
              archiveParam ? '/admin/plans' : undefined
            )
          }
        />
      )}

      {modal?.kind === 'restore' && activePlan && (
        <RestoreDialog
          name={activePlan.name}
          subscribers={activePlan.subscribers}
          submitting={submitting}
          onCancel={closeModal}
          onConfirm={() =>
            persist(
              () =>
                setPlans((prev) =>
                  prev.map((plan) =>
                    plan.id === activePlan.id ? { ...plan, status: 'live' } : plan
                  )
                ),
              `${activePlan.name} restored.`
            )
          }
        />
      )}

      {modal?.kind === 'topup' && activePack && (
        <TopUpDialog
          pack={activePack}
          submitting={submitting}
          failed={failed}
          onCancel={closeModal}
          onConfirm={(size, price) =>
            persist(
              () =>
                setTopups((prev) =>
                  prev.map((pack) => (pack.id === activePack.id ? { ...pack, size, price } : pack))
                ),
              `${activePack.size}-render pack saved.`
            )
          }
        />
      )}

      <PlansStateControl state={preview} onChange={applyPreview} />
    </main>
  );
}