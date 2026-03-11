import { kyClient } from "@/lib/api-client";
import type { CreatePublicationSchema } from "@/schemas/publications";
import type { ApiResponse } from "@/types/common";
import { showApiError } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";

export function useCreatePublication() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreatePublicationSchema) => {
      return kyClient.post("publications", { json: payload }).json<ApiResponse>();
    },
    onSuccess: async (res) => {
      toast.success(res.message);
      await router.invalidate();
    },
    onError: (err) => {
      showApiError(err, "Failed to create publication");
    }
  });
}
