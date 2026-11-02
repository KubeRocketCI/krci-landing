"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { addDays, addMonths, startOfDay } from "date-fns";
import { Clock, Info } from "lucide-react";
import { createContext, use, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  controlClass,
  Field,
  FieldError,
  FormAlert,
  FormBody,
  FormDialog,
  FormFooter,
  SecondaryButton,
  SubmitButton,
  SuccessPanel,
} from "@/components/FormDialog";
import { PrivacyConsent } from "@/components/PrivacyConsent";
import { sendDemoRequest } from "@/lib/actions/demo";
import { trackEvent } from "@/lib/analytics";
import type { FieldErrors } from "@/lib/form-errors";
import { useFormAction } from "@/lib/use-form-action";
import { cn } from "@/lib/utils";
import { DOCS_ABOUT_URL, withUtm } from "@/lib/utm";
import { demoFormSchema, isBusinessTime } from "@/lib/validations/demo";
import type { TranslationDemoForm } from "@/types/translations";

const FIRST_DAY_SEARCH_LIMIT = 31;
const DOCS_URL = withUtm(DOCS_ABOUT_URL, "demo_form");
const FIELDS = {
  email: "#demo-email",
  date: '#demo-date [role="gridcell"] button[tabindex="0"]',
  time: "#demo-time",
};

interface Slot {
  value: string;
  label: string;
}

function toLocalDateTime(date: Date, hour: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);
}

function isBusinessSlot(local: Date, now: Date) {
  return local.getTime() > now.getTime() && isBusinessTime(local);
}

function getSlotsForDate(date: Date, now: Date): Slot[] {
  const slots: Slot[] = [];
  for (let hour = 0; hour < 24; hour++) {
    if (isBusinessSlot(toLocalDateTime(date, hour), now)) {
      slots.push({
        value: String(hour),
        label: `${String(hour).padStart(2, "0")}:00`,
      });
    }
  }
  return slots;
}

// Cache is valid for one local clock hour; slots start on local whole hours.
const availability = { hour: -1, days: new Map<number, boolean>() };

function hasSlots(date: Date, now: Date) {
  const hour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
  ).getTime();
  if (availability.hour !== hour) {
    availability.hour = hour;
    availability.days.clear();
  }
  const key = startOfDay(date).getTime();
  let available = availability.days.get(key);
  if (available === undefined) {
    available = false;
    for (let slot = 0; slot < 24 && !available; slot++) {
      available = isBusinessSlot(toLocalDateTime(date, slot), now);
    }
    availability.days.set(key, available);
  }
  return available;
}

function firstAvailableDay(now: Date) {
  const today = startOfDay(now);
  for (let offset = 0; offset < FIRST_DAY_SEARCH_LIMIT; offset++) {
    const day = addDays(today, offset);
    if (hasSlots(day, now)) return day;
  }
  return today;
}

const DateErrorContext = createContext<string | undefined>(undefined);

function DateGrid(props: React.ComponentProps<"table">) {
  return <table {...props} aria-describedby={use(DateErrorContext)} />;
}

const DAY_PICKER_COMPONENTS = { MonthGrid: DateGrid };

function mapServerErrors({ datetime, ...rest }: FieldErrors): FieldErrors {
  return datetime ? { ...rest, time: datetime } : rest;
}

function formatLocalPreview(date: Date, hour: number) {
  return toLocalDateTime(date, hour).toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

interface RequestDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  translations: TranslationDemoForm;
  location: string;
  opener?: HTMLElement | null;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function RequestDemoModal({
  open,
  onOpenChange,
  translations,
  location,
  opener,
  returnFocusRef,
}: RequestDemoModalProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={translations.title}
      description={translations.description}
      closeLabel={translations.buttons.close}
      wide
      opener={opener}
      returnFocusRef={returnFocusRef}
    >
      <DemoForm
        translations={translations}
        location={location}
        onClose={() => onOpenChange(false)}
      />
    </FormDialog>
  );
}

interface DemoFormProps {
  translations: TranslationDemoForm;
  location: string;
  onClose: () => void;
}

