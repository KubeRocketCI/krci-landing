"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type ActionMessages,
  type FieldErrors,
  type FormState,
  guardAction,
  hasFieldErrors,
  type ServerAction,
} from "@/lib/form-errors";

interface UseFormActionOptions {
  action: ServerAction;
  messages: ActionMessages;
  onSuccess: () => void;
  // Field key to focus selector, in DOM order. Server errors for other keys show in the form alert.
  fields: Record<string, string>;
  mapServerErrors?: (errors: FieldErrors) => FieldErrors;
}

function pickServerErrors(
  state: FormState,
  fields: Record<string, string>,
  mapServerErrors?: (errors: FieldErrors) => FieldErrors,
): FieldErrors {
  if (!state || !("error" in state) || !state.fieldErrors) return {};
  const mapped = mapServerErrors?.(state.fieldErrors) ?? state.fieldErrors;
  return Object.fromEntries(
    Object.entries(mapped).filter(([key]) => key in fields),
  );
}

function focusFirstError(
  form: HTMLFormElement | null,
  fields: Record<string, string>,
  errors: FieldErrors,
) {
  const key = Object.keys(fields).find((field) => errors[field]);
  if (!key) return;
  form?.querySelector<HTMLElement>(fields[key])?.focus();
}

// Dispatches manually; React does not reset the form.
export function useFormAction({
  action,
  messages,
  onSuccess,
  fields,
  mapServerErrors,
}: UseFormActionOptions) {
  const formRef = useRef<HTMLFormElement>(null);
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  });

  const guarded = useMemo(
    () =>
      guardAction(
        action,
        {
          networkError: messages.networkError,
          unexpectedError: messages.unexpectedError,
        },
        () => onSuccessRef.current(),
      ),
    [action, messages.networkError, messages.unexpectedError],
  );
  const [state, dispatch, pending] = useActionState(guarded, undefined);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [serverErrors, setServerErrors] = useState<FieldErrors>();
  const [shownState, setShownState] = useState(state);
  if (state !== shownState) {
    setShownState(state);
    const errors = pickServerErrors(state, fields, mapServerErrors);
    setFieldErrors(errors);
    setServerErrors(errors);
    setFormError(
      state && "error" in state && !hasFieldErrors(errors)
        ? state.error
        : undefined,
    );
  }

  useEffect(() => {
    if (serverErrors) focusFirstError(formRef.current, fields, serverErrors);
  }, [serverErrors, fields]);

  const clearError = (...keys: string[]) =>
    setFieldErrors((current) => {
      if (!keys.some((key) => key in current)) return current;
      const next = { ...current };
      for (const key of keys) delete next[key];
      return next;
    });

  const submit = (
    event: React.FormEvent<HTMLFormElement>,
    validate: (formData: FormData) => FieldErrors,
  ) => {
    event.preventDefault();
    // Submit stays focusable while pending; repeat submits are dropped here.
    if (pending) return;
    setFormError(undefined);
    const formData = new FormData(event.currentTarget);
    const errors = validate(formData);
    setFieldErrors(errors);
    if (hasFieldErrors(errors)) {
      focusFirstError(event.currentTarget, fields, errors);
      return;
    }
    startTransition(() => dispatch(formData));
  };

  return {
    formRef,
    succeeded: state !== undefined && "success" in state,
    pending,
    fieldErrors,
    formError,
    clearError,
    submit,
  };
}
