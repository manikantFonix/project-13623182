'use client';

import { useRef, type FormEvent } from 'react';
import RequestPiece from './RequestPiece';
import RequestQuantity from './RequestQuantity';
import RequestMetal from './RequestMetal';
import RequestEstimateBlock from './RequestEstimateBlock';
import RequestField from './RequestField';
import RequestArea from './RequestArea';
import { useRequestSubmit } from './useRequestSubmit';
import { SAMPLE_DESC, categoryLabel, widgetRing } from './data';
import { METAL_LIST } from '../../lib/metals';
import { useWidgetState } from './store';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RequestFormStep() {
  const [state, update] = useWidgetState();
  const { send } = useRequestSubmit();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const category = state.category ?? 'ring';
  const label = categoryLabel(category);
  const metalName =
    METAL_LIST.find((m) => m.id === state.designMetal)?.name ?? 'Yellow gold';
  const description =
    state.description.trim() !== '' ? state.description : SAMPLE_DESC;

  const nameOk = state.requestName.trim() !== '';
  const emailEntered = state.requestEmail.trim() !== '';
  const emailOk = EMAIL_RE.test(state.requestEmail.trim());
  const phoneOk = state.requestPhone.trim() !== '';

  const reason = !nameOk
    ? 'Add your name to continue.'
    : !emailEntered
      ? 'Add an email address to continue.'
      : !phoneOk
        ? 'Add a phone number to continue.'
        : !emailOk
          ? 'Enter a valid email address.'
          : null;
  const canSubmit = reason === null;

  const emailError =
    emailEntered && !emailOk ? 'Enter a valid email address.' : undefined;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) {
      const target = !nameOk
        ? nameRef
        : !emailEntered
          ? emailRef
          : !phoneOk
            ? phoneRef
            : emailRef;
      target.current?.focus();
      return;
    }
    if (state.requestSending) return;
    send(e.currentTarget);
  };

  return (
    <form
      id="widget-request-form"
      data-readdy-form
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className="text-[18px] font-semibold" style={{ color: 'var(--w-text)' }}>
        Ask about this piece
      </h2>
      <p className="mt-1 text-[13px]" style={{ color: 'var(--w-text-sec)' }}>
        The jeweler will get in touch. Nothing is ordered and nothing is charged.
      </p>

      <div className="mt-5">
        <RequestPiece
          category={category}
          description={description}
          metal={state.designMetal}
        />
      </div>

      <div className="mt-5">
        <RequestMetal
          value={state.designMetal}
          onChange={(m) => update({ designMetal: m })}
        />
      </div>

      <div className="mt-5">
        <RequestQuantity
          value={state.requestQuantity}
          onChange={(v) => update({ requestQuantity: v })}
          pieceLabel={label}
        />
      </div>

      {state.requestEstimate && (
        <div className="mt-5">
          <RequestEstimateBlock result={state.requestEstimate} />
        </div>
      )}

      <input type="hidden" name="category" value={label} />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="metal" value={metalName} />
      {state.requestEstimate && (
        <input
          type="hidden"
          name="estimate"
          value={`$${state.requestEstimate.low} - $${state.requestEstimate.high}`}
        />
      )}

      <div className="mt-6 space-y-5">
        <RequestField
          id="request-name"
          label="Name"
          value={state.requestName}
          onChange={(v) => update({ requestName: v })}
          autoComplete="name"
          inputRef={nameRef}
        />
        <RequestField
          id="request-email"
          label="Email address"
          type="email"
          value={state.requestEmail}
          onChange={(v) => update({ requestEmail: v })}
          autoComplete="email"
          help="We'll send you a copy of this."
          error={emailError}
          inputRef={emailRef}
        />
        <RequestField
          id="request-phone"
          label="Phone number"
          type="tel"
          value={state.requestPhone}
          onChange={(v) => update({ requestPhone: v })}
          autoComplete="tel"
          help="The jeweler will call you on this."
          inputRef={phoneRef}
        />
        <RequestArea
          id="request-address"
          label="Address"
          value={state.requestAddress}
          onChange={(v) => update({ requestAddress: v })}
          optional
        />
        <RequestArea
          id="request-message"
          label="Message"
          value={state.requestMessage}
          onChange={(v) => update({ requestMessage: v })}
          optional
          placeholder="Anything you'd like them to know."
        />
      </div>

      <input
        type="text"
        name="website_alt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        readOnly
        className="w-form-guard"
      />

      {state.requestError && (
        <p
          aria-live="assertive"
          className="mt-6 text-[13px]"
          style={{ color: 'var(--w-primary)' }}
        >
          {state.requestErrorMessage}
        </p>
      )}

      <div className={state.requestError ? 'mt-3' : 'mt-6'}>
        <button
          type="submit"
          disabled={!canSubmit || state.requestSending}
          className={`h-11 w-full text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${widgetRing} ${
            canSubmit ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          style={{
            backgroundColor:
              canSubmit && !state.requestSending
                ? 'var(--w-primary)'
                : 'var(--w-border)',
            color:
              canSubmit && !state.requestSending
                ? 'var(--w-primary-text)'
                : 'var(--w-text-sec)',
          }}
        >
          {state.requestSending ? 'Sending\u2026' : 'Send request'}
        </button>
        {!canSubmit && (
          <p
            className="mt-2 text-[13px] text-right"
            style={{ color: 'var(--w-text-sec)' }}
          >
            {reason}
          </p>
        )}
      </div>
    </form>
  );
}