function DemoForm({ translations, location, onClose }: DemoFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [userTimezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [defaultMonth] = useState(() => firstAvailableDay(new Date()));
  const {
    formRef,
    succeeded,
    pending,
    fieldErrors,
    formError,
    clearError,
    submit,
  } = useFormAction({
    action: sendDemoRequest,
    messages: translations.messages,
    fields: FIELDS,
    mapServerErrors,
    onSuccess: () => trackEvent("generate_lead", { form: "demo", location }),
  });

  const now = new Date();
  const today = startOfDay(now);
  const slots = selectedDate ? getSlotsForDate(selectedDate, now) : [];
  const time = slots.some((slot) => slot.value === selectedTime)
    ? selectedTime
    : "";
  const isDayUnavailable = (day: Date) => day < today || !hasSlots(day, now);

  const datetimeISO =
    selectedDate && time
      ? toLocalDateTime(selectedDate, Number.parseInt(time, 10)).toISOString()
      : "";
  const preview =
    selectedDate && time
      ? formatLocalPreview(selectedDate, Number.parseInt(time, 10))
      : null;

  if (succeeded) {
    return (
      <SuccessPanel
        title={translations.success.title}
        message={translations.messages.success}
        detailLabel={translations.success.bookedFor}
        detail={preview ?? undefined}
        docsHref={DOCS_URL}
        docsLabel={translations.success.docsLabel}
        closeLabel={translations.buttons.close}
        onClose={onClose}
      />
    );
  }

  const validate = (formData: FormData): FieldErrors => {
    const errors: FieldErrors = {};
    const email = String(formData.get("email") ?? "");
    const emailResult = demoFormSchema.shape.email.safeParse(email);
    if (!emailResult.success) {
      errors.email = email.trim()
        ? (emailResult.error.issues[0]?.message ?? "")
        : translations.messages.emailRequired;
    }
    if (!selectedDate) {
      errors.date = translations.messages.selectDate;
    } else if (slots.length === 0) {
      errors.date = translations.helper.noSlots;
    } else if (!time) {
      errors.time = translations.messages.selectTime;
    } else {
      const result = demoFormSchema.shape.datetime.safeParse(datetimeISO);
      if (!result.success) {
        errors.time =
          result.error.issues[0]?.message ??
          translations.messages.invalidBusinessHours;
      }
    }
    return errors;
  };

  return (
    <form
      ref={formRef}
      onSubmit={(event) => submit(event, validate)}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
    >
      <input type="hidden" name="datetime" value={datetimeISO} />

      <FormBody>
        <p className="flex items-start gap-2 text-(length:--font-size-body-2) text-neutral-10">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{translations.helper.businessHours}</span>
        </p>

        <FormAlert message={formError} />

        <Field
          id="demo-email"
          label={translations.fields.email.label}
          error={fieldErrors.email}
        >
          {(aria) => (
            <input
              {...aria}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={translations.fields.email.placeholder}
              className={controlClass}
              onChange={() => clearError("email")}
            />
          )}
        </Field>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <p
              id="demo-date-label"
              className="mb-2 text-(length:--font-size-body-2) font-medium"
            >
              {translations.fields.date.label}
            </p>
            <div
              className={cn(
                "flex justify-center rounded-[3px] border bg-neutral-90 py-2 sm:px-2",
                fieldErrors.date ? "border-error" : "border-neutral-70",
              )}
            >
              <DateErrorContext
                value={fieldErrors.date ? "demo-date-error" : undefined}
              >
                <DayPicker
                  id="demo-date"
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setSelectedTime("");
                    clearError("date", "time");
                  }}
                  disabled={isDayUnavailable}
                  defaultMonth={defaultMonth}
                  startMonth={now}
                  endMonth={addMonths(now, 6)}
                  aria-labelledby="demo-date-label"
                  components={DAY_PICKER_COMPONENTS}
                  className="rdp-custom"
                />
              </DateErrorContext>
            </div>
            <FieldError id="demo-date-error" message={fieldErrors.date} />
          </div>

          <Field
            id="demo-time"
            label={translations.fields.time.label}
            error={fieldErrors.time}
            hint={
              selectedDate
                ? `${translations.helper.slotsLabel} (${userTimezone})`
                : translations.helper.selectDateFirst
            }
          >
            {(aria) => (
              <select
                {...aria}
                value={time}
                onChange={(event) => {
                  setSelectedTime(event.target.value);
                  clearError("time");
                }}
                required
                disabled={!selectedDate || slots.length === 0}
                className={controlClass}
              >
                <option value="">
                  {selectedDate && slots.length === 0
                    ? translations.helper.noSlots
                    : translations.fields.time.placeholder}
                </option>
                {slots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>

        <div aria-live="polite">
          {preview ? (
            <div className="flex items-start gap-3 rounded-sm border border-neutral-70 bg-neutral-90 px-4 py-3">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
              <div>
                <p className="text-(length:--font-size-caption) text-neutral-20">
                  {translations.helper.selectedTime}
                </p>
                <p className="text-(length:--font-size-body) font-medium">
                  {preview}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <PrivacyConsent translations={translations.privacyConsent} />
      </FormBody>

      <FormFooter>
        <Dialog.Close asChild>
          <SecondaryButton>{translations.buttons.cancel}</SecondaryButton>
        </Dialog.Close>
        <SubmitButton
          label={translations.buttons.submit}
          pendingLabel={translations.buttons.submitting}
          pending={pending}
        />
      </FormFooter>
    </form>
  );
}
