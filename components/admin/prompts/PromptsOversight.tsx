'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GenerationLogPanel from './GenerationLogPanel';
import GenerationLogInline from './GenerationLogInline';
import CompletenessBanner from './CompletenessBanner';
import CategoryRail from './CategoryRail';
import PromptSetSection from './PromptSetSection';
import PromptDialog, { type PromptTab } from './PromptDialog';
import VersionDialog from './VersionDialog';
import RollbackDialog from './RollbackDialog';
import DiscardDialog from './DiscardDialog';
import PromptsNote from './PromptsNote';
import PromptsSkeleton from './PromptsSkeleton';
import PromptsErrorState from './PromptsErrorState';
import PromptsStateControl, { type PromptsPreview } from './PromptsStateControl';
import {
  HERO_PROMPT_KEY,
  PROMPT_CATEGORIES,
  categoryEditedCount,
  categoryPromptCount,
  findCategory,
  findCategoryOfPrompt,
  findPrompt,
  withNewVersion,
  type Category,
} from './data';

type DialogState =
  | { kind: 'view'; systemKey: string }
  | { kind: 'edit'; systemKey: string }
  | { kind: 'version'; systemKey: string; version: number }
  | { kind: 'rollback'; systemKey: string; version: number }
  | { kind: 'discard'; systemKey: string };

type ListState = 'populated' | 'loading' | 'error';

