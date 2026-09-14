'use client';

export default function CatalogHero({
  name,
  count,
  cover,
  onError,
}: {
  name: string;
  count: number;
  cover: string;
  onError: () => void;
}) {
  return (
    <section className="relative w-full h-[320px] md:h-[400px] overflow-hidden bg-[#F3F6FC]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover}
        alt={`Cover image for ${name}`}
        onError={onError}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#16233E]/55 via-[#16233E]/40 to-[#16233E]/65"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <h1 className="text-[26px] md:text-[34px] font-semibold leading-[1.06] tracking-[-0.02em] text-[#FFFFFF]">
          {name}
        </h1>
        <p className="mt-1 text-[13px] tabular-nums text-[#FFFFFF]/80">
          {count} piece{count === 1 ? '' : 's'}
        </p>
      </div>
    </section>
  );
}