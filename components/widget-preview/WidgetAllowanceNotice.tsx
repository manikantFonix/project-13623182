'use client';

import { widgetRing } from './data';
import type { WidgetContact } from './types';

const linkClass = `flex items-center min-h-11 text-[15px] sm:text-[13px] transition-colors duration-150 ${widgetRing}`;

export default function WidgetAllowanceNotice({
  phone,
  email,
}: WidgetContact) {
  return (
    <div
      aria-live="polite"
      className="rounded-[12px] border p-4"
      style={{
        backgroundColor: 'var(--w-surface)',
        borderColor: 'var(--w-border)',
      }}
    >
      <p className="text-[13px]" style={{ color: 'var(--w-text)' }}>
        This tool is temporarily unavailable. Please get in touch with us
        directly.
      </p>

      {(phone || email) && (
        <div className="mt-3 flex flex-col">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className={linkClass}
              style={{ color: 'var(--w-primary)' }}
            >
              <i className="ri-phone-line mr-2 text-[16px]" aria-hidden />
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className={`${linkClass} break-all`}
              style={{ color: 'var(--w-primary)' }}
            >
              <i className="ri-mail-line mr-2 text-[16px]" aria-hidden />
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}