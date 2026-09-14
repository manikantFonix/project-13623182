'use client';

import { useState } from 'react';
import ChangePasswordCard from './ChangePasswordCard';
import DevicesCard from './DevicesCard';
import SignOutAllCard from './SignOutAllCard';
import { defaultSessions, onlyCurrentSessions, type SecurityPreview, type Session } from './data';

export default function SecuritySettings({ preview }: { preview: SecurityPreview }) {
  const [sessions, setSessions] = useState<Session[]>(() =>
    preview === 'onlyCurrent' ? onlyCurrentSessions : defaultSessions
  );
  const [announce, setAnnounce] = useState('');
  const loading = preview === 'loading';
  const error = preview === 'error';

  const purgeOthers = () => setSessions((s) => s.filter((x) => x.current));
  const signOutSession = (id: string) => setSessions((s) => s.filter((x) => x.id !== id));
  const othersCount = sessions.filter((s) => !s.current).length;

  return (
    <div className="max-w-[720px] space-y-4">
      <ChangePasswordCard
        preview={preview}
        error={error}
        onPasswordUpdated={purgeOthers}
        announce={setAnnounce}
      />
      <DevicesCard
        sessions={sessions}
        preview={preview}
        error={error}
        loading={loading}
        onSignOut={signOutSession}
        announce={setAnnounce}
      />
      <SignOutAllCard
        othersCount={othersCount}
        preview={preview}
        error={error}
        onSignOutAll={purgeOthers}
        announce={setAnnounce}
      />
      <span aria-live="polite" className="sr-only">
        {announce}
      </span>
    </div>
  );
}