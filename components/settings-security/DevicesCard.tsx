'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import CardError from './CardError';
import { focusRingVar } from '../settings/theme/tokens';
import type { SecurityPreview, Session } from './data';

export default function DevicesCard({
  sessions,
  loading,
  preview,
  error,
  onSignOut,
  announce,
}: {
  sessions: Session[];
  loading: boolean;
  preview: SecurityPreview;
  error: boolean;
  onSignOut: (id: string) => void;
  announce: (t: string) => void;
}) {
  const [confirmId, setConfirmId] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (preview === 'signOutConfirm' || preview === 'signingOut') {
      const other = sessions.find((s) => !s.current);
      if (other) setConfirmId(other);
      setBusy(preview === 'signingOut');
    }
  }, [preview, sessions]);

  const sorted = [...sessions].sort((a, b) => (a.current ? -1 : b.current ? 1 : b.sortAt - a.sortAt));
  const onlyCurrent = sessions.length === 1 && sessions[0].current;

  const confirmSignOut = () => {
    if (!confirmId) return;
    if (busy) return;
    onSignOut(confirmId.id);
    setConfirmId(null);
    setBusy(false);
    announce('Device signed out.');
  };

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)]">
          <i className="ri-computer-line text-[20px] w-5 h-5 flex items-center justify-center" />
        </div>
        <div>
          <h3 className="text-[15px] font-medium text-[var(--text)]">Signed-in devices</h3>
          <p className="text-[13px] text-[var(--text-sec)]">Every session that can currently use this account.</p>
        </div>
      </div>

      {error ? (
        <CardError />
      ) : loading ? (
        <div className="mt-4 space-y-0">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 h-16 px-3 border-b border-[var(--border)] last:border-b-0">
              <div className="w-9 h-9 rounded-[12px] bg-[var(--muted)] animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 rounded bg-[var(--muted)] animate-pulse w-32" />
                <div className="h-3 rounded bg-[var(--muted)] animate-pulse w-56" />
              </div>
            </div>
          ))}
        </div>
      ) : onlyCurrent ? (
        <p className="mt-4 text-[13px] text-[var(--text-sec)]">You're only signed in on this device.</p>
      ) : (
        <div className="mt-3 -mx-3">
          {sorted.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 h-16 px-3 ${i > 0 ? 'border-t border-[var(--border)]' : ''}`}
            >
              <div className="w-9 h-9 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--text-sec)] shrink-0">
                <i className="ri-computer-line text-[16px] w-4 h-4 flex items-center justify-center" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[var(--text)] tabular-nums">{s.ref}</p>
                <p className="mt-0.5 text-[12px] text-[var(--text-sec)] tabular-nums">
                  {s.signedIn} · {s.expires}
                </p>
              </div>
              {s.current ? (
                <span className="text-[12px] font-medium text-[var(--success)] whitespace-nowrap">This device</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmId(s)}
                  className={`h-9 px-3 rounded-full text-[13px] font-medium text-[var(--alert)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
                >
                  Sign out
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmId}
        title="Sign out this device?"
        body="Whoever is using it will have to sign in again."
        cancelLabel="Cancel"
        confirmLabel="Sign out"
        busyLabel="Signing out…"
        busy={busy}
        width={440}
        onCancel={() => {
          setConfirmId(null);
          setBusy(false);
        }}
        onConfirm={confirmSignOut}
      />
    </section>
  );
}