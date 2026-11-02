export type FieldErrors = Record<string, string>;

export type FormState =
  | { error: string; fieldErrors?: FieldErrors }
  | { success: true }
  | undefined;

interface Issue {
  path: PropertyKey[];
  message: string;
}

export function toFieldErrors(issues: Issue[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !(key in errors)) {
      errors[key] = issue.message;
    }
  }
  return errors;
}

export function hasFieldErrors(errors: FieldErrors | undefined) {
  return errors !== undefined && Object.keys(errors).length > 0;
}

export type ServerAction = (
  prevState: FormState,
  formData: FormData,
) => Promise<FormState>;

export interface ActionMessages {
  networkError: string;
  unexpectedError: string;
}

// onSuccess runs inside the action and fires after unmount. Its errors never change the result.
// TypeError means the request did not reach the server.
export function guardAction(
  action: ServerAction,
  messages: ActionMessages,
  onSuccess?: () => void,
): ServerAction {
  return async (prevState, formData) => {
    let result: FormState;
    try {
      result = await action(prevState, formData);
    } catch (error) {
      console.error("Form action failed:", error);
      return {
        error:
          error instanceof TypeError
            ? messages.networkError
            : messages.unexpectedError,
      };
    }
    if (result && "success" in result) {
      try {
        onSuccess?.();
      } catch (error) {
        console.error("Form success callback failed:", error);
      }
    }
    return result;
  };
}
