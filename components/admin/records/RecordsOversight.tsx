'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import RecordsAccessNotice from './RecordsAccessNotice';
import RecordsFilters from './RecordsFilters';
import RecordsTable from './RecordsTable';
import RecordsSkeleton from './RecordsSkeleton';
import RecordsErrorState from './RecordsErrorState';
import RecordsEmptyState from './RecordsEmptyState';
import RecordsNote from './RecordsNote';
import RecordsStateControl from './RecordsStateControl';
import AdminPagination from '../AdminPagination';
import RecordDetail from './RecordDetail';
import {
  DETAIL_VARIANT_IDS,
  RECORDS,
  RECORD_CONFIG,
  RECORDS_PAGE_SIZE,
  filterRecords,
  retailerOptions,
  type ActiveFilter,
  type DetailVariantId,
  type RecordConfig,
  type RecordKind,
  type RecordState,
  type RecordsPreview,
} from './data';

type Resolved =
  | { mode: 'list'; state: RecordState }
  | { mode: 'detail'; id: string; state: 'ready' | 'loading' | 'error' };

export default function RecordsOversight({ kind }: { kind: RecordKind }) {
  const config: RecordConfig = RECORD_CONFIG[kind];
  const router = useRouter();
  const search = useSearchParams();

  const [preview, setPreview] = useState<RecordsPreview>('route');
  const [query, setQuery] = useState('');
  const [retailer, setRetailer] = useState('all');
  const [active, setActive] = useState<ActiveFilter>('all');
  const [page, setPage] = useState(1);

  const records = RECORDS[kind];
  const routeId = search.get('record');

  useEffect(() => {
    if (routeId) setPreview('route');
  }, [routeId]);

  const resolved: Resolved = (() => {
    if (preview === 'route') {
      return routeId
        ? { mode: 'detail', id: routeId, state: 'ready' }
        : { mode: 'list', state: 'populated' };
    }
    if (preview === 'populated' || preview === 'no-match' || preview === 'loading' || preview === 'error') {
      return { mode: 'list', state: preview };
    }
    if (preview === 'detail-loading') return { mode: 'detail', id: '', state: 'loading' };
    if (preview === 'detail-error') return { mode: 'detail', id: '', state: 'error' };
    const variant = preview.replace('detail-', '') as DetailVariantId;
    return { mode: 'detail', id: DETAIL_VARIANT_IDS[kind][variant], state: 'ready' };
  })();

  const closeDetail = () => {
    if (preview === 'route') router.push(config.basePath, { scroll: false });
    else setPreview('populated');
  };

  const retryDetail = () => {
    if (preview === 'detail-error') setPreview(`detail-${config.detailVariants[0]}`);
    else closeDetail();
  };

  const applyPreview = (next: RecordsPreview) => {
    setPreview(next);
    if (next === 'route') router.push(config.basePath, { scroll: false });
    else router.replace(config.basePath, { scroll: false });
  };

  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const changeRetailer = (value: string) => {
    setRetailer(value);
    setPage(1);
  };
  const changeActive = (value: ActiveFilter) => {
    setActive(value);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery('');
    setRetailer('all');
    setActive('all');
    setPage(1);
    if (preview === 'no-match') setPreview('populated');
  };

  const filtered = filterRecords(records, { search: query, retailer, active });
  const listState: RecordState = resolved.mode === 'list' ? resolved.state : 'populated';
  const showEmpty = listState === 'no-match' || filtered.length === 0;
  const totalPages = Math.max(1, Math.ceil(filtered.length / RECORDS_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * RECORDS_PAGE_SIZE, currentPage * RECORDS_PAGE_SIZE);

  return (
    <>
      {resolved.mode === 'detail' ? (
        <RecordDetail
          kind={kind}
          recordId={resolved.id}
          state={resolved.state}
          onBack={closeDetail}
          onRetry={retryDetail}
        />
      ) : (
        <main className="max-w-[1440px] mx-auto px-8 py-8 pb-24">
          <header className="max-w-[1280px]">
            <div className="max-w-[760px]">
              <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                {config.title}
              </h1>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-sec)]">{config.lede}</p>
              <RecordsAccessNotice />
            </div>
          </header>

          <div className="mt-7 max-w-[1280px]">
            {listState === 'loading' ? (
              <RecordsSkeleton wide={config.hasActive} />
            ) : listState === 'error' ? (
              <RecordsErrorState
                title={config.errorTitle}
                body={config.errorBody}
                onRetry={() => setPreview('populated')}
              />
            ) : (
              <>
                <section aria-label={config.sectionTitle}>
                  <SectionHeading title={config.sectionTitle} purpose={config.sectionPurpose} />

                  <div className="mt-4">
                    <RecordsFilters
                      config={config}
                      search={query}
                      onSearch={changeQuery}
                      retailer={retailer}
                      onRetailer={changeRetailer}
                      retailerList={retailerOptions(records)}
                      active={active}
                      onActive={changeActive}
                      resultCount={filtered.length}
                      total={records.length}
                    />
                  </div>

                  <div className="mt-3">
                    {showEmpty ? (
                      <RecordsEmptyState
                        title={config.emptyTitle}
                        body={config.emptyBody}
                        onClear={clearFilters}
                      />
                    ) : (
                      <RecordsTable records={visible} config={config} />
                    )}
                  </div>

                  {!showEmpty && filtered.length > RECORDS_PAGE_SIZE && (
                    <div className="mt-3">
                      <AdminPagination
                        page={currentPage}
                        pageSize={RECORDS_PAGE_SIZE}
                        totalItems={filtered.length}
                        onPage={setPage}
                        label={`${config.title} list pages`}
                      />
                    </div>
                  )}
                </section>

                <div className="mt-8">
                  <RecordsNote text={config.note} />
                </div>
              </>
            )}
          </div>
        </main>
      )}

      <RecordsStateControl config={config} state={preview} onChange={applyPreview} />
    </>
  );
}