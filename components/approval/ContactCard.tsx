import Card from './Card';
import ContactBlock from './ContactBlock';
import type { ApprovalBrand } from './data';

export default function ContactCard({ brand }: { brand: ApprovalBrand }) {
  return (
    <Card>
      <h2 className="text-[15px] font-medium text-[#16233E]">Questions?</h2>
      <div className="mt-3 flex gap-3 rounded-[10px] bg-[#F3F6FC] p-3">
        <span className="w-8 h-8 rounded-[10px] bg-white flex items-center justify-center text-[#5D6C8A] shrink-0">
          <i className="ri-mail-line text-[16px] w-4 h-4 flex items-center justify-center" />
        </span>
        <ContactBlock brand={brand} />
      </div>
    </Card>
  );
}