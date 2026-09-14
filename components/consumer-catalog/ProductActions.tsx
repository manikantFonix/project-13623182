'use client';

import { useRouter } from 'next/navigation';
import { useSelection } from './SelectionProvider';

const RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

export default function ProductActions({
  token,
  productId,
}: {
  token: string;
  productId: string;
}) {
  const { selected, toggle } = useSelection();
  const router = useRouter();

  const inSelection = selected.includes(productId);
  const othersSelected = selected.some((id) => id !== productId);
  const reason =
    "You're building a list — use Request these below to send them together.";

  function onRequest() {
    if (othersSelected) return;
    if (!inSelection) toggle(productId);
    router.push(`/c/${token}/request`);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onRequest}
          disabled={othersSelected}
          aria-disabled={othersSelected}
          aria-label={
            othersSelected ? `Request order — disabled. ${reason}` : 'Request order'
          }
          style={othersSelected ? undefined : { backgroundColor: 'var(--brand)' }}
          className={`h-11 sm:h-9 px-6 text-[13px] font-medium rounded-full whitespace-nowrap inline-flex items-center justify-center transition-colors duration-150 ${RING} ${
            othersSelected
              ? 'bg-[#F3F6FC] text-[#5D6C8A] cursor-not-allowed'
              : 'text-white hover:opacity-90 cursor-pointer'
          }`}
        >
          Request order
        </button>

        <button
          type="button"
          onClick={() => toggle(productId)}
          aria-pressed={inSelection}
          className={`h-11 sm:h-9 px-6 text-[13px] font-medium rounded-full bg-white border border-[#DCE3F0] text-[#16233E] hover:border-[#C6D0E6] whitespace-nowrap inline-flex items-center justify-center transition-colors duration-150 cursor-pointer ${RING}`}
        >
          {inSelection ? 'Remove from selection' : 'Add to selection'}
        </button>
      </div>
    </div>
  );
}