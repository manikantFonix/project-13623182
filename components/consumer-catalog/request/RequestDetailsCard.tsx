'use client';

import type { DetailsFields } from './types';
import PhoneField from '../../ui/PhoneField';

export interface DetailsErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const baseInput =
  'mt-1.5 w-full h-11 px-3.5 text-[13px] bg-white border rounded-[12px] text-[#16233E] outline-none placeholder-[#C6CFE0] transition-colors duration-150 focus:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

export default function RequestDetailsCard({
  fields,
  errors,
  onChange,
}: {
  fields: DetailsFields;
  errors: DetailsErrors;
  onChange: (key: keyof DetailsFields, value: string) => void;
}) {
  const inputCls = (invalid?: boolean) =>
    `${baseInput} ${invalid ? 'border-[#A8552A]' : 'border-[#DCE3F0]'}`;
  const labelCls = 'flex items-center justify-between text-[13px] font-medium text-[#16233E]';

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5 space-y-5">
      <h2 className="text-[15px] font-medium text-[#16233E]">Your details</h2>

      <div>
        <label className={labelCls} htmlFor="request-name">
          <span>Name</span>
        </label>
        <input
          id="request-name"
          name="name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={(e) => onChange('name', e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'request-name-error' : undefined}
          className={inputCls(!!errors.name)}
        />
        {errors.name && (
          <p id="request-name-error" role="alert" aria-live="polite" className="mt-1.5 text-[12px] text-[#A8552A]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className={labelCls} htmlFor="request-email">
          <span>Email address</span>
        </label>
        <input
          id="request-email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => onChange('email', e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={
            errors.email ? 'request-email-help request-email-error' : 'request-email-help'
          }
          className={inputCls(!!errors.email)}
        />
        <p id="request-email-help" className="mt-1.5 text-[12px] text-[#5D6C8A]">
          We&apos;ll send you a copy of this.
        </p>
        {errors.email && (
          <p id="request-email-error" role="alert" aria-live="polite" className="mt-1.5 text-[12px] text-[#A8552A]">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className={labelCls} htmlFor="request-phone">
          <span>Phone number</span>
        </label>
        <PhoneField
          id="request-phone"
          name="phone"
          value={fields.phone}
          onChange={(v) => onChange('phone', v)}
          placeholder="555 014 2210"
          inputAriaLabel="Phone number"
          ariaInvalid={!!errors.phone}
          ariaDescribedBy={
            errors.phone
              ? 'request-phone-help request-phone-error'
              : 'request-phone-help'
          }
          wrapClassName="mt-1.5 flex items-center gap-2"
          buttonClassName={`h-11 px-3 shrink-0 text-[13px] rounded-[12px] flex items-center gap-1 bg-white border text-[#16233E] cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
            errors.phone ? 'border-[#A8552A]' : 'border-[#DCE3F0]'
          }`}
          inputClassName={`flex-1 h-11 px-3.5 text-[13px] bg-white border rounded-[12px] text-[#16233E] outline-none placeholder-[#C6CFE0] transition-colors duration-150 focus:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
            errors.phone ? 'border-[#A8552A]' : 'border-[#DCE3F0]'
          }`}
          listClassName="absolute z-20 mt-1 w-[260px] max-h-[240px] overflow-y-auto bg-white border border-[#DCE3F0] rounded-[12px] p-1"
          optionClassName="text-[#16233E] hover:bg-[#EDF1FA]"
          optionActiveClassName="bg-[#EDF1FA] text-[#16233E]"
        />
        <p id="request-phone-help" className="mt-1.5 text-[12px] text-[#5D6C8A]">
          The jeweler will call you on this.
        </p>
        {errors.phone && (
          <p id="request-phone-error" role="alert" aria-live="polite" className="mt-1.5 text-[12px] text-[#A8552A]">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label className={labelCls} htmlFor="request-address">
          <span>Address</span>
          <span className="text-[13px] text-[#5D6C8A]">Optional</span>
        </label>
        <textarea
          id="request-address"
          name="address"
          rows={3}
          maxLength={500}
          value={fields.address}
          onChange={(e) => onChange('address', e.target.value)}
          className={`${inputCls(false)} h-auto py-2.5 resize-none leading-relaxed`}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="request-message">
          <span>Message</span>
          <span className="text-[13px] text-[#5D6C8A]">Optional</span>
        </label>
        <textarea
          id="request-message"
          name="message"
          rows={4}
          maxLength={500}
          placeholder="Anything you'd like them to know."
          value={fields.message}
          onChange={(e) => onChange('message', e.target.value)}
          className={`${inputCls(false)} h-auto py-2.5 resize-none leading-relaxed`}
        />
      </div>
    </section>
  );
}