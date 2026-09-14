'use client';

import { useState } from 'react';
import SettingsShell from '../settings/SettingsShell';
import SettingsLayout from '../settings/SettingsLayout';
import SecuritySettings from './SecuritySettings';
import PreviewControl from '../settings/PreviewControl';
import type { SecurityPreview } from './data';

const options: { value: SecurityPreview; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'onlyCurrent', label: 'Only this device' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Load failed' },
  { value: 'partial', label: 'Partly filled' },
  { value: 'mismatch', label: 'Passwords differ' },
  { value: 'short', label: 'Password too short' },
  { value: 'wrongCurrent', label: 'Wrong current' },
  { value: 'updating', label: 'Updating' },
  { value: 'updated', label: 'Updated' },
  { value: 'updateFailed', label: 'Update failed' },
  { value: 'signOutConfirm', label: 'Sign out confirm' },
  { value: 'signOutAllConfirm', label: 'Sign out all' },
  { value: 'signingOut', label: 'Signing out' },
];

export default function SecurityRoute() {
  const [preview, setPreview] = useState<SecurityPreview>('default');

  return (
    <SettingsShell>
      <SettingsLayout>
        <h2 className="text-[20px] font-semibold text-[var(--text)]">Security</h2>
        <p className="mt-1 text-[13px] text-[var(--text-sec)]">
          Your password and the devices signed in to this account.
        </p>
        <div className="mt-5">
          <SecuritySettings key={preview} preview={preview} />
        </div>
      </SettingsLayout>
      <PreviewControl options={options} value={preview} onChange={setPreview} />
    </SettingsShell>
  );
}