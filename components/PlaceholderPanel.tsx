'use client';

interface Props {
  title: string;
  onClose: () => void;
}

export default function PlaceholderPanel({ title, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#131A1F]/40"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#DDE3E6] rounded-[28px] p-6 w-[480px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-[#131A1F]">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#5C6870] hover:text-[#131A1F] hover:bg-[#F4F6F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
          >
            <i className="ri-close-line text-[20px]" />
          </button>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center min-h-[160px] rounded-[20px] bg-[#EFF2F3]">
          <p className="text-sm text-[#5C6870]">Coming soon</p>
        </div>
      </div>
    </div>
  );
}