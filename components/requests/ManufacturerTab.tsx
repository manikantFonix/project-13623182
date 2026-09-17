'use client';

import { useRef, useState } from 'react';
import { FOCUS_RING, type Request } from './data';
import RecordResponseDialog, {
  type RecordedResponse,
} from './RecordResponseDialog';
import ApproveQuoteDialog from './ApproveQuoteDialog';
import ChangeDateDialog from './ChangeDateDialog';
import { isoToDisplay } from './promisedDate';
import ManufacturerStateControl, {
  type MfrScenario,
} from './ManufacturerStateControl';
import DetailSheetDrawer from './DetailSheetDrawer';
import SendToManufacturerDialog from './SendToManufacturerDialog';
import type { MfrPick } from './manufacturers';

interface Props {
  req: Request;
  onGoDesign: () => void;
}

export interface MfrQuote {
  amount: number;
  deliveryDays?: number;
  notes?: string;
  submitted: string;
  recordedByRetailer?: boolean;
}

export interface MfrEntry {
  id: string;
  name: string;
  specialty?: string;
  location?: string;
  sentDate: string;
  status: 'pending' | 'quoted' | 'declined' | 'approved' | 'not-selected';
  quote?: MfrQuote;
}

interface Timeline {
  reached: number[];
  current: number;
  dates: { sent: string; quote?: string; approved?: string; production?: string; completed?: string };
}

const STAGES = [
  'Sent',
  'Quote received',
  'Approved for production',
  'In production',
  'Completed',
];

const POOL: Record<string, { name: string; specialty: string; location: string; initials: string }> = {
  platinum: {
    name: 'PlatinumCraft Ltd.',
    specialty: 'Platinum Specialist',
    location: 'Zurich, Switzerland',
    initials: 'PC',
  },
  artisan: {
    name: 'Artisan Gold Co.',
    specialty: 'Gold Specialist',
    location: 'Milan, Italy',
    initials: 'AG',
  },
  novum: {
    name: 'Novum Fineworks',
    specialty: 'Earring Specialist',
    location: 'Lisbon, Portugal',
    initials: 'NF',
  },
  craftline: {
    name: 'Craftline Guild',
    specialty: 'Certified Goldsmith',
    location: 'Antwerp, Belgium',
    initials: 'CG',
  },
};

const PLATINUM_QUOTE: MfrQuote = {
  amount: 5200,
  deliveryDays: 14,
  notes:
    'Platinum sourced from certified Swiss suppliers. Rush delivery available at +$400.',
  submitted: '12 May 2026, 2:15 PM',
};
const ARTISAN_QUOTE: MfrQuote = {
  amount: 4850,
  deliveryDays: 18,
  notes:
    'Includes premium 18k gold sourcing and hand-finishing. Delivery estimate based on current workload.',
  submitted: '12 May 2026, 3:22 PM',
};
const NOVUM_QUOTE: MfrQuote = {
  amount: 2100,
  deliveryDays: 12,
  notes: 'Cast and set in-house. Polished by hand.',
  submitted: '12 May 2026, 4:31 PM',
};

const SENT = '12 May 2026';

function baseEntries(): MfrEntry[] {
  return ['platinum', 'artisan', 'novum'].map((id) => ({
    id,
    ...POOL[id],
    sentDate: SENT,
    status: 'pending',
  }));
}

function quoteFor(id: string): MfrQuote {
  return id === 'platinum'
    ? PLATINUM_QUOTE
    : id === 'artisan'
    ? ARTISAN_QUOTE
    : NOVUM_QUOTE;
}

