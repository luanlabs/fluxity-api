import { StrKey } from '@stellar/stellar-sdk';

/** A Stellar account public key (starts with `G`). */
export const isValidPublicKey = (value: unknown): value is string =>
  typeof value === 'string' && StrKey.isValidEd25519PublicKey(value);

/** A Soroban contract / token address (starts with `C`). */
export const isValidContractAddress = (value: unknown): value is string =>
  typeof value === 'string' && StrKey.isValidContract(value);

/**
 * A lockup id: a non-negative integer expressed as a string or number.
 * Returns the normalized string form, or `null` when invalid.
 */
export const normalizeLockupId = (value: unknown): string | null => {
  if (typeof value === 'number' && Number.isInteger(value) && value >= 0) {
    return String(value);
  }

  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return value;
  }

  return null;
};
