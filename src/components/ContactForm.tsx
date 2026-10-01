"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  findService,
  serviceCategories,
  serviceLabel,
} from "@/content/services";
import { site, whatsappHref } from "@/content/site";
import { Arrow } from "@/components/Arrow";
import { cn } from "@/lib/utils";
import { disciplines } from "@/content/disciplines";
import {
  contactBudgets,
  contactLimits,
  validateContact,
} from "@/lib/contact-validation";

const OTHER = "Iets anders";

const budgets = contactBudgets;

type Values = import("@/lib/contact-validation").ContactValues;
type Errors = import("@/lib/contact-validation").ContactErrors;
const validate = validateContact;

const order: (keyof Values)[] = [
  "name",
  "email",
  "phone",
  "service_type",
  "budget",
  "message",
];

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: keyof Values;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="meta flex justify-between text-fg">
        {label}
        {optional && <span className="text-fg-3">Optioneel</span>}
      </label>
      {children}
      <p
        id={`${id}-error`}
        className={cn("mt-2 text-sm text-danger", !error && "sr-only")}
        aria-live="polite"
      >
        {error}
      </p>
    </div>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const requested = params.get("dienst") ?? "";
  const preset = findService(requested);
  const presetDiscipline = disciplines.find(
    (discipline) =>
      discipline.id === requested || discipline.name === requested,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef(false);
  const requestIdRef = useRef("");
  const submittedAtRef = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [confirmationAccepted, setConfirmationAccepted] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    service_type: preset
      ? serviceLabel(preset, preset.category)
      : (presetDiscipline?.name ?? ""),
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );

  // The form collapses on success; bring the confirmation into view.
  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const update = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const next = { ...values, [e.target.name]: e.target.value };
    requestIdRef.current = "";
    submittedAtRef.current = 0;
    setValues(next);
    // After a first submit attempt, errors clear as soon as a field is fixed.
    if (touched) setErrors(validate(next));
  };

  const describe = (id: keyof Values) => ({
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": `${id}-error`,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingRef.current) return;
    setTouched(true);
    const found = validate(values);
    setErrors(found);
    const first = order.find((key) => found[key]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    sendingRef.current = true;
    requestIdRef.current ||= crypto.randomUUID();
    submittedAtRef.current ||= Date.now();
    setStatus("sending");
    setFailureMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypotRef.current?.value ?? "",
          request_id: requestIdRef.current,
          submitted_at: submittedAtRef.current,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await res.json();
      if (
        !res.ok ||
        result.success !== true ||
        result.notificationAccepted !== true
      ) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error || "Het versturen is niet bevestigd.");
      }
      setConfirmationAccepted(result.confirmationAccepted === true);
      setStatus("sent");
    } catch (error) {
      setFailureMessage(
        error instanceof Error && error.name === "Error"
          ? error.message
          : "Het versturen is niet bevestigd. Probeer het opnieuw.",
      );
      setStatus("failed");
    } finally {
      sendingRef.current = false;
    }
  };

  if (status === "sent") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        className="scroll-mt-28 border-t border-line-strong pt-8 outline-none"
        role="status"
      >
        <p className="meta mb-5 text-ok">Verstuurd</p>
        <p className="t-h2 max-w-[16ch]">
          Bedankt, {values.name.split(" ")[0]}.
        </p>
        <p className="t-body mt-5 max-w-[40ch]">
          We reageren binnen {site.responseTime} op werkdagen op {values.email}.
        </p>
        <p className="t-small mt-4 max-w-[44ch]">
          {confirmationAccepted
            ? "De e-mailprovider heeft uw bevestiging geaccepteerd. Controleer ook uw spammap; bezorging in uw mailbox is nog niet bevestigd."
            : "Uw aanvraag is ontvangen, maar de bevestigingsmail kon niet worden verstuurd. U hoeft het formulier niet opnieuw in te vullen."}
        </p>
        <button
          type="button"
          className="link-arrow link-line mt-8 py-1"
          onClick={() => {
            setValues({
              name: "",
              email: "",
              phone: "",
              service_type: "",
              budget: "",
              message: "",
            });
            requestIdRef.current = "";
            submittedAtRef.current = 0;
            setErrors({});
            setTouched(false);
            setStatus("idle");
          }}
        >
          Nog een bericht sturen
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      aria-busy={status === "sending"}
      className="grid gap-8"
    >
      <fieldset disabled={status === "sending"} className="contents">
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Laat dit veld leeg</label>
          <input
            ref={honeypotRef}
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-8">
          <Field id="name" label="Naam" error={errors.name}>
            <input
              id="name"
              name="name"
              required
              maxLength={contactLimits.name}
              autoComplete="name"
              className="field"
              value={values.name}
              onChange={update}
              {...describe("name")}
            />
          </Field>
          <Field id="email" label="E-mail" error={errors.email}>
            <input
              id="email"
              name="email"
              required
              maxLength={contactLimits.email}
              type="email"
              autoComplete="email"
              inputMode="email"
              className="field"
              value={values.email}
              onChange={update}
              {...describe("email")}
            />
          </Field>
          <Field
            id="service_type"
            label="Waar gaat het om?"
            error={errors.service_type}
          >
            <select
              id="service_type"
              name="service_type"
              required
              className="field"
              value={values.service_type}
              onChange={update}
              {...describe("service_type")}
            >
              <option value="">Kies een dienst</option>
              <optgroup label="Disciplines">
                {disciplines.map((discipline) => (
                  <option key={discipline.id} value={discipline.name}>
                    {discipline.name}
                  </option>
                ))}
              </optgroup>
              {serviceCategories.map((category) => (
                <optgroup key={category.id} label={category.title}>
                  {category.services
                    .filter(
                      (service) =>
                        !disciplines.some(
                          (discipline) =>
                            discipline.name === serviceLabel(service, category),
                        ),
                    )
                    .map((service) => (
                      <option
                        key={service.id}
                        value={serviceLabel(service, category)}
                      >
                        {service.name}
                      </option>
                    ))}
                </optgroup>
              ))}
              <option value={OTHER}>{OTHER}</option>
            </select>
          </Field>
          <Field
            id="phone"
            label="Telefoon of WhatsApp"
            optional
            error={errors.phone}
          >
            <input
              id="phone"
              name="phone"
              maxLength={contactLimits.phone}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="field"
              value={values.phone}
              onChange={update}
              {...describe("phone")}
            />
          </Field>
        </div>

        <Field id="budget" label="Budget" optional>
          <select
            id="budget"
            name="budget"
            className="field"
            value={values.budget}
            onChange={update}
          >
            <option value="">Geen voorkeur</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Uw project" error={errors.message}>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={contactLimits.message}
            rows={5}
            className="field"
            placeholder="Wat voor bedrijf heeft u, en wat moet er gemaakt worden?"
            value={values.message}
            onChange={update}
            {...describe("message")}
          />
        </Field>

        {status === "failed" && (
          <p
            role="alert"
            className="border-l-2 border-danger pl-4 text-[0.9375rem]"
          >
            {failureMessage} U kunt ons ook bereiken met een{" "}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              WhatsApp-bericht
            </a>
            .
          </p>
        )}

        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Versturen…" : "Verstuur"}
            {status !== "sending" && <Arrow />}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
