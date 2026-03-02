import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import StepOne from "./-components/step-one";

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

  return (
    <div className="bg-cc-background-2 font-cc-inter min-h-screen flex flex-col items-center justify-center">
      <StepOne journey={user?.journey} />
    </div>
  );
}

