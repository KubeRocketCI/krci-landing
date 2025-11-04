"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Clock, Info, X } from "lucide-react";
import { useActionState, useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { PrivacyConsent } from "@/components/PrivacyConsent";
import { sendDemoRequest } from "@/lib/actions/demo";
import { cn } from "@/lib/utils";
import type { TranslationDemoForm } from "@/types/translations";
import "react-day-picker/dist/style.css";

const BUSINESS_TIMEZONE = "Europe/Kyiv"; // Eastern European Time (EET/EEST, UTC+2/+3)
const BUSINESS_HOURS = { start: 10, end: 18 };

interface RequestDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  translations: TranslationDemoForm;
}

export function RequestDemoModal({
  open,
  onOpenChange,
  translations,
}: RequestDemoModalProps) {
  const [state, dispatch] = useActionState(sendDemoRequest, undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [userTimezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  useEffect(() => {
    if (!state) return;

    if ("data" in state) {
      toast.success(state.data);
      onOpenChange(false);
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime("");
    } else if ("error" in state) {
      toast.error(state.error);
    }
  }, [state, onOpenChange]);

  // Generate time slots in user's timezone that align with business hours (10:00-17:00)
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const slots: Array<{ value: string; label: string; businessHour: number }> =
      [];

    // Generate all possible hours in a day (0-23) in user's timezone
    for (let userHour = 0; userHour < 24; userHour++) {
      // Create a datetime in user's timezone
      const userDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        userHour,
        0,
        0,
      );

      // Convert to business timezone (EET) to check if it falls within business hours
      const businessDateTime = toZonedTime(userDateTime, BUSINESS_TIMEZONE);
      const businessHour = businessDateTime.getHours();
      const businessDay = businessDateTime.getDay();

      // Check if this time falls within business hours (10:00-17:00) and weekday
      if (
        businessHour >= BUSINESS_HOURS.start &&
        businessHour < BUSINESS_HOURS.end &&
        businessDay >= 1 &&
        businessDay <= 5
      ) {
        slots.push({
          value: userHour.toString(),
          label: `${userHour.toString().padStart(2, "0")}:00`,
          businessHour,
        });
      }
    }

    return slots;
  }, [selectedDate]);

  // Disable past dates only (we'll handle weekends through time slot availability)
  const disabledDays = [{ before: new Date() }];

  const handleSubmit = (formData: FormData) => {
    if (!selectedDate || !selectedTime) {
      toast.error(translations.messages.selectDateTime);
      return;
    }

    // Create date in user's local timezone
    const userDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      Number.parseInt(selectedTime, 10),
      0,
      0,
    );

    // Convert to UTC for storage
    const utcDateTime = new Date(userDateTime.toISOString());

    formData.set("datetime", utcDateTime.toISOString());
    dispatch(formData);
  };

  // Format selected time for display in user's timezone
  const getLocalTimePreview = () => {
    if (!selectedDate || !selectedTime) return null;

    // Create datetime in user's local timezone
    const userDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      Number.parseInt(selectedTime, 10),
      0,
      0,
    );

    // Format in user's timezone
    return userDateTime.toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 animate-in fade-in zoom-in">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              {translations.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-gray-600 mb-6">
            {translations.description}
          </Dialog.Description>

          {/* Business Hours Info */}
          <div className="mb-6 p-3 bg-blue-50 rounded-md flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-medium">{translations.helper.businessHours}</p>
            </div>
          </div>

          <form action={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {translations.fields.email.label}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={translations.fields.email.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.fields.date.label}{" "}
                  <span className="text-red-500">*</span>
                </div>
                <div className="border border-gray-300 rounded-md p-3">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
                    startMonth={addDays(new Date(), 1)}
                    className="rdp-custom"
                  />
                </div>
              </div>

              {/* Time Picker */}
              <div>
                <label
                  htmlFor="time-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {translations.fields.time.label}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-md p-3">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {selectedDate
                        ? `Available slots (${userTimezone})`
                        : "Select a date first"}
                    </span>
                  </div>
                  <select
                    id="time-select"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={!selectedDate || availableTimeSlots.length === 0}
                  >
                    <option value="">
                      {availableTimeSlots.length === 0
                        ? "No available slots for this date"
                        : translations.fields.time.placeholder}
                    </option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Selected DateTime Preview */}
            {selectedDate && selectedTime && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm font-medium text-green-900 mb-1">
                  {translations.helper.selectedTime}
                </p>
                <p className="text-base text-green-800 font-semibold">
                  {getLocalTimePreview()}
                </p>
              </div>
            )}

            <PrivacyConsent
              translations={translations.privacyConsent}
              className="mt-4"
            />

            <div className="flex gap-3 justify-end pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {translations.buttons.cancel}
                </button>
              </Dialog.Close>
              <SubmitButton translations={translations} />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SubmitButton({ translations }: { translations: TranslationDemoForm }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
        pending && "opacity-50 cursor-not-allowed",
      )}
    >
      {pending ? translations.buttons.submitting : translations.buttons.submit}
    </button>
  );
}
