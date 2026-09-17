import { use } from 'react';
import { SelectionProvider } from '../../../components/consumer-catalog/SelectionProvider';

export default function ConsumerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  return (
    <SelectionProvider token={token}>{children}</SelectionProvider>
  );
}