import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import StepOne from "./-components/step-one";
import StepThree from "./-components/step-three";
import StepTwo from "./-components/step-two";

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

  const currentStep = user.onboardingStep;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne journey={user.journey} />;
      case 2:
        return <StepTwo platformsUsed={user.platformsUsed} />;
      case 3:
        return <StepThree />;
    }
  };

  return <div className="bg-cc-background-2 font-cc-inter min-h-screen flex flex-col items-center justify-center">{renderCurrentStep()}</div>;
}
