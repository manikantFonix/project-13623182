'use client';

interface Props {
  open: boolean;
  option: 1 | 2;
  notEnough: boolean;
  onOption: (o: 1 | 2) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function RegenerateDialog({
  open,
  option,
  notEnough,
  onOption,
  onCancel,
  onSave,
}: Props) {
  if (!open) return null;

  const radio = (sel: boolean, disabled: boolean) => (
    <span
      className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
        disabled ? 'border-[#C7CBCC]' : 'border-[#16323F]'
      }`}
    >
      {sel && (
        <span className="w-2 h-2 rounded-full bg-[#16323F]" />
      )}
    </span>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(19,26,31,0.4)]"
        onClick={onCancel}
      />
      <div className="relative w-[520px] bg-white border border-[#DDE3E6] rounded-[28px] p-7">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#131A1F]">
          Generate rose gold for existing products?
        </h2>
        <p className="mt-2 text-sm text-[#131A1F] leading-relaxed">
          You've added rose gold. There are 128 products already in this
          catalogue. Generating rose gold for them will use 512 renders.
        </p>

        <div className="mt-5 space-y-3">
          <button
            onClick={() => onOption(1)}
            className={`w-full flex items-start gap-3 border rounded-[12px] p-4 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
              option === 1 ? 'border-[#16323F]' : 'border-[#DDE3E6] hover:border-[#C3CCD1]'
            }`}
          >
            {radio(option === 1, false)}
            <span>
              <span className="block text-sm font-medium text-[#131A1F]">
                Only new products
              </span>
              <span className="block mt-1 text-[13px] text-[#5C6870]">
                Products already here keep the colours they have.
              </span>
            </span>
          </button>

          <button
            onClick={() => onOption(2)}
            disabled={notEnough}
            className={`w-full flex items-start gap-3 border rounded-[12px] p-4 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3] ${
              option === 2 ? 'border-[#16323F]' : 'border-[#DDE3E6] hover:border-[#C3CCD1]'
            } ${notEnough ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {radio(option === 2, notEnough)}
            <span>
              <span className="block text-sm font-medium text-[#131A1F]">
                Generate for existing products too
              </span>
              <span className="block mt-1 text-[13px] text-[#5C6870]">
                Uses 512 renders. Takes a while to finish.
              </span>
            </span>
          </button>
        </div>

        {notEnough && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              You need 512 renders to generate this colour for existing
              products, and you have 130. The colour hasn't been added.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div>
            {option === 2 && !notEnough && (
              <span className="text-sm font-medium text-[#131A1F] tabular-nums">
                512 renders
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="px-2 h-9 text-sm font-medium text-[#5C6870] hover:text-[#131A1F] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="h-9 px-4 text-sm font-medium text-white bg-[#16323F] border border-[#16323F] rounded-full hover:bg-[#1F4353] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
            >
              Save colours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}