function scenarioData(scenario: MfrScenario): {
  entries: MfrEntry[];
  approvedId: string | null;
  timeline: Timeline | null;
  promisedDate?: string | null;
} {
  if (scenario === 'sent') {
    return { entries: baseEntries(), approvedId: null, timeline: null };
  }
  if (scenario === 'nothing-sent') {
    return { entries: [], approvedId: null, timeline: null };
  }
  if (scenario === 'one-pending') {
    return {
      entries: [baseEntries()[0]],
      approvedId: null,
      timeline: null,
    };
  }
  if (scenario === 'three-pending') {
    return { entries: baseEntries(), approvedId: null, timeline: null };
  }
  if (scenario === 'one-quote-two-pending') {
    return {
      entries: baseEntries().map((e) =>
        e.id === 'platinum'
          ? { ...e, status: 'quoted', quote: PLATINUM_QUOTE }
          : e
      ),
      approvedId: null,
      timeline: null,
    };
  }
  if (scenario === 'three-quotes') {
    return {
      entries: baseEntries().map((e) => ({ ...e, status: 'quoted', quote: quoteFor(e.id) })),
      approvedId: null,
      timeline: null,
    };
  }
  if (scenario === 'one-declined') {
    return {
      entries: baseEntries().map((e) =>
        e.id === 'artisan' ? { ...e, status: 'declined' } : e
      ),
      approvedId: null,
      timeline: null,
    };
  }
  if (scenario === 'recorded-quote') {
    return {
      entries: baseEntries().map((e) =>
        e.id === 'platinum'
          ? { ...e, status: 'quoted', quote: { ...PLATINUM_QUOTE, recordedByRetailer: true } }
          : e
      ),
      approvedId: null,
      timeline: null,
    };
  }

  const approvedEntries: MfrEntry[] = baseEntries().map((e) => ({
    ...e,
    quote: quoteFor(e.id),
    status: e.id === 'platinum' ? 'approved' : 'not-selected',
  }));
  const timeline =
    scenario === 'in-production'
      ? {
          reached: [0, 1, 2, 3],
          current: 3,
          dates: { sent: SENT, quote: SENT, approved: SENT, production: SENT },
        }
      : scenario === 'completed'
      ? {
          reached: [0, 1, 2, 3, 4],
          current: 4,
          dates: { sent: SENT, quote: SENT, approved: SENT, production: SENT, completed: SENT },
        }
      : {
          reached: [0, 1, 2],
          current: 2,
          dates: { sent: SENT, quote: SENT, approved: SENT },
        };

  return {
    entries: approvedEntries,
    approvedId: 'platinum',
    timeline,
    promisedDate: '2026-05-26',
  };
}

function defaultScenario(req: Request): MfrScenario {
  if (req.status === 'draft' || req.status === 'ready' || req.status === 'sent') {
    return 'before-approval';
  }
  return 'nothing-sent';
}

