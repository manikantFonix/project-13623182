'use client';

import { useEffect, useState } from 'react';
import {
  customers,
  manufacturers,
  type KindConfig,
  type RecordItem,
} from './data';
import RecordListPanel, { type ListMode } from './RecordListPanel';
import RecordDetailPane from './RecordDetailPane';
import RecordDialog from './RecordDialog';
import RecordDeleteDialog from './RecordDeleteDialog';
import DeactivateDialog from './DeactivateDialog';
import CustomerDetailPane from './CustomerDetailPane';
import CustomerDialog from './CustomerDialog';
import CustomerRemoveDialog from './CustomerRemoveDialog';
import ManufacturerDetailPane from './ManufacturerDetailPane';
import ManufacturerDialog from './ManufacturerDialog';
import ManufacturerRemoveDialog from './ManufacturerRemoveDialog';

interface Props {
  config: KindConfig;
}

type Dialogs =
  | { type: 'add' }
  | { type: 'edit'; record: RecordItem }
  | { type: 'delete'; record: RecordItem }
  | { type: 'inactive'; record: RecordItem }
  | null;

export default function RecordsWorkspace({ config }: Props) {
  const source = config.kind === 'customer' ? customers : manufacturers;
  const [records, setRecords] = useState<RecordItem[]>(source);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [listMode, setListMode] = useState<ListMode>('data');
  const [dialog, setDialog] = useState<Dialogs>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`${config.kind}:collapsed`);
    if (stored === '1') setCollapsed(true);
  }, [config.kind]);

  useEffect(() => {
    sessionStorage.setItem(`${config.kind}:collapsed`, collapsed ? '1' : '0');
  }, [collapsed, config.kind]);

  const activeRecord = records.find((r) => r.id === selectedId) ?? null;

  const select = (id: string) => {
    setSelectedId(id);
    setMobileView('detail');
  };

  const listClasses = collapsed
    ? 'hidden'
    : `w-[320px] shrink-0 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`;
  const detailClasses = `flex-1 min-w-0 ${
    mobileView === 'detail' ? 'block' : 'hidden lg:block'
  }`;

  const addRecord = () => {
    setDialog({ type: 'add' });
  };

  const saveRecord = (data: Partial<RecordItem>) => {
    if (dialog?.type === 'edit') {
      setRecords((prev) =>
        prev.map((r) => (r.id === dialog.record.id ? { ...r, ...data } : r))
      );
    } else {
      const id = `${config.kind === 'customer' ? 'c' : 'm'}${Date.now()}`;
      const name = data.name ?? '';
      setRecords((prev) => [
        {
          id,
          name,
          email: data.email ?? '',
          phone: data.phone,
          address: data.address,
          contactName: data.contactName,
          notes: data.notes,
          active: data.active,
          tag: data.tag,
          emails: data.emails,
          requestIds: [],
          clientSince: data.clientSince,
          lastInteraction: data.lastInteraction,
          totalSpent: data.totalSpent,
          activeProjects: data.activeProjects,
          linkedProjects: data.linkedProjects,
          activity: data.activity,
          specialty: data.specialty,
          avgResponse: data.avgResponse,
          lastActivity: data.lastActivity,
          totalValue: data.totalValue,
          completed: data.completed,
          pending: data.pending,
          totalRequests: data.totalRequests,
          mfrStatus: data.mfrStatus,
          sentRequests: data.sentRequests,
          timeline: data.timeline,
          latestNote: data.latestNote,
          location: data.location,
        },
        ...prev,
      ]);
      setSelectedId(id);
      setMobileView('detail');
    }
    setDialog(null);
  };

  const applyToggle = (inactive: boolean) => {
    if (!activeRecord) return;
    setRecords((prev) =>
      prev.map((r) => (r.id === activeRecord.id ? { ...r, active: !inactive } : r))
    );
    setDialog(null);
  };

  const deletePermanent = () => {
    if (!activeRecord) return;
    setRecords((prev) => prev.filter((r) => r.id !== activeRecord.id));
    setSelectedId(null);
    setDialog(null);
  };

  const hasSharedForEdit = () => {
    if (dialog?.type !== 'edit') return false;
    return dialog.record.requestIds.length > 0;
  };

  const isCustomer = config.kind === 'customer';
  const isManufacturer = config.kind === 'manufacturer';

  return (
    <main className="min-h-screen bg-[var(--canvas)]">
      <div className="flex gap-6 pt-8 pb-8 px-8 h-screen">
        <aside className={`${listClasses} h-full`}>
          <div className="h-full">
            <RecordListPanel
              config={config}
              records={records}
              selectedId={selectedId}
              onSelect={select}
              onCollapse={() => {
                setCollapsed(true);
                setMobileView('detail');
              }}
              onAdd={addRecord}
              mode={listMode}
              onResetError={() => setListMode('data')}
            />
          </div>
        </aside>

        <section className={`${detailClasses} h-full`}>
          {activeRecord ? (
            isCustomer ? (
              <CustomerDetailPane
                key={activeRecord.id}
                record={activeRecord}
                showExpand={collapsed}
                onExpand={() => {
                  setCollapsed(false);
                  setMobileView('list');
                }}
                onBack={() => setMobileView('list')}
                onEdit={() => setDialog({ type: 'edit', record: activeRecord })}
                onRemove={() => setDialog({ type: 'delete', record: activeRecord })}
              />
            ) : isManufacturer ? (
              <ManufacturerDetailPane
                key={activeRecord.id}
                record={activeRecord}
                showExpand={collapsed}
                onExpand={() => {
                  setCollapsed(false);
                  setMobileView('list');
                }}
                onBack={() => setMobileView('list')}
                onEdit={() => setDialog({ type: 'edit', record: activeRecord })}
                onRemove={() => setDialog({ type: 'delete', record: activeRecord })}
              />
            ) : (
              <RecordDetailPane
                key={activeRecord.id}
                config={config}
                record={activeRecord}
                showExpand={collapsed}
                onExpand={() => {
                  setCollapsed(false);
                  setMobileView('list');
                }}
                onBack={() => setMobileView('list')}
                onEdit={() => setDialog({ type: 'edit', record: activeRecord })}
                onToggleActive={() => {
                  if (activeRecord.active === false) {
                    applyToggle(false);
                  } else {
                    setDialog({ type: 'inactive', record: activeRecord });
                  }
                }}
                onDelete={() => setDialog({ type: 'delete', record: activeRecord })}
              />
            )
          ) : (
            <div className="h-full flex flex-col">
              {collapsed && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCollapsed(false);
                      setMobileView('list');
                    }}
                    aria-label="Expand list"
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--canvas)] border border-[var(--border)] text-[var(--accent-text)] hover:bg-[var(--muted)] hover:border-[var(--border-strong)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
                  >
                    <i className="ri-arrow-right-s-line text-[18px] w-5 h-5 flex items-center justify-center" />
                  </button>
                </div>
              )}
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[13px] text-[var(--text-sec)]">
                  Choose a record to see it here.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      {isCustomer ? (
        <CustomerDialog
          open={dialog?.type === 'add' || dialog?.type === 'edit'}
          record={dialog?.type === 'edit' ? dialog.record : null}
          onClose={() => setDialog(null)}
          onSave={saveRecord}
        />
      ) : isManufacturer ? (
        <ManufacturerDialog
          open={dialog?.type === 'add' || dialog?.type === 'edit'}
          record={dialog?.type === 'edit' ? dialog.record : null}
          onClose={() => setDialog(null)}
          onSave={saveRecord}
        />
      ) : (
        <RecordDialog
          open={dialog?.type === 'add' || dialog?.type === 'edit'}
          config={config}
          record={dialog?.type === 'edit' ? dialog.record : null}
          hasSharedRequest={hasSharedForEdit()}
          onClose={() => setDialog(null)}
          onSave={saveRecord}
        />
      )}

      {isCustomer ? (
        <CustomerRemoveDialog
          open={dialog?.type === 'delete'}
          record={dialog?.type === 'delete' ? dialog.record : (activeRecord as RecordItem)}
          onClose={() => setDialog(null)}
          onConfirm={deletePermanent}
        />
      ) : isManufacturer ? (
        <ManufacturerRemoveDialog
          open={dialog?.type === 'delete'}
          record={dialog?.type === 'delete' ? dialog.record : (activeRecord as RecordItem)}
          onClose={() => setDialog(null)}
          onConfirm={deletePermanent}
        />
      ) : (
        <RecordDeleteDialog
          open={dialog?.type === 'delete'}
          config={config}
          record={dialog?.type === 'delete' ? dialog.record : (activeRecord as RecordItem)}
          onClose={() => setDialog(null)}
          onConfirmPermanent={deletePermanent}
          onMakeInactive={() => {
            if (dialog?.type === 'delete' && dialog.record) {
              setRecords((prev) =>
                prev.map((r) => (r.id === dialog.record.id ? { ...r, active: false } : r))
              );
            }
            setDialog(null);
          }}
        />
      )}

      <DeactivateDialog
        open={dialog?.type === 'inactive'}
        record={dialog?.type === 'inactive' ? dialog.record : (activeRecord as RecordItem)}
        onClose={() => setDialog(null)}
        onConfirm={() => {
          if (dialog?.type === 'inactive' && dialog.record) {
            setRecords((prev) =>
              prev.map((r) => (r.id === dialog.record.id ? { ...r, active: false } : r))
            );
          }
          setDialog(null);
        }}
      />
    </main>
  );
}