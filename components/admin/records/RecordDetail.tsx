'use client';

import RecordHeader from './RecordHeader';
import RecordFacts from './RecordFacts';
import RecordNoteBlock from './RecordNoteBlock';
import RecordRequests from './RecordRequests';
import RecordDetailSkeleton from './RecordDetailSkeleton';
import RecordDetailErrorState from './RecordDetailErrorState';
import RecordsNote from './RecordsNote';
import { findRecord, RECORD_CONFIG, type RecordKind, type RecordEntry } from './data';

export default function RecordDetail({
  kind,
  recordId,
  state,
  onBack,
  onRetry,
}: {
  kind: RecordKind;
  recordId: string;
  state: 'ready' | 'loading' | 'error';
  onBack: () => void;
  onRetry: () => void;
}) {
  const config = RECORD_CONFIG[kind];
  const record: RecordEntry | undefined = findRecord(kind, recordId);

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
          <RecordHeader record={record} config={config} onBack={onBack} />

          <div className="mt-8 max-w-[1280px] flex flex-col gap-4">
            <RecordFacts record={record} />
            {record.note && <RecordNoteBlock note={record.note} />}
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