export default function PromptsOversight() {
  const router = useRouter();
  const search = useSearchParams();
  const rollbackParam = search.get('rollback');
  const versionParam = search.get('version');

  const [categories, setCategories] = useState<Category[]>(PROMPT_CATEGORIES);
  const [selectedId, setSelectedId] = useState<string | null>('ring');
  const [logOpen, setLogOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [tab, setTab] = useState<PromptTab>('text');
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [listState, setListState] = useState<ListState>('populated');
  const [preview, setPreview] = useState<PromptsPreview>('populated');
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    if (!rollbackParam) return;
    const prompt = findPrompt(PROMPT_CATEGORIES, rollbackParam);
    if (!prompt) return;
    const category = findCategoryOfPrompt(PROMPT_CATEGORIES, rollbackParam);
    const versionNumber = Number(versionParam);
    const target = prompt.versions.find((item) => item.version === versionNumber);
    setListState('populated');
    setSelectedId(category ? category.id : 'ring');
    setSubmitting(false);
    setFailed(false);
    setPreview('rollback');
    setDialog({
      kind: 'rollback',
      systemKey: rollbackParam,
      version: target ? target.version : prompt.versions[0].version,
    });
  }, [rollbackParam, versionParam]);

  const selected = findCategory(categories, selectedId ?? '');
  const dialogPrompt = dialog ? findPrompt(categories, dialog.systemKey) : undefined;
  const dialogCategory = dialog ? findCategoryOfPrompt(categories, dialog.systemKey) : undefined;
  const activeVersion =
    dialogPrompt && (dialog?.kind === 'version' || dialog?.kind === 'rollback')
      ? dialogPrompt.versions.find((item) => item.version === dialog.version)
      : undefined;

  const dirty =
    dialog?.kind === 'edit' && dialogPrompt ? draft !== dialogPrompt.text : false;

  const openPrompt = (systemKey: string) => {
    setFailed(false);
    setSubmitting(false);
    setTab('text');
    setPreview('viewing');
    setDialog({ kind: 'view', systemKey });
  };

  const openEdit = (systemKey: string) => {
    const prompt = findPrompt(categories, systemKey);
    setDraft(prompt ? prompt.text : '');
    setFailed(false);
    setSubmitting(false);
    setTab('text');
    setPreview('editing');
    setDialog({ kind: 'edit', systemKey });
  };

  const backToEdit = (systemKey: string) => {
    setPreview('editing');
    setDialog({ kind: 'edit', systemKey });
  };

  const closeDialog = () => {
    if (submitting) return;
    if (dialog?.kind === 'edit' && dirty) {
      setPreview('unsaved');
      setDialog({ kind: 'discard', systemKey: dialog.systemKey });
      return;
    }
    setDialog(null);
    setPreview('populated');
    clearRollbackParam();
  };

  const discard = () => {
    setDialog(null);
    setPreview('populated');
    setDraft('');
  };

  const clearRollbackParam = () => {
    if (rollbackParam) router.replace('/admin/prompts', { scroll: false });
  };

  const save = () => {
    if (!dialog || dialog.kind !== 'edit') return;
    const systemKey = dialog.systemKey;
    setSubmitting(true);
    setFailed(false);
    window.setTimeout(() => {
      setCategories((prev) => withNewVersion(prev, systemKey, draft));
      setSubmitting(false);
      setTab('text');
      setDialog({ kind: 'view', systemKey });
      setPreview('populated');
      setAnnounce('Saved as a new version. It takes effect on the next generation.');
    }, 900);
  };

  const openVersion = (systemKey: string, version: number) => {
    setPreview('old-version');
    setDialog({ kind: 'version', systemKey, version });
  };

  const openRollback = () => {
    if (!dialog || dialog.kind !== 'version') return;
    setPreview('rollback');
    setDialog({ kind: 'rollback', systemKey: dialog.systemKey, version: dialog.version });
  };

  const cancelRollback = () => {
    if (!dialog || dialog.kind !== 'rollback') return;
    setPreview('old-version');
    setDialog({ kind: 'version', systemKey: dialog.systemKey, version: dialog.version });
  };

  const confirmRollback = () => {
    if (!dialog || dialog.kind !== 'rollback') return;
    const { systemKey, version } = dialog;
    const prompt = findPrompt(categories, systemKey);
    const target = prompt?.versions.find((item) => item.version === version);
    if (!target) return;
    setSubmitting(true);
    setFailed(false);
    window.setTimeout(() => {
      setCategories((prev) => withNewVersion(prev, systemKey, target.text));
      setSubmitting(false);
      setDialog(null);
      setPreview('populated');
      setAnnounce('Rollback saved as a new version. It takes effect on the next generation.');
      clearRollbackParam();
    }, 900);
  };

  const applyPreview = (next: PromptsPreview) => {
    setSubmitting(false);
    setFailed(false);
    setListState('populated');
    setDialog(null);
    setTab('text');
    setDraft('');

    if (next === 'loading' || next === 'error') {
      setListState(next);
      setPreview(next);
      return;
    }

    setPreview(next);

    switch (next) {
      case 'populated':
        setSelectedId('ring');
        break;
      case 'none':
        setSelectedId(null);
        break;
      case 'incomplete':
        setSelectedId('grillz');
        break;
      case 'viewing':
        setSelectedId('ring');
        setTab('text');
        setDialog({ kind: 'view', systemKey: HERO_PROMPT_KEY });
        break;
      case 'editing':
        openEdit(HERO_PROMPT_KEY);
        break;
      case 'unsaved':
        openEdit(HERO_PROMPT_KEY);
        setDraft('Draw the front elevation of the ring from the supplied brief, centred and lit for ecommerce. Wording changed but not saved.');
        setPreview('unsaved');
        setDialog({ kind: 'discard', systemKey: HERO_PROMPT_KEY });
        break;
      case 'saving':
        openEdit(HERO_PROMPT_KEY);
        setSubmitting(true);
        break;
      case 'save-failed':
        openEdit(HERO_PROMPT_KEY);
        setFailed(true);
        break;
      case 'history':
        setSelectedId('ring');
        setTab('history');
        setDialog({ kind: 'view', systemKey: HERO_PROMPT_KEY });
        break;
      case 'old-version':
        setSelectedId('ring');
        setDialog({ kind: 'version', systemKey: HERO_PROMPT_KEY, version: 3 });
        break;
      case 'rollback':
        setSelectedId('ring');
        setDialog({ kind: 'rollback', systemKey: HERO_PROMPT_KEY, version: 3 });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
        <header className="max-w-[900px] flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
              Prompt management
            </h1>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">
              The instructions every render is generated from. An edit changes what every retailer
              gets from the next generation onward.
            </p>
            <p className="mt-2 text-[12px] text-[var(--muted-text)]">
              Every save creates a new version. A mistake here does not error — it simply produces
              worse work.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLogOpen(true)}
            className="mt-1 shrink-0 h-9 px-4 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] flex items-center gap-2"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-history-line text-[16px] text-[var(--text-sec)]" aria-hidden="true" />
            </span>
            Generation log
          </button>
        </header>

        <div aria-live="polite" className="sr-only">
          {announce}
        </div>

        <div className="mt-7 max-w-[1320px]">
          {listState === 'loading' ? (
            <PromptsSkeleton />
          ) : listState === 'error' ? (
            <PromptsErrorState onRetry={() => applyPreview('populated')} />
          ) : (
            <>
              <CompletenessBanner categories={categories} />

              <div className="mt-6 grid grid-cols-[300px_minmax(0,1fr)] gap-6 items-start">
                <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden sticky top-6">
                  <div className="flex items-center px-4 h-11 border-b border-[var(--border)]">
                    <span className="text-[12px] font-semibold text-[var(--text)]">Categories</span>
                    <span className="ml-auto text-[12px] tabular-nums text-[var(--muted-text)]">
                      {categories.length}
                    </span>
                  </div>
                  <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
                    <CategoryRail
                      categories={categories}
                      selectedId={selectedId}
                      onSelect={(id) => {
                        setSelectedId(id);
                        setDialog(null);
                        setPreview('populated');
                      }}
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  {selected ? (
                    <>
                      <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                        <h2 className="text-[17px] font-semibold text-[var(--text)]">
                          {selected.name}
                        </h2>
                        <p className="mt-1 text-[12px] tabular-nums text-[var(--text-sec)]">
                          {categoryPromptCount(selected)} prompts across two sets ·{' '}
                          {categoryEditedCount(selected)} edited from default
                        </p>
                      </div>

                      {selected.sets.map((set) => (
                        <PromptSetSection key={set.phase} set={set} onOpen={openPrompt} />
                      ))}
                    </>
                  ) : (
                    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center">
                      <span className="inline-flex w-10 h-10 rounded-full bg-[var(--muted)] items-center justify-center text-[var(--text-sec)]">
                        <i className="ri-chat-3-line text-[20px]" aria-hidden="true" />
                      </span>
                      <h2 className="mt-4 text-[15px] font-semibold text-[var(--text)]">
                        No category selected
                      </h2>
                      <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-sec)]">
                        Choose a jewellery category to see the prompts behind it.
                      </p>
                    </div>
                  )}

                  <div className="mt-10">
                    <PromptsNote />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {dialog?.kind === 'discard' && dialogPrompt && (
        <DiscardDialog onCancel={() => backToEdit(dialogPrompt.systemKey)} onDiscard={discard} />
      )}

      {dialogPrompt && dialogCategory && (dialog?.kind === 'view' || dialog?.kind === 'edit') && (
        <PromptDialog
          prompt={dialogPrompt}
          categoryName={dialogCategory.name}
          mode={dialog.kind === 'edit' ? 'edit' : 'view'}
          tab={tab}
          draft={draft}
          submitting={submitting}
          failed={failed}
          onTab={setTab}
          onDraftChange={setDraft}
          onEdit={() => openEdit(dialogPrompt.systemKey)}
          onClose={closeDialog}
          onSave={save}
          onOpenVersion={(version) => openVersion(dialogPrompt.systemKey, version)}
        />
      )}

      {dialogPrompt && dialogCategory && dialog?.kind === 'version' && activeVersion && (
        <VersionDialog
          prompt={dialogPrompt}
          version={activeVersion}
          categoryName={dialogCategory.name}
          onClose={closeDialog}
          onRollback={openRollback}
        />
      )}

      {dialogPrompt && dialog?.kind === 'rollback' && activeVersion && (
        <RollbackDialog
          prompt={dialogPrompt}
          version={activeVersion}
          submitting={submitting}
          failed={failed}
          onCancel={cancelRollback}
          onConfirm={confirmRollback}
        />
      )}

      <PromptsStateControl state={preview} onChange={applyPreview} />

      {logOpen && (
        <GenerationLogPanel onClose={() => setLogOpen(false)}>
          <GenerationLogInline />
        </GenerationLogPanel>
      )}
    </>
  );
}