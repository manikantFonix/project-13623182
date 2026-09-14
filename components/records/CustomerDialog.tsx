'use client';

import { useEffect, useRef, useState } from 'react';
import { CUSTOMER_FOCUS_RING, type CustomerEmail, type RecordItem } from './data';
import { useDialogFocus } from '../../lib/useDialogFocus';
import PhoneField from '../ui/PhoneField';

interface Props {
  open: boolean;
  record: RecordItem | null;
  onClose: () => void;
  onSave: (data: Partial<RecordItem>) => void;
}

const TAGS = ['VIP Client', 'Wholesale', 'Retail', 'Private'];
const EMAIL_LABELS = ['Design', 'Procurement', 'Finance', 'Work', 'Personal'];

interface EmailRow {
  label: string;
  email: string;
}

const emailValid = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

export default function CustomerDialog({ open, record, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('VIP Client');
  const [emails, setEmails] = useState<EmailRow[]>([{ label: 'Work', email: '' }]);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tagOpen, setTagOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef);

  useEffect(() => {
    if (open) {
      setName(record?.name ?? '');
      setTag(record?.tag ?? 'VIP Client');
      setEmails(
        record?.emails?.length
          ? record.emails.map((e) => ({ label: e.label, email: e.email }))
          : [{ label: 'Work', email: record?.email ?? '' }]
      );
      setPhone(record?.phone ?? '');
      setAddress(record?.address ?? '');
      setTagOpen(false);
    }
  }, [open, record]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    const onClick = (e: MouseEvent) => {
      if (tagRef.current && !tagRef.current.contains(e.target as Node)) {
        setTagOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isEdit = !!record;
  const title = isEdit ? 'Edit Client' : 'Add Customer';
  const em = emails.filter((x) => x.email.trim() !== '');
  const validEmails = em.length > 0 && em.every((x) => emailValid(x.email));
  const requiredPresent = name.trim() !== '' && validEmails;

  const updateEmail = (i: number, patch: Partial<EmailRow>) =>
    setEmails((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const removeEmail = (i: number) => setEmails((prev) => prev.filter((_, idx) => idx !== i));

  const submit = () => {
    if (!requiredPresent) return;
    onSave({
      name: name.trim(),
      tag,
      emails: em.map((x) => ({ label: x.label, email: x.email.trim() })),
      email: em[0]?.email.trim() ?? '',
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
    });
  };

  const reason = !requiredPresent
    ? name.trim() === ''
      ? 'Add a full name and at least one email to continue.'
      : 'Enter a valid email address to continue.'
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(22,35,62,0.4)]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={cardRef}
        className="w-[440px] max-w-[calc(100vw-32px)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[var(--text)]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:bg-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
          >
            <i className="ri-close-line text-[16px] w-4 h-4 flex items-center justify-center" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <label className="block">
            <span className="text-[12px] text-[var(--text-sec)]">Full Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className={`mt-1 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--border-strong)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
            />
          </label>

          <div className="relative" ref={tagRef}>
            <p className="text-[12px] text-[var(--text-sec)]">Customer Tag</p>
            <button
              type="button"
              onClick={() => setTagOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={tagOpen}
              className={`mt-1 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] flex items-center justify-between transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
            >
              <span>{tag}</span>
              <i
                className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center text-[var(--text-sec)] transition-transform duration-150 ${
                  tagOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {tagOpen && (
              <div
                role="listbox"
                className="absolute z-10 mt-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-1.5"
              >
                {TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="option"
                    aria-selected={tag === t}
                    onClick={() => {
                      setTag(t);
                      setTagOpen(false);
                    }}
                    className={`w-full text-left h-9 px-3 text-[13px] font-medium rounded-[8px] transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
                      tag === t ? 'bg-[var(--canvas)] text-[var(--text)]' : 'text-[var(--text-sec)] hover:bg-[var(--muted)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-[12px] text-[var(--text-sec)]">Email Addresses</p>
            <div className="mt-1 flex flex-col gap-2">
              {emails.map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <select
                      value={row.label}
                      onChange={(e) => updateEmail(i, { label: e.target.value })}
                      aria-label="Email type"
                      className={`w-full h-10 pl-3 pr-8 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none appearance-none ${CUSTOMER_FOCUS_RING}`}
                    >
                      {EMAIL_LABELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[16px] w-4 h-4 flex items-center justify-center text-[var(--text-sec)] pointer-events-none" />
                  </div>
                  <input
                    placeholder="Email address"
                    value={row.email}
                    onChange={(e) => updateEmail(i, { email: e.target.value })}
                    className={`h-10 flex-1 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--border-strong)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
                  />
                  {emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(i)}
                      aria-label="Remove email"
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-sec)] hover:text-[var(--alert)] hover:bg-[var(--muted)] transition-colors duration-150 shrink-0 ${CUSTOMER_FOCUS_RING}`}
                    >
                      <i className="ri-close-line text-[16px] w-4 h-4 flex items-center justify-center" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEmails((prev) => [...prev, { label: 'Work', email: '' }])}
                className={`self-start text-[13px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-150 inline-flex items-center gap-1 ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-add-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Add another email
              </button>
            </div>
          </div>

          <div className="block">
            <span className="text-[12px] text-[var(--text-sec)]">Phone Number</span>
            <PhoneField
              value={phone}
              onChange={setPhone}
              placeholder="555 0177"
              wrapClassName="mt-1 flex items-center gap-2"
              inputClassName={`flex-1 h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--border-strong)] ${CUSTOMER_FOCUS_RING}`}
              focusRing={CUSTOMER_FOCUS_RING}
            />
          </div>

          <label className="block">
            <span className="text-[12px] text-[var(--text-sec)]">Location</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Location"
              className={`mt-1 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--border-strong)] ${CUSTOMER_FOCUS_RING}`}
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={submit}
            disabled={!requiredPresent}
            className={`w-full h-10 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING} ${
              !requiredPresent ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isEdit ? 'Save Changes' : 'Add Customer'}
          </button>
          {!isEdit && (
            <p className="text-[12px] text-[var(--text-sec)] text-center">
              The approval link is sent to the first email.
            </p>
          )}
          {reason && !requiredPresent && (
            <p className="text-[13px] text-[var(--text-sec)] text-center">{reason}</p>
          )}
        </div>
      </div>
    </div>
  );
}