'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CUSTOMER_FOCUS_RING,
  type KindConfig,
  type RecordItem,
} from './data';
import { useDialogFocus } from '../../lib/useDialogFocus';
import PhoneField from '../ui/PhoneField';

interface Props {
  open: boolean;
  config: KindConfig;
  record: RecordItem | null;
  hasSharedRequest?: boolean;
  onClose: () => void;
  onSave: (data: Partial<RecordItem>) => void;
}

function TextInput({
  value,
  onChange,
  placeholder,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-10 w-full px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border rounded-[12px] outline-none placeholder:text-[var(--text-sec)] transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
        invalid ? 'border-[var(--alert)]' : 'border-[var(--border)]'
      }`}
    />
  );
}

const emailValid = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

export default function RecordDialog({
  open,
  config,
  record,
  hasSharedRequest,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [notes, setNotes] = useState('');
  const [active, setActive] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef);

  useEffect(() => {
    if (open) {
      setName(record?.name ?? '');
      setEmail(record?.email ?? '');
      setPhone(record?.phone ?? '');
      setAddress(record?.address ?? '');
      setContactName(record?.contactName ?? '');
      setNotes(record?.notes ?? '');
      setActive(record?.active ?? true);
    }
  }, [open, record]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const isEdit = !!record;
  const title = isEdit ? config.editLabel : config.addLabel;
  const requiredPresent = name.trim() && email.trim();

  const submit = () => {
    if (!requiredPresent || !emailValid(email)) return;
    onSave({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      contactName: contactName.trim() || undefined,
      notes: notes.trim() || undefined,
      active,
    });
  };

  const showEmailNote = config.kind === 'customer' && hasSharedRequest;
  const saveDisabled = !requiredPresent || !emailValid(email);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(22,35,62,0.4)]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div ref={cardRef} className="w-[520px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-7">
        <h2 className="text-[20px] font-semibold text-[var(--text)]">{title}</h2>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-[12px] text-[var(--text-sec)] mb-1">Name</p>
            <TextInput value={name} onChange={setName} placeholder="e.g. Elena Whitmore" />
          </div>

          {config.kind === 'customer' && (
            <>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">Email</p>
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder="name@example.com"
                  invalid={!!email.trim() && !emailValid(email)}
                />
                {!!email.trim() && !emailValid(email) && (
                  <p className="mt-1 text-[12px] text-[var(--alert)]">
                    Enter a valid email address.
                  </p>
                )}
                {showEmailNote && (
                  <p className="mt-1 text-[12px] text-[var(--text-sec)]">
                    Changing this won't resend an approval link that's already out.
                    Send a new link from the request if you need to.
                  </p>
                )}
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">
                  Phone <span className="text-[var(--text-sec)]">Optional</span>
                </p>
                <PhoneField
                  value={phone}
                  onChange={setPhone}
                  placeholder="555 0177"
                  wrapClassName="flex items-center gap-2"
                  inputClassName={`flex-1 h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--text-sec)] ${CUSTOMER_FOCUS_RING}`}
                  focusRing={CUSTOMER_FOCUS_RING}
                />
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">
                  Address <span className="text-[var(--text-sec)]">Optional</span>
                </p>
                <TextInput value={address} onChange={setAddress} placeholder="e.g. 9 Rosewood Terrace" />
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">
                  Notes <span className="text-[var(--text-sec)]">Optional</span>
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add a private note"
                  className={`w-full px-3 py-2 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--text-sec)] resize-none ${CUSTOMER_FOCUS_RING}`}
                />
              </div>
            </>
          )}

          {config.kind === 'manufacturer' && (
            <>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">
                  Contact name <span className="text-[var(--text-sec)]">Optional</span>
                </p>
                <TextInput value={contactName} onChange={setContactName} placeholder="e.g. Marco Benetti" />
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">Email</p>
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder="craft@studio.com"
                  invalid={!!email.trim() && !emailValid(email)}
                />
                {!!email.trim() && !emailValid(email) && (
                  <p className="mt-1 text-[12px] text-[var(--alert)]">
                    Enter a valid email address.
                  </p>
                )}
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">
                  Phone <span className="text-[var(--text-sec)]">Optional</span>
                </p>
                <PhoneField
                  value={phone}
                  onChange={setPhone}
                  placeholder="555 0401"
                  wrapClassName="flex items-center gap-2"
                  inputClassName={`flex-1 h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--text-sec)] ${CUSTOMER_FOCUS_RING}`}
                  focusRing={CUSTOMER_FOCUS_RING}
                />
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-sec)] mb-1">
                  Notes <span className="text-[var(--text-sec)]">Optional</span>
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add a private note"
                  className={`w-full px-3 py-2 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none placeholder:text-[var(--text-sec)] resize-none ${CUSTOMER_FOCUS_RING}`}
                />
              </div>
              <div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => setActive((v) => !v)}
                  className={`inline-flex w-9 h-5 rounded-full p-0.5 items-center transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
                    active ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-[var(--knob)] transition-transform duration-150 transform ${
                      active ? 'translate-x-4' : ''
                    }`}
                  />
                </button>
                <span className="ml-3 text-[13px] font-medium text-[var(--text)]">
                  {active ? 'Active' : 'Inactive'}
                </span>
                <p className="mt-2 text-[12px] text-[var(--text-sec)]">
                  An inactive manufacturer isn't offered when you route a new request.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] hover:text-[var(--text-sec)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={saveDisabled}
              className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] border border-[var(--accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING} ${
                saveDisabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              Save
            </button>
          </div>
          {!requiredPresent && (
            <p className="text-[13px] text-[var(--text-sec)]">
              Add a name and an email to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}