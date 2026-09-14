'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING, type Request } from './data';
import RecordDecisionDialog from './RecordDecisionDialog';
import CustomerSendDialog from './CustomerSendDialog';
import CustomerStateControl, {
  type CustomerScenario,
} from './CustomerStateControl';
import { customers, initials, type Customer } from './customers';

interface Props {
  req: Request;
  onOpenPicker: () => void;
  onShare: () => void;
  onResend: () => void;
  onGoDesign: () => void;
  onRecord: (outcome: 'approved' | 'rejected') => void;
  onResume: () => void;
}

interface Model {
  scenario: CustomerScenario;
  linkState?: 'waiting' | 'expired' | 'used';
  decision?: Request['decision'];
}

const DEMO_CUSTOMER = customers[0];

function defaultScenario(req: Request): Model {
  if (!req.customer) return { scenario: 'no-customer' };
  const shared = !!req.linkState || !!req.decision;
  if (!shared) return { scenario: 'not-shared' };
  if (req.decision) {
    const retailer = req.decision.by === 'retailer';
    return {
      scenario: req.decision.outcome === 'approved'
        ? retailer ? 'approved-retailer' : 'approved-customer'
        : retailer ? 'rejected-retailer' : 'rejected-customer',
      linkState: 'used',
      decision: req.decision,
    };
  }
  if (req.linkState === 'expired') return { scenario: 'expired', linkState: 'expired' };
  return { scenario: 'waiting', linkState: 'waiting' };
}

const PILL: Record<string, { label: string; cls: string }> = {
  waiting: { label: 'Waiting for approval', cls: 'bg-[var(--muted)] text-[var(--text-sec)]' },
  expired: {
    label: 'Link expired',
    cls: 'bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)]',
  },
  approved: { label: 'Approved', cls: 'bg-[var(--success-bg)] text-[var(--success)]' },
  rejected: {
    label: 'Rejected',
    cls: 'bg-[var(--surface)] border border-[var(--alert)] text-[var(--alert)]',
  },
};

function Block({
  cls,
  lines,
}: {
  cls: string;
  lines: { text: string; cls: string }[];
}) {
  return (
    <div className={`mt-5 rounded-[12px] px-4 py-3 ${cls}`}>
      {lines.map((l, i) => (
        <p key={i} className={`text-[13px] leading-relaxed ${l.cls} ${i > 0 ? 'mt-1.5' : ''}`}>
          {l.text}
        </p>
      ))}
    </div>
  );
}

