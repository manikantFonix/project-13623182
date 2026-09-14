'use client';

import { focusRingVar } from '../settings/theme/tokens';
import PhoneField from '../ui/PhoneField';

interface Props {
  email: string;
  phone: string;
  emailError: boolean;
  phoneError: boolean;
  onEmail: (v: string) => void;
  onPhone: (v: string) => void;
}

export default function ContactFields({
  email,
  phone,
  emailError,
  phoneError,
  onEmail,
  onPhone,
}: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="brand-email"
          className="text-[13px] font-medium text-[var(--text)]"
        >
          Business email
        </label>
        <input
          id="brand-email"
          type="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          className={`mt-2 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border rounded-[12px] outline-none placeholder:[var(--text-sec)] ${focusRingVar} ${
            emailError
              ? 'border-[var(--alert)] focus:border-[var(--alert)]'
              : 'border-[var(--border)] focus:border-[var(--accent)]'
          }`}
        />
        {emailError ? (
          <p className="mt-1.5 text-[13px] text-[var(--alert)]">
            {email.trim() === ''
              ? 'Your business email can\'t be empty. Customers reply here.'
              : 'Enter a valid email address.'}
          </p>
        ) : (
          <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
            Shown to customers on your shared catalog and PDFs.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="brand-phone"
          className="text-[13px] font-medium text-[var(--text)]"
        >
          Phone number
        </label>
        <PhoneField
          id="brand-phone"
          value={phone}
          onChange={onPhone}
          placeholder="555 0177"
          wrapClassName="mt-2 flex items-center gap-2"
          inputClassName={`flex-1 h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border rounded-[12px] outline-none placeholder:[var(--text-sec)] ${focusRingVar} ${
            phoneError
              ? 'border-[var(--alert)] focus:border-[var(--alert)]'
              : 'border-[var(--border)] focus:border-[var(--accent)]'
          }`}
          buttonClassName={`h-10 px-2.5 shrink-0 text-[13px] text-[var(--text)] bg-[var(--surface)] border rounded-[12px] flex items-center gap-1 cursor-pointer ${focusRingVar} ${
            phoneError
              ? 'border-[var(--alert)]'
              : 'border-[var(--border)]'
          }`}
          focusRing={focusRingVar}
        />
        {phoneError ? (
          <p className="mt-1.5 text-[13px] text-[var(--alert)]">
            Your phone number can't be empty. Customers call you here.
          </p>
        ) : (
          <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
            Include a country code so customers can reach you.
          </p>
        )}
      </div>
    </div>
  );
}