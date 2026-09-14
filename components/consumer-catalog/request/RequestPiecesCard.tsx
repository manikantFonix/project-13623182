'use client';

import type { Metal } from '../data';
import type { RequestPiece } from './types';
import RequestPieceRow from './RequestPieceRow';

export default function RequestPiecesCard({
  pieces,
  onQuantity,
  onMetal,
  onRemove,
}: {
  pieces: RequestPiece[];
  onQuantity: (id: string, n: number) => void;
  onMetal: (id: string, m: Metal) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <div className="flex items-baseline gap-2">
        <h2 className="text-[15px] font-medium text-[#16233E]">Your pieces</h2>
        <span className="text-[13px] text-[#5D6C8A] tabular-nums">
          {pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'}
        </span>
      </div>
      <div className="mt-2 divide-y divide-[#DCE3F0]">
        {pieces.map((p) => (
          <RequestPieceRow
            key={p.id}
            piece={p}
            onQuantity={(n) => onQuantity(p.id, n)}
            onMetal={(m) => onMetal(p.id, m)}
            onRemove={() => onRemove(p.id)}
          />
        ))}
      </div>
    </section>
  );
}