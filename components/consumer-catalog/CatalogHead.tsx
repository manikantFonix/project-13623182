export default function CatalogHead({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-5 md:px-6 pt-6 md:pt-8">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#16233E]">
        {name}
      </h1>
      <p className="mt-1 text-[13px] tabular-nums text-[#5D6C8A]">
        {count} piece{count === 1 ? '' : 's'}
      </p>
    </div>
  );
}