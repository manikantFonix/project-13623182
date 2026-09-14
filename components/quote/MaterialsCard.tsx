import QuoteCard from './QuoteCard';
import { SpecGroup, SpecRow } from './SpecList';
import type { QuoteView } from './data';
import { getDetailSheetSpecs } from '../requests/detailSheet';

export default function MaterialsCard({ view }: { view: QuoteView }) {
  const sheet = getDetailSheetSpecs();
  const weight = sheet.metalWeight.trim();
  const tones = sheet.threeToneSpecification.trim();
  const isThreeTone = sheet.toneSpecification === 'Three Tone';

  return (
    <QuoteCard>
      <h2 className="text-[15px] font-medium text-[#16233E]">Materials</h2>

      <div className="mt-4 flex flex-col gap-4">
        <SpecGroup title="Metal">
          <dl>
            <SpecRow label="Type" value={view.metal.type} />
            <SpecRow label="Karat" value={view.metal.karat} />
            <SpecRow label="Color" value={view.metal.color} />
            <SpecRow label="Weight" value={weight ? `${weight} g` : undefined} />
            <SpecRow label="Tones" value={isThreeTone && tones ? tones : undefined} />
          </dl>
        </SpecGroup>

        <SpecGroup title="Stone">
          <dl>
            <SpecRow label="Type" value={view.stone.type} />
            <SpecRow label="Count" value={view.stone.count} />
            <SpecRow label="Size" value={view.stone.size} />
            <SpecRow label="Setting" value={view.stone.setting} />
          </dl>
        </SpecGroup>
      </div>
    </QuoteCard>
  );
}