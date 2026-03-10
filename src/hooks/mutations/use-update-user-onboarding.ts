import { kyClient } from "@/lib/api-client";
import type { UpdateUserOnboardingSchema } from "@/schemas/onboarding";
import type { ApiResponse, User } from "@/types/common";
import { showApiError } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useUpdateUserOnboarding() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: UpdateUserOnboardingSchema) => {
      return kyClient.patch("users/me/onboarding", { json: payload }).json<ApiResponse<User>>();
    },
    onSuccess: async () => {
      await router.invalidate();
    },
    onError: (err) => {
      showApiError(err, "Failed to update onboarding");
    }
  });
}
