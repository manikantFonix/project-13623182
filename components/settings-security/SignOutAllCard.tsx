'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import CardError from './CardError';
import { focusRingVar } from '../settings/theme/tokens';
import type { SecurityPreview } from './data';

export default function SignOutAllCard({
  othersCount,
  preview,
  error,
  onSignOutAll,
  announce,
}: {
  othersCount: number;
  preview: SecurityPreview;
  error: boolean;
  onSignOutAll: () => void;
  announce: (t: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const onlyCurrent = othersCount === 0;

  useEffect(() => {
    if (preview === 'signOutAllConfirm' || preview === 'signingOut') {
      if (othersCount > 0) setOpen(true);
      setBusy(preview === 'signingOut');
    }
  }, [preview, othersCount]);

  const confirm = () => {
    if (busy) return;
    onSignOutAll();
    setOpen(false);
    setBusy(false);
    announce('Signed out everywhere else.');
  };

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <div>
        <h3 className="text-[15px] font-medium text-[var(--text)]">Sign out everywhere else</h3>
        <p className="mt-1 text-[13px] text-[var(--text-sec)]">
          Ends every session except this one. Useful if someone has left, or you've signed in somewhere you shouldn't have.
        </p>
      </div>

      {error ? (
        <CardError />
      ) : (
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            disabled={onlyCurrent}
            onClick={() => setOpen(true)}
            className={`h-9 px-4 rounded-full bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)] hover:text-[var(--alert-strong)] hover:border-[var(--alert-strong)] text-[13px] font-medium inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none ${focusRingVar}`}
          >
            Sign out everywhere else
          </button>
          {onlyCurrent && (
            <span className="text-[13px] text-[var(--text-sec)]">You're only signed in on this device.</span>
          )}
        </div>
      )}

      <ConfirmDialog
        open={open}
        title={`Sign out of ${othersCount} other devices?`}
        body="You'll stay signed in here. Everyone else will have to sign in again."
        secBody="Your password isn't changed."
        cancelLabel="Cancel"
        confirmLabel="Sign out everywhere else"
        busyLabel="Signing out…"
        busy={busy}
        width={460}
        onCancel={() => {
          setOpen(false);
          setBusy(false);
        }}
        onConfirm={confirm}
      />
    </section>
  );
}