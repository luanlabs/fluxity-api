import 'dotenv/config';
import { z } from 'zod';

/**
 * Stellar StrKey formats: secret seeds start with `S`, contract ids with `C`.
 * Both are 56-character base32 (RFC 4648 alphabet, no padding) strings.
 */
const STELLAR_SECRET_KEY = /^S[A-Z2-7]{55}$/;
const STELLAR_CONTRACT_ID = /^C[A-Z2-7]{55}$/;
const NUMERIC_STRING = /^\d+$/;

const emptyStringAsUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().max(65535).default(3000),

  // Database
  DB_URI: z.string().min(1, 'DB_URI is required'),
  DB_NAME: z.string().min(1, 'DB_NAME is required'),

  // Soroban / Stellar
  BASE_FEE: z.string().regex(NUMERIC_STRING, 'BASE_FEE must be a numeric string').default('100000'),
  ADMIN_SECRET_KEY: z
    .string()
    .regex(STELLAR_SECRET_KEY, 'ADMIN_SECRET_KEY must be a valid Stellar secret key'),
  TESTNET_SOROBAN_RPC_URL: z.url('TESTNET_SOROBAN_RPC_URL must be a valid URL'),
  MAINNET_SOROBAN_RPC_URL: z.preprocess(
    emptyStringAsUndefined,
    z.url('MAINNET_SOROBAN_RPC_URL must be a valid URL').optional(),
  ),
  TESTNET_CONTRACT_ID: z
    .string()
    .regex(STELLAR_CONTRACT_ID, 'TESTNET_CONTRACT_ID must be a valid contract id'),
  MAINNET_CONTRACT_ID: z.preprocess(
    emptyStringAsUndefined,
    z
      .string()
      .regex(STELLAR_CONTRACT_ID, 'MAINNET_CONTRACT_ID must be a valid contract id')
      .optional(),
  ),

  // Auth
  ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD is required'),

  // Logging
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent']).default('info'),
  LOG_FILE_PATH: z.string().optional(),

  // HTTP / CORS — comma-separated list of allowed origins, or `*` for any.
  CORS_ORIGIN: z.string().default('*'),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // The logger depends on this module, so fall back to console here to avoid a cycle.
  console.error('❌ Invalid environment configuration:\n');
  console.error(z.prettifyError(parsed.error));
  process.exit(1);
}

const env: Readonly<Env> = Object.freeze(parsed.data);

export const isMainnetEnabled = (): boolean =>
  Boolean(env.MAINNET_CONTRACT_ID && env.MAINNET_SOROBAN_RPC_URL);

if (!isMainnetEnabled()) {
  console.warn(
    'Mainnet support is disabled. Set both MAINNET_CONTRACT_ID and MAINNET_SOROBAN_RPC_URL to enable it.',
  );
}

/**
 * Returns the validated, immutable environment configuration.
 * Validation runs once at module load; this getter simply returns the cached result.
 */
const envs = (): Readonly<Env> => env;

export default envs;
