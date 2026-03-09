import { OLTP_BASE_URL } from "@/config";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: OLTP_BASE_URL,
  basePath: "/api/v1/auth"
});
