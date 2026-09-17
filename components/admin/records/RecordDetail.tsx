import RecordHeader from './RecordHeader';
import RecordFacts from './RecordFacts';
import RecordRequests from './RecordRequests';
import RecordDetailSkeleton from './RecordDetailSkeleton';
import RecordDetailErrorState from './RecordDetailErrorState';
import RecordsNote from './RecordsNote';
import { RECORD_CONFIG, type RecordKind, type RecordEntry } from './data';

export default function RecordDetail({
  kind,
  record,
  state,
  onBack,
  onRetry,
  onToggle,
}: {
  kind: RecordKind;
  record: RecordEntry | undefined;
  state: 'ready' | 'loading' | 'error';
  onBack: () => void;
  onRetry: () => void;
  onToggle: (id: string) => void;
}) {
  const config = RECORD_CONFIG[kind];

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
      {state === 'loading' ? (
        <RecordDetailSkeleton />
      ) : state === 'error' || !record ? (
        <div className="max-w-[1280px]">
          <RecordDetailErrorState
            title={config.detailErrorTitle}
            body={config.detailErrorBody}
            onRetry={onRetry}
          />
        </div>
      ) : (
        <>
          <RecordHeader
            record={record}
            config={config}
            onBack={onBack}
            onToggle={() => onToggle(record.id)}
          />

          <div className="mt-8 max-w-[1280px] flex flex-col gap-4">
            <RecordFacts record={record} />
            <RecordRequests record={record} config={config} />
            <div className="mt-2">
              <RecordsNote text={config.detailNote} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}