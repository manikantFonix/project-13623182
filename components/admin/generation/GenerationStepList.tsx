'use client';

import GenerationStepRow from './GenerationStepRow';
import { STEPS } from './data';

export default function GenerationStepList({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <ol className="flex flex-col gap-3">
      {STEPS.map((step, index) => (
        <GenerationStepRow key={step.id} step={step} position={index + 1} onOpen={onOpen} />
      ))}
    </ol>
  );
}