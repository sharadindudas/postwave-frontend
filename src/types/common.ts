import type { authClient } from "@/lib/auth-client";

type Session = typeof authClient.$Infer.Session & {
  user: User;
};

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  isOnboarded: boolean;
  onboardingStep: number;
  journey?: string | null;
  platformsUsed?: string | null;
  source?: string | null;
  goals?: string | null;
  bio?: string | null;
  imagePublicId?: string | null;
  x?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  threads?: string | null;
  tiktok?: string | null;
}

export interface RouterContext {
  user: Session["user"] | null;
}
