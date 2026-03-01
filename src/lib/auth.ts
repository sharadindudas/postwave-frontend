import { env } from "@/config/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.oltpBaseUrl,
  basePath: "/api/v1/auth"
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
