'use client';

import PreviewControl from '../consumer-catalog/PreviewControl';
import { APPROVAL_SCENARIOS, type ApprovalScenario } from './data';

export default function ApprovalPreviewControl({
  value,
  onChange,
}: {
  value: ApprovalScenario;
  onChange: (value: ApprovalScenario) => void;
}) {
  return (
    <PreviewControl
      label="Approval state"
      scenarios={APPROVAL_SCENARIOS}
      value={value}
      onChange={(v) => onChange(v as ApprovalScenario)}
    />
  );
}