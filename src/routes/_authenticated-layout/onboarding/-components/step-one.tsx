import inkwaveLogoText from "@/assets/inkwave-logo-text.svg";
import SectionWrapper from "@/components/common/section-wrapper";
import SubmitButton from "@/components/common/submit-button";
import { JOURNEY } from "@/data/onboarding";
import { useUpdateUserOnboarding } from "@/hooks/mutations/use-update-user-onboarding";
import { cn } from "@/lib/utils";
import { StepOneSchema } from "@/schemas/onboarding";
import type { User } from "@/types/common";
import { showApiError } from "@/utils/common";
import { useForm } from "@tanstack/react-form";

interface StepOneProps {
  journey: User["journey"];
}

export default function StepOne({ journey }: StepOneProps) {
  const { mutateAsync } = useUpdateUserOnboarding();

  const form = useForm({
    defaultValues: {
      journey: journey ?? "beginner"
    } as StepOneSchema,
    validators: {
      onSubmit: StepOneSchema
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ ...value, onboardingStep: value.journey === "experienced" ? 2 : 3 });
      } catch (err) {
        showApiError(err, "Failed to complete onboarding");
      }
    }
  });

  return (
    <SectionWrapper className="max-w-3xl">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-7">
        <img
          src={inkwaveLogoText}
          alt="inkwave-logo"
          className="mx-auto"
        />
        <div className="space-y-1">
          <h3 className="common-heading">Where are you on your newsletter journey?</h3>
          <p className="common-paragraph">Your answer helps us guide you with the right tools and support.</p>
        </div>

        <form.Field name="journey">
          {(field) => (
            <div className="space-y-5">
              {JOURNEY.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onBlur={field.handleBlur}
                  onClick={() => field.handleChange(option.id)}
                  className={cn(
                    "flex justify-between items-center rounded-xl border bg-cc-background-2 p-6 w-full",
                    field.state.value === option.id ? "border-cc-primary-2" : "border-cc-stroke-100"
                  )}>
                  <div className="text-left">
                    <h4 className="text-cc-primary-2-800 font-semibold mb-1">{option.name}</h4>
                    <p className="text-cc-primary-2-600 text-sm font-normal">{option.description}</p>
                  </div>
                  <img
                    src={option.icon}
                    alt={`${option.id}-icon`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.isValid, state.isSubmitting]}
          children={([isValid, isSubmitting]) => (
            <SubmitButton
              isValid={isValid}
              isSubmitting={isSubmitting}
              className="w-full"
              children="Get Started"
            />
          )}
        />
      </form>
    </SectionWrapper>
  );
}
