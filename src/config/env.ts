function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}

export const env = {
  oltpBaseUrl: requireEnv("VITE_OLTP_BASE_URL"),
  frontendUrl: requireEnv("VITE_FRONTEND_URL")
} as const;
