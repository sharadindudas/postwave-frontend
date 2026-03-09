function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}

export const OLTP_BASE_URL = requireEnv("VITE_OLTP_BASE_URL"),
  FRONTEND_URL = requireEnv("VITE_FRONTEND_URL");
