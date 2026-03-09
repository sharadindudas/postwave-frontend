import { kyClient } from "@/lib/api-client";
import type { UpdateUserOnboardingSchema } from "@/schemas/onboarding";
import type { ApiResponse, User } from "@/types/common";

export const usersService = {
  getMe: () => {
    kyClient.get("/users/me").json<ApiResponse<User>>();
  },
  updateUserOnboarding: (payload: UpdateUserOnboardingSchema) => {
    kyClient.patch("/users/me/onboarding", { json: payload }).json<ApiResponse<User>>();
  }
};
