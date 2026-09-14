'use client';

import type { Metal } from '../data';
import type { RequestPiece } from './types';
import QuantityStepper from './QuantityStepper';
import PieceMetalPicker from './PieceMetalPicker';

const removeCls =
  'text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] whitespace-nowrap shrink-0 cursor-pointer rounded-[6px] px-1 py-1 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

export default function RequestPieceRow({
  piece,
  onQuantity,
  onMetal,
  onRemove,
}: {
  piece: RequestPiece;
  onQuantity: (n: number) => void;
  onMetal: (m: Metal) => void;
  onRemove: () => void;
}) {
  const priceText =
    piece.price !== null && piece.price > 0
      ? `$${piece.price.toLocaleString('en-US')}`
      : null;

  return (
    <div className="py-4">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-[8px] bg-white overflow-hidden shrink-0 border border-[#DCE3F0]">
          {piece.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={piece.image}
              alt={`${piece.category} view`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-[#16233E]">{piece.category}</p>
          {priceText ? (
            <p className="mt-0.5 text-[13px] text-[#5D6C8A] tabular-nums">{priceText}</p>
          ) : (
            <p className="mt-0.5 text-[13px] text-[#5D6C8A]">Price on request</p>
          )}
        </div>
        <button type="button" onClick={onRemove} className={removeCls}>
          Remove
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[12px] font-medium text-[#5D6C8A] mb-2">Quantity</p>
          <QuantityStepper
            value={piece.quantity}
            onChange={onQuantity}
            label={piece.category}
          />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[#5D6C8A] mb-2">Metal color</p>
          <PieceMetalPicker
            metals={piece.metals}
            value={piece.metal}
            onChange={onMetal}
            label={piece.category}
          />
        </div>
      </div>
    </div>
  );
}