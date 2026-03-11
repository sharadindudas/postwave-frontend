import type { authClient } from "@/lib/auth-client";

export type Session = typeof authClient.$Infer.Session & {
  user: User;
};

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  imagePublicId?: string | null;
  isOnboarded: boolean;
  bio?: string | null;
  x?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  threads?: string | null;
  tiktok?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectOption {
  id: string;
  name: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
}