function LinkField({ req }: { req: Request }) {
  const [copied, setCopied] = useState(false);
  const liveRef = useRef<HTMLSpanElement>(null);
  const link = `https://shop.craftsman.ai/approve/${req.id}`;
  const mid = Math.floor(link.length / 2);

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

  const view = `${link.slice(0, mid)}…${link.slice(mid + 8)}`;

  return (
    <>
      <span ref={liveRef} aria-live="polite" className="sr-only" />
      <div className="flex items-center gap-2">
        <div className="flex-1 h-10 px-3 bg-[var(--muted)] border border-[var(--border)] rounded-[12px] flex items-center">
          <span className="text-[13px] text-[var(--text)] truncate" title={link}>
            {view}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
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

function CenteredCard({
  title,
  body,
  children,
}: {
  title: string;
  body: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-10 min-h-[280px] flex flex-col items-center justify-center text-center">
      <span className="w-14 h-14 rounded-[16px] bg-[var(--muted)] flex items-center justify-center">
        <i className="ri-user-line text-[24px] w-6 h-6 flex items-center justify-center text-[var(--text-sec)]" />
      </span>
      <p className="mt-5 text-[18px] font-semibold text-[var(--text)]">{title}</p>
      <p className="mt-1.5 text-[13px] text-[var(--text-sec)] max-w-[360px]">{body}</p>
      {children}
    </div>
  );
}

export default function CustomerTab({
  req,
  onOpenPicker,
  onShare,
  onResend,
  onGoDesign,
  onRecord,
  onResume,
}: Props) {
  const [scenario, setScenario] = useState<CustomerScenario>(() => defaultScenario(req).scenario);
  const [customer, setCustomer] = useState<Customer | undefined>(() =>
    req.customer ? { id: 'req-customer', ...req.customer } : undefined
  );
  const [decision, setDecision] = useState<Request['decision'] | undefined>(req.decision);
  const [linkState, setLinkState] = useState<Request['linkState']>(req.linkState);
  const [sendOpen, setSendOpen] = useState(false);
  const [recordFor, setRecordFor] = useState<'approved' | 'rejected' | null>(null);
  const [recordError, setRecordError] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [saveFails, setSaveFails] = useState(false);
  const resultRef = useRef<HTMLSpanElement>(null);

  const empty =
    scenario === 'no-customer' || scenario === 'not-shared' || scenario === 'send-dialog-open';
  const canChange = req.status === 'draft' || req.status === 'ready';
  const sharedDate = decision?.date ?? req.updatedFull;

  const openSend = () => setSendOpen(true);

  const handleSend = (selected: Customer) => {
    setCustomer(selected);
    setSendOpen(false);
    setScenario('waiting');
    setLinkState('waiting');
    onShare();
    if (resultRef.current) resultRef.current.textContent = 'Design sent.';
  };

  const applyScenario = (s: CustomerScenario) => {
    setScenario(s);
    setRecordFor(null);
    setRecordError(false);
    if (s === 'no-customer') {
      setCustomer(undefined);
      setDecision(undefined);
      setLinkState(undefined);
      return;
    }
    if (s === 'send-dialog-open') {
      setCustomer((c) => c ?? DEMO_CUSTOMER);
      setScenario('not-shared');
      setSendOpen(true);
      return;
    }
    if (s === 'not-shared') {
      setCustomer((c) => c ?? DEMO_CUSTOMER);
      setDecision(undefined);
      setLinkState(undefined);
      return;
    }
    const c = customer ?? DEMO_CUSTOMER;
    setCustomer(c);
    if (s === 'waiting') {
      setDecision(undefined);
      setLinkState('waiting');
      return;
    }
    if (s === 'expired') {
      setDecision(undefined);
      setLinkState('expired');
      return;
    }
    const retailer = s.endsWith('-retailer');
    const outcome = s.startsWith('approved') ? 'approved' : 'rejected';
    setDecision({
      outcome,
      date: '29 April 2026',
      by: retailer ? 'retailer' : 'customer',
      customerName: c.name,
    });
    setLinkState('used');
  };

  const resend = () => {
    onResend();
    setResendMsg('New link sent.');
    if (resultRef.current) resultRef.current.textContent = 'New link sent.';
    setTimeout(() => {
      setResendMsg('');
      if (resultRef.current) resultRef.current.textContent = '';
    }, 2400);
  };

  const confirmRecord = (outcome: 'approved' | 'rejected') => {
    const c = customer ?? DEMO_CUSTOMER;
    setRecordFor(null);
    if (saveFails) {
      setRecordError(true);
      return;
    }
    setRecordError(false);
    setDecision({ outcome, date: '29 April 2026', by: 'retailer', customerName: c.name });
    setLinkState('used');
    const retailer = true;
    setScenario(
      outcome === 'approved'
        ? retailer ? 'approved-retailer' : 'approved-customer'
        : retailer ? 'rejected-retailer' : 'rejected-customer'
    );
    onRecord(outcome);
  };

  let pill: { label: string; cls: string };
  let block: { cls: string; lines: { text: string; cls: string }[] } | null = null;

  if (scenario === 'waiting') {
    pill = PILL.waiting;
    block = {
      cls: 'bg-[var(--surface)] border-l-2 border-[var(--text-sec)]',
      lines: [
        {
          text: "Waiting for the customer. They've been emailed a link with Approve and Reject on it.",
          cls: 'text-[var(--text)]',
        },
      ],
    };
  } else if (scenario === 'expired') {
    pill = PILL.expired;
    block = {
      cls: 'bg-[var(--surface)] border-l-2 border-[var(--alert)]',
      lines: [
        { text: 'The approval link has expired.', cls: 'text-[var(--alert)]' },
        {
          text: "Send a new one to keep this moving. It's the same link — it just starts working again.",
          cls: 'text-[var(--text-sec)]',
        },
      ],
    };
  } else if (scenario === 'approved-customer' || scenario === 'approved-retailer') {
    pill = PILL.approved;
    const retailer = scenario === 'approved-retailer';
    block = {
      cls: 'bg-[var(--success-bg)]',
      lines: [
        {
          text: retailer
            ? `Approved by you on behalf of ${customer?.name} on ${decision?.date}.`
            : `Approved on ${decision?.date}.`,
          cls: 'text-[var(--success)]',
        },
        {
          text: 'The design is locked at the draft they saw. You can route it to a manufacturer now.',
          cls: 'text-[var(--text-sec)]',
        },
      ],
    };
  } else if (scenario === 'rejected-customer' || scenario === 'rejected-retailer') {
    pill = PILL.rejected;
    const retailer = scenario === 'rejected-retailer';
    block = {
      cls: 'bg-[var(--surface)] border-l-2 border-[var(--alert)]',
      lines: [
        {
          text: retailer
            ? `Rejected by you on behalf of ${customer?.name} on ${decision?.date}.`
            : `Rejected on ${decision?.date}.`,
          cls: 'text-[var(--alert)]',
        },
        {
          text: 'No reason is collected. The design is unlocked so you can refine it and share again.',
          cls: 'text-[var(--text-sec)]',
        },
      ],
    };
  } else {
    pill = PILL.approved;
  }

  const showDecision = scenario === 'waiting' || scenario === 'expired';
  const showResend = scenario === 'waiting' || scenario === 'expired';
  const showRefine =
    scenario === 'rejected-customer' || scenario === 'rejected-retailer';

  return (
    <div>
      {(scenario === 'no-customer' || scenario === 'not-shared') && (
        <CenteredCard
          title="No design sent to the customer yet"
          body={`Share this design with your customer for review and approval.`}
        >
          <button
            type="button"
            onClick={openSend}
            className={`mt-6 h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Send to customer
          </button>
          <p className="mt-1 text-[12px] text-[var(--text-sec)]">
            You can also share from the{' '}
            <button
              type="button"
              onClick={onGoDesign}
              className={`text-[12px] font-medium text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors duration-150 ${FOCUS_RING}`}
            >
              Design tab
            </button>
            .
          </p>
        </CenteredCard>
      )}

      {!empty && (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[15px] font-medium text-[var(--text)]">
                Customer review
              </p>
              <span
                className={`inline-flex h-6 px-3 rounded-full text-[12px] font-medium items-center whitespace-nowrap ${pill.cls}`}
              >
                {pill.label}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                <span className="text-[15px] font-medium text-[var(--text-sec)]">
                  {initials(customer?.name ?? '')}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-[var(--text)]">
                  {customer?.name}
                </p>
                <a
                  href={`mailto:${customer?.email}`}
                  className="block text-[13px] text-[var(--text)] truncate hover:text-[var(--accent-text)] transition-colors duration-150"
                >
                  {customer?.email}
                </a>
                <p className="text-[12px] text-[var(--text-sec)] tabular-nums">
                  Shared on {sharedDate}
                </p>
              </div>
              {canChange && (scenario as string) === 'not-shared' && (
                <button
                  type="button"
                  onClick={onOpenPicker}
                  className={`shrink-0 text-[13px] font-medium text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
                >
                  Change customer
                </button>
              )}
            </div>

            {block && <Block cls={block.cls} lines={block.lines} />}

            {showDecision && (
              <div className="mt-5 pt-4 border-t border-[var(--border)]">
                <LinkField req={req} />
              </div>
            )}
          </div>

          {showDecision && (
            <div className="bg-[var(--muted)] border border-[var(--border)] rounded-[12px] p-5">
              {recordError && (
                <p className="mb-4 text-[13px] text-[var(--alert)]">
                  We couldn't save that. Nothing has changed — try again.
                </p>
              )}
              <p className="text-[13px] font-medium text-[var(--text)]">
                Record their decision
              </p>
              <p className="mt-1 text-[12px] text-[var(--text-sec)] leading-relaxed">
                Use this when the customer is with you. It's the same as them
                deciding through the link.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setRecordFor('approved')}
                  className={`h-9 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent-hover)]`}
                >
                  Record approval
                </button>
                <button
                  type="button"
                  onClick={() => setRecordFor('rejected')}
                  className={`h-9 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} text-[var(--alert)] bg-[var(--surface)] border-[var(--alert)] hover:text-[var(--alert-strong)] hover:border-[var(--alert-strong)]`}
                >
                  Record rejection
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!empty && (
        <div className="mt-4 flex items-center gap-6">
          <span ref={resultRef} aria-live="polite" className="sr-only" />
          {showResend && (
            <button
              type="button"
              onClick={resend}
              className={`text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Resend link
            </button>
          )}
          {resendMsg && !showResend && (
            <p className="text-[13px] text-[var(--text-sec)]">{resendMsg}</p>
          )}
          {showRefine && (
            <button
              type="button"
              onClick={onResume}
              className={`text-[13px] font-medium text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Refine the design
            </button>
          )}
        </div>
      )}

      <CustomerSendDialog
        open={sendOpen}
        req={req}
        onClose={() => setSendOpen(false)}
        onSend={handleSend}
      />

      <RecordDecisionDialog
        open={recordFor !== null}
        customerName={customer?.name ?? ''}
        outcome={recordFor ?? 'approved'}
        onClose={() => setRecordFor(null)}
        onConfirm={() => recordFor && confirmRecord(recordFor)}
      />

      <CustomerStateControl
        scenario={scenario}
        onChange={applyScenario}
        saveFails={saveFails}
        onSaveFails={setSaveFails}
      />
    </div>
  );
}