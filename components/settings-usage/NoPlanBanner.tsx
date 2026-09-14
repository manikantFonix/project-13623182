export default function NoPlanBanner() {
  return (
    <div className="mt-4 border-l-2 border-[var(--alert)] bg-[var(--surface)] rounded-[12px] p-3">
      <p className="text-[13px] font-medium text-[var(--alert)]">
        You can't generate anything yet.
      </p>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        Choose a plan to get your renders. Your catalogs, customers and settings are all here waiting.
      </p>
    </div>
  );
}