function initials(name: string) {
  return POOL[name]?.initials ?? name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function pillFor(e: MfrEntry): { label: string; cls: string; sub?: string } {
  if (e.status === 'quoted')
    return {
      label: 'Quote received',
      cls: 'bg-[var(--muted)] text-[var(--text)]',
      sub: 'Needs your decision',
    };
  if (e.status === 'declined')
    return { label: 'Declined', cls: 'bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)]' };
  if (e.status === 'approved')
    return { label: 'Approved', cls: 'bg-[var(--success-bg)] text-[var(--success)]' };
  if (e.status === 'not-selected')
    return { label: 'Not selected', cls: 'bg-[var(--muted)] text-[var(--text-sec)]' };
  return { label: 'Pending response', cls: 'bg-[var(--muted)] text-[var(--text-sec)]' };
}

function money(n: number) {
  return '$' + n.toLocaleString('en-US');
}

function LinkField({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);
  const liveRef = useRef<HTMLSpanElement>(null);
  const mid = Math.floor(link.length / 2);
  const view = `${link.slice(0, mid)}…${link.slice(mid + 8)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* no-op */
    }
    setCopied(true);
    if (liveRef.current) liveRef.current.textContent = 'Link copied.';
    setTimeout(() => {
      setCopied(false);
      if (liveRef.current) liveRef.current.textContent = '';
    }, 2000);
  };

  return (
    <>
      <span ref={liveRef} aria-live="polite" className="sr-only" />
      <div className="flex items-center gap-2">
        <div className="flex-1 h-9 px-3 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] flex items-center">
          <span className="text-[12px] text-[var(--text)] truncate" title={link}>
            {view}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className={`h-9 px-4 text-[12px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
            copied
              ? 'border-[var(--border)] text-[var(--success)] bg-[var(--success-bg)]'
              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--canvas)]'
          }`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </>
  );
}

function QuotationBlock({ entry }: { entry: MfrEntry }) {
  const q = entry.quote;
  if (!q) return null;
  return (
    <div className="bg-[var(--muted)] rounded-[12px] p-4 mt-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-[var(--text-sec)]">Quotation</p>
        <p className="text-[12px] text-[var(--text-sec)] tabular-nums">{q.submitted}</p>
      </div>

      <div className="mt-3 flex gap-3">
        <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
          <p className="text-[12px] text-[var(--text-sec)]">Quoted price</p>
          <p className="mt-1 text-[20px] font-semibold text-[var(--text)] tabular-nums">
            {money(q.amount)}
            <span className="ml-1 text-[12px] font-normal text-[var(--text-sec)]">
              USD
            </span>
          </p>
        </div>
        {q.deliveryDays !== undefined && (
          <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
            <p className="text-[12px] text-[var(--text-sec)]">Estimated delivery</p>
            <p className="mt-1 text-[20px] font-semibold text-[var(--text)] tabular-nums">
              {q.deliveryDays}
              <span className="ml-1 text-[12px] font-normal text-[var(--text-sec)]">
                days
              </span>
            </p>
          </div>
        )}
      </div>

      {q.notes && (
        <div className="mt-3">
          <p className="text-[12px] text-[var(--text-sec)]">Their notes</p>
          <p className="mt-1 text-[13px] text-[var(--text)] whitespace-pre-line">
            {q.notes}
          </p>
        </div>
      )}

      <p className="mt-3 text-[12px] text-[var(--text-sec)]">
        A submitted quote can't be changed.
      </p>
    </div>
  );
}

function EntryCard({
  entry,
  reqId,
  anyApproved,
  onApprove,
  onReject,
  onRecord,
}: {
  entry: MfrEntry;
  reqId: string;
  anyApproved: boolean;
  onApprove: () => void;
  onReject: () => void;
  onRecord: () => void;
}) {
  const pill = pillFor(entry);
  const link = `https://shop.craftsman.ai/quote/${reqId}/${entry.id}`;
  const undecided = entry.status === 'quoted' && !anyApproved;
  const pending = entry.status === 'pending';

  const locationDot =
    entry.specialty && entry.location
      ? `${entry.specialty} · ${entry.location}`
      : entry.specialty || entry.location;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
            <span className="text-[13px] font-medium text-[var(--text-sec)]">
              {initials(entry.id)}
            </span>
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-[var(--text)]">{entry.name}</p>
            {locationDot && (
              <p className="text-[12px] text-[var(--text-sec)]">{locationDot}</p>
            )}
            <p className="text-[12px] text-[var(--text-sec)] tabular-nums">
              Sent {entry.sentDate}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <span
            className={`inline-flex h-6 px-3 rounded-full text-[12px] font-medium items-center whitespace-nowrap ${pill.cls}`}
          >
            {pill.label}
          </span>
          {pill.sub && (
            <span className="text-[11px] font-medium text-[var(--alert)]">
              {pill.sub}
            </span>
          )}
        </div>
      </div>

      <QuotationBlock entry={entry} />

      {entry.quote?.recordedByRetailer && (
        <p className="mt-2 text-[11px] text-[var(--text-sec)]">
          Recorded by you on {entry.sentDate}.
        </p>
      )}

      {undecided && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onApprove}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Approve quote
          </button>
          <button
            type="button"
            onClick={onReject}
            className={`h-9 px-4 text-[13px] font-medium text-[var(--alert)] bg-[var(--surface)] border border-[var(--alert)] rounded-full hover:text-[var(--alert-strong)] hover:border-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Reject quote
          </button>
          <span className="text-[12px] text-[var(--text-sec)]">
            Approving this one closes the others.
          </span>
        </div>
      )}

      {pending && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px]">
            <LinkField link={link} />
          </div>
        </div>
      )}

      {pending && (
        <button
          type="button"
          onClick={onRecord}
          className={`mt-3 text-[13px] font-medium text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
        >
          Record their response
        </button>
      )}
    </div>
  );
}

