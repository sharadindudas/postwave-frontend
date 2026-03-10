import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import StepOne from "./-components/step-one";
import StepTwo from "./-components/step-two";
import { useUpdateUserOnboarding } from "@/hooks/mutations/use-update-user-onboarding";

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
  const { mutateAsync } = useUpdateUserOnboarding();
  console.log("Onboarding details ====", user.onboardingStep, user.journey);

  const goToStep = async (step: number) => {
    await mutateAsync({ onboardingStep: step });
  };

  const handlePrevious = () => goToStep(user.onboardingStep - 1);
  const handleSkip = () => goToStep(user.onboardingStep + 1);

  const renderCurrentStep = () => {
    switch (user.onboardingStep) {
      case 1:
        return <StepOne journey={user.journey} />;
      case 2:
        return (
          <StepTwo
            onPrevious={handlePrevious}
            onSkip={handleSkip}
          />
        );
    }
  };

  return <div className="bg-cc-background-2 font-cc-inter min-h-screen flex flex-col items-center justify-center">{renderCurrentStep()}</div>;
}
