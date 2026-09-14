'use client';

import { useRouter } from 'next/navigation';
import WidgetTiles from './WidgetTiles';
import WidgetInput from './WidgetInput';
import { WIDGET_CONTACT } from './data';
import { useWidgetState } from './store';

export default function WidgetScreenOne({ token }: { token: string }) {
  const router = useRouter();
  const [state, update] = useWidgetState();

  const category = state.category;
  const description = state.description;
  const typed = description.trim() !== '';
  const canGenerate = category !== null && typed;
  const allowanceExhausted = state.allowanceExhausted;

  const disabledReason = !category
    ? "Pick what you'd like made."
    : !typed
      ? 'Describe the piece to continue.'
      : null;

  const handleGenerate = () => {
    if (!canGenerate || allowanceExhausted) return;
    update({
      screenTwo: 'generating',
      stageIndex: 0,
      live: true,
      failedAt: null,
    });
    router.push(`/widget/${token}/design`);
  };

  return (
    <div>
      <h1
        className="text-[18px] font-semibold text-center"
        style={{ color: 'var(--w-text)' }}
      >
        What would you like made?
      </h1>

      <div className="mt-6">
        <WidgetTiles
          selected={category}
          more={state.moreOpen}
          readOnly={allowanceExhausted}
          onSelect={(id) =>
            update({ category: category === id ? null : id })
          }
          onToggleMore={() => update({ moreOpen: !state.moreOpen })}
        />
      </div>

      <div className="mt-8">
        <WidgetInput
          value={description}
          onChange={(v) => update({ description: v })}
          readOnly={allowanceExhausted}
          allowanceExhausted={allowanceExhausted}
          contact={WIDGET_CONTACT}
          canGenerate={canGenerate}
          disabledReason={disabledReason}
          onGenerate={handleGenerate}
        />
      </div>
    </div>
  );
}