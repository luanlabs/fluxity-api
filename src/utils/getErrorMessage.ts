/**
 * Safely extracts a human-readable message from an unknown thrown value.
 * Handles `Error` instances, strings, and arbitrary objects without throwing.
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

export default getErrorMessage;
