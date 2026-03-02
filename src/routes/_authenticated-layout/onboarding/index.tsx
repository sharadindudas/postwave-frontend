import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated-layout/onboarding/")({
  beforeLoad: async ({ context }) => {
    if (context.user?.isOnboarded) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent
});

function RouteComponent() {
  const { user } = useAuth();
  return <div>Onboarding {user?.name}</div>;
}