function ApprovedCard({
  entry,
  req,
  promisedDate,
  onUpdateDate,
}: {
  entry: MfrEntry;
  req: Request;
  promisedDate: string | null;
  onUpdateDate: () => void;
}) {
  const q = entry.quote;
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-medium text-[var(--text)]">
          Approved manufacturer
        </p>
        <span className="inline-flex h-6 px-3 rounded-full text-[12px] font-medium items-center whitespace-nowrap bg-[var(--success-bg)] text-[var(--success)]">
          In production
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3.5">
        <span className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
          <span className="text-[15px] font-medium text-[var(--text-sec)]">
            {initials(entry.id)}
          </span>
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-[var(--text)]">{entry.name}</p>
          {entry.specialty && entry.location && (
            <p className="text-[13px] text-[var(--text-sec)]">
              {entry.specialty} · {entry.location}
            </p>
          )}
          <p className="text-[12px] text-[var(--text-sec)] tabular-nums">
            Sent {entry.sentDate} ·{' '}
            <span className="text-[var(--success)]">Approved {entry.sentDate}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <div className="flex-1 bg-[var(--muted)] rounded-[12px] p-4">
          <p className="text-[12px] text-[var(--text-sec)]">Approved quote</p>
          <p className="mt-1 text-[20px] font-semibold text-[var(--text)] tabular-nums">
            {q ? money(q.amount) : ''}
            <span className="ml-1 text-[12px] font-normal text-[var(--text-sec)]">
              USD
            </span>
          </p>
        </div>
        {q?.deliveryDays !== undefined && (
          <div className="flex-1 bg-[var(--muted)] rounded-[12px] p-4">
            <p className="text-[12px] text-[var(--text-sec)]">Estimated delivery</p>
            <p className="mt-1 text-[20px] font-semibold text-[var(--text)] tabular-nums">
              {q.deliveryDays}
              <span className="ml-1 text-[12px] font-normal text-[var(--text-sec)]">
                days
              </span>
            </p>
          </div>
        )}
        {promisedDate && (
          <div className="flex-1 bg-[var(--muted)] rounded-[12px] p-4">
            <p className="text-[12px] text-[var(--text-sec)]">Customer expects</p>
            <p className="mt-1 text-[20px] font-semibold text-[var(--text)] tabular-nums">
              {isoToDisplay(promisedDate)}
            </p>
            <button
              type="button"
              onClick={onUpdateDate}
              className={`mt-1 text-[13px] font-medium text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap cursor-pointer ${FOCUS_RING}`}
            >
              Update
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 bg-[var(--success-bg)] rounded-[12px] p-3">
        <p className="text-[13px] text-[var(--success)]">
          Quote approved. Production has started with this manufacturer.
        </p>
      </div>

      <p className="mt-3 text-[12px] text-[var(--text-sec)]">
        Design No. {req.designNo}
      </p>
    </div>
  );
}

function TimelineCard({ timeline }: { timeline: Timeline }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
      <p className="text-[15px] font-medium text-[var(--text)]">
        Production timeline
      </p>
      <div className="mt-5">
        {STAGES.map((name, i) => {
          const reached = timeline.reached.includes(i);
          const current = timeline.current === i;
          const date = timeline.dates[name.toLowerCase().replace(/ /g, '') as keyof Timeline['dates']];
          const last = i === STAGES.length - 1;
          return (
            <div key={name} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    reached ? 'bg-[var(--accent)]' : 'bg-[var(--muted)]'
                  }`}
                >
                  {reached && (
                    <i className="ri-check-line text-[12px] w-3 h-3 flex items-center justify-center text-[var(--on-accent)]" />
                  )}
                </span>
                {!last && <span className="w-px flex-1 bg-[var(--border)]" />}
              </div>
              <div className={`pb-5 pt-0.5 ${last ? 'pb-0' : ''}`}>
                <p
                  className={`text-[13px] ${
                    reached
                      ? current
                        ? 'font-medium text-[var(--text)]'
                        : 'text-[var(--text)]'
                      : 'text-[var(--text-sec)]'
                  }`}
                >
                  {name}
                </p>
                {current && (
                  <p className="text-[12px] text-[var(--text-sec)]">Current stage</p>
                )}
                {!current && date && (
                  <p className="text-[12px] text-[var(--text-sec)] tabular-nums">
                    {date}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CenteredCard({
  icon,
  title,
  body,
  children,
}: {
  icon: string;
  title: string;
  body: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-10 min-h-[280px] flex flex-col items-center justify-center text-center">
      <span className="w-14 h-14 rounded-[16px] bg-[var(--muted)] flex items-center justify-center">
        <i className={`${icon} text-[24px] w-6 h-6 flex items-center justify-center text-[var(--text-sec)]`} />
      </span>
      <p className="mt-5 text-[18px] font-semibold text-[var(--text)]">{title}</p>
      <p className="mt-1.5 text-[13px] text-[var(--text-sec)] max-w-[360px]">{body}</p>
      {children}
    </div>
  );
}

export default function ManufacturerTab({ req, onGoDesign }: Props) {
  const [scenario, setScenario] = useState<MfrScenario>(defaultScenario(req));
  const [entries, setEntries] = useState<MfrEntry[]>(() =>
    scenarioData(defaultScenario(req)).entries
  );
  const [approvedId, setApprovedId] = useState<string | null>(
    () => scenarioData(defaultScenario(req)).approvedId
  );
  const [timeline, setTimeline] = useState<Timeline | null>(
    () => scenarioData(defaultScenario(req)).timeline
  );
  const [promisedDate, setPromisedDate] = useState<string | null>(
    () => scenarioData(defaultScenario(req)).promisedDate ?? null
  );
  const [dateOpen, setDateOpen] = useState(false);
  const [saveFails, setSaveFails] = useState(false);
  const [recordFor, setRecordFor] = useState<string | null>(null);
  const [approveFor, setApproveFor] = useState<string | null>(null);
  const [pageError, setPageError] = useState(false);
  const [resentMsg, setResentMsg] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const resultRef = useRef<HTMLSpanElement>(null);

  const applyScenario = (s: MfrScenario) => {
    setScenario(s);
    const d = scenarioData(s);
    setEntries(d.entries);
    setApprovedId(d.approvedId);
    setTimeline(d.timeline);
    setPromisedDate(d.promisedDate ?? null);
    setPageError(false);
    setRecordFor(null);
    setApproveFor(null);
  };

  const beforeApproval = scenario === 'before-approval';
  const approvedEntry = approvedId
    ? entries.find((e) => e.id === approvedId)
    : undefined;
  const anyApproved = !!approvedId;
  const anyPending = entries.some((e) => e.status === 'pending');

  const confirmApprove = (date: string) => {
    if (!approveFor) return;
    if (saveFails) {
      setPageError(true);
      setApproveFor(null);
      return;
    }
    setPageError(false);
    const id = approveFor;
    setEntries((prev) =>
      prev.map((e) => ({
        ...e,
        quote: e.quote,
        status: e.id === id ? 'approved' : 'not-selected',
      }))
    );
    setApprovedId(id);
    setPromisedDate(date);
    setTimeline({
      reached: [0, 1, 2],
      current: 2,
      dates: { sent: SENT, quote: SENT, approved: SENT },
    });
    setApproveFor(null);
  };

  const rejectQuote = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'declined' } : e))
    );
  };

  const saveResponse = (id: string, obj: RecordedResponse) => {
    if (saveFails) {
      setPageError(true);
      setRecordFor(null);
      return;
    }
    setPageError(false);
    if (obj.type === 'quote') {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                status: 'quoted',
                quote: {
                  amount: obj.amount,
                  deliveryDays: obj.deliveryDays,
                  notes: obj.notes,
                  submitted: SENT,
                  recordedByRetailer: true,
                },
              }
            : e
        )
      );
    } else {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: 'declined' } : e))
      );
    }
    setRecordFor(null);
  };

  const resendAll = () => {
    setResentMsg('New link sent to everyone still waiting.');
    if (resultRef.current)
      resultRef.current.textContent = 'New link sent.';
    setTimeout(() => {
      setResentMsg('');
      if (resultRef.current) resultRef.current.textContent = '';
    }, 2400);
  };

  const handleSend = (picks: MfrPick[]) => {
    setEntries(
      picks.map((p) => ({
        id: p.id,
        name: p.name,
        specialty: p.specialty === '—' ? undefined : p.specialty,
        location: p.location === '—' ? undefined : p.location,
        sentDate: SENT,
        status: 'pending' as const,
      }))
    );
    setApprovedId(null);
    setTimeline(null);
    setPageError(false);
    setSendOpen(false);
    setSheetOpen(false);
    setScenario('sent');
  };

  if (beforeApproval) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[240px]">
        <p className="text-[13px] text-[var(--text)] max-w-[440px]">
          You can route this to a manufacturer once the design has been
          approved.
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div>
        {pageError && (
          <p className="mb-4 text-[13px] text-[var(--alert)]">
            We couldn't save that. Nothing has changed — try again.
          </p>
        )}
        <CenteredCard
          icon="ri-building-4-line"
          title="No design sent to a manufacturer yet"
          body="Put together a detail sheet, then send it to as many manufacturers as you like."
        >
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className={`mt-6 h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Generate detail sheet
          </button>
          <p className="mt-3 text-[12px] text-[var(--text-sec)]">
            You'll review the specifications before anything goes out.
          </p>
        </CenteredCard>
        <ManufacturerStateControl
          scenario={scenario}
          onChange={applyScenario}
          saveFails={saveFails}
          onSaveFails={setSaveFails}
        />

        <DetailSheetDrawer
          open={sheetOpen}
          req={req}
          onClose={() => setSheetOpen(false)}
          onSend={() => {
            setSheetOpen(false);
            setSendOpen(true);
          }}
        />

        <SendToManufacturerDialog
          open={sendOpen}
          onClose={() => setSendOpen(false)}
          onSend={handleSend}
        />
      </div>
    );
  }

  const pendingCount = entries.filter((e) => e.status === 'pending').length;

  return (
    <div>
      {pageError && (
        <p className="mb-4 text-[13px] text-[var(--alert)]">
          We couldn't save that. Nothing has changed — try again.
        </p>
      )}

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-medium text-[var(--text)]">
            Manufacturers contacted
          </p>
          <span className="inline-flex h-6 px-3 rounded-full text-[12px] font-medium items-center whitespace-nowrap bg-[var(--muted)] text-[var(--text-sec)] tabular-nums">
            {entries.length} sent
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {entries.map((e) => (
            <EntryCard
              key={e.id}
              entry={e}
              reqId={req.id}
              anyApproved={anyApproved}
              onApprove={() => setApproveFor(e.id)}
              onReject={() => rejectQuote(e.id)}
              onRecord={() => setRecordFor(e.id)}
            />
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center gap-6">
          <span ref={resultRef} aria-live="polite" className="sr-only" />
          {anyPending && (
            <button
              type="button"
              onClick={resendAll}
              className={`text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Resend to everyone waiting
            </button>
          )}
          {resentMsg && !anyPending && (
            <p className="text-[13px] text-[var(--text-sec)]">{resentMsg}</p>
          )}
          <button
            type="button"
            onClick={onGoDesign}
            className={`text-[13px] font-medium text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Update the design
          </button>
          <span className="ml-auto text-[12px] text-[var(--text-sec)]">
            {pendingCount} still waiting
          </span>
        </div>
      </div>

      {approvedEntry && (
        <div className="mt-5">
          <ApprovedCard
            entry={approvedEntry}
            req={req}
            promisedDate={promisedDate}
            onUpdateDate={() => setDateOpen(true)}
          />
        </div>
      )}

      {timeline && (
        <div className="mt-5">
          <TimelineCard timeline={timeline} />
        </div>
      )}

      <ManufacturerStateControl
        scenario={scenario}
        onChange={applyScenario}
        saveFails={saveFails}
        onSaveFails={setSaveFails}
      />

      <RecordResponseDialog
        open={recordFor !== null}
        manufacturerName={entries.find((e) => e.id === recordFor)?.name ?? ''}
        onClose={() => setRecordFor(null)}
        onSave={(obj) => recordFor && saveResponse(recordFor, obj)}
      />

      <ApproveQuoteDialog
        open={approveFor !== null}
        manufacturerName={entries.find((e) => e.id === approveFor)?.name ?? ''}
        quote={entries.find((e) => e.id === approveFor)?.quote}
        otherCount={entries.filter((e) => e.status !== 'approved').length - 1}
        onClose={() => setApproveFor(null)}
        onConfirm={confirmApprove}
      />

      <ChangeDateDialog
        open={dateOpen}
        value={promisedDate ?? ''}
        onClose={() => setDateOpen(false)}
        onSave={(date) => {
          setPromisedDate(date);
          setDateOpen(false);
        }}
      />
    </div>
  );
}