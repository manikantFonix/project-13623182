'use client';

import { useWidgetState } from './store';
import { REQUEST_SUBMIT_URL } from './data';

const FALLBACK_ERROR =
  "We couldn't send that. Nothing has been sent \u2014 try again.";

export function useRequestSubmit() {
  const [, update] = useWidgetState();

  const send = async (form: HTMLFormElement) => {
    const payload = new FormData(form);
    const guard = String(payload.get('website_alt') ?? '').trim();

    if (guard) {
      update({
        requestStep: 'confirmation',
        requestError: false,
        requestErrorMessage: '',
      });
      return;
    }

    payload.delete('website_alt');
    update({ requestSending: true, requestError: false, requestErrorMessage: '' });

    try {
      const body = new URLSearchParams();
      payload.forEach((value, key) => body.append(key, String(value)));

      const response = await fetch(REQUEST_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      const responseText = await response.text();
      let parsed: {
        code?: string;
        message?: string;
        meta?: { message?: string; detail?: string };
      } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const message =
        parsed?.meta?.message ??
        parsed?.message ??
        parsed?.meta?.detail ??
        responseText;
      const code = parsed?.code;
      const spammy =
        typeof message === 'string' &&
        message.toLowerCase().includes('spam');

      const isOk = response.ok && code === 'OK';

      if (isOk) {
        update({
          requestSending: false,
          requestStep: 'confirmation',
          requestError: false,
          requestErrorMessage: '',
        });
        return;
      }

      const clean =
        typeof message === 'string' &&
        message.trim() !== '' &&
        !spammy &&
        message.trim().length <= 120;

      update({
        requestSending: false,
        requestError: true,
        requestErrorMessage: clean ? message.trim() : FALLBACK_ERROR,
      });
    } catch {
      update({
        requestSending: false,
        requestError: true,
        requestErrorMessage: FALLBACK_ERROR,
      });
    }
  };

  return { send };
}