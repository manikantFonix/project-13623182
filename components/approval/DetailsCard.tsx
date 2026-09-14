import Card from './Card';
import { SpecGroup, SpecRow } from './SpecList';
import type { ApprovalView } from './data';

export default function DetailsCard({ view }: { view: ApprovalView }) {
  return (
    <Card>
      <h2 className="text-[15px] font-medium text-[#16233E]">Details</h2>

      <div className="mt-4">
        <SpecGroup>
          <dl>
            <SpecRow label="Piece" value={view.piece} />
          </dl>
        </SpecGroup>
      </div>

      <div className="mt-4">
        <p className="text-[12px] font-medium text-[#5D6C8A]">Description</p>
        <div className="mt-2 rounded-[10px] bg-[#F3F6FC] p-3">
          <p className="text-[13px] leading-[20px] text-[#16233E] whitespace-pre-line">
            {view.description}
          </p>
        </div>
      </div>
    </Card>
  );
}