import { kyClient } from "@/lib/api-client";
import type { UpdateUserSchema } from "@/schemas/users";
import type { ApiResponse } from "@/types/common";
import { showApiError } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useUpdateUser() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: UpdateUserSchema) => {
      return kyClient.patch("users/me", { json: payload }).json<ApiResponse>();
    },
    onSuccess: async () => {
      await router.invalidate();
    },
    onError: (err) => {
      showApiError(err, "Failed to update user details");
    }
  });
}
