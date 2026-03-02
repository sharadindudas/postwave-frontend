import inkwaveLogoText from "@/assets/inkwave-logo-text.svg";
import { JOURNEY } from "@/data/onboarding";
import { cn } from "@/lib/utils";
import { StepOneSchema } from "@/schemas/onboarding";
import type { User } from "@/types/common";
import { showApiError } from "@/utils/common";
import { useForm } from "@tanstack/react-form";
import SectionWrapper from "@/components/common/section-wrapper";
import CustomButton from "@/components/common/custom-button";
import SubmitButton from "@/components/common/submit-button";

interface StepOneProps {
  journey: User["journey"];
}

export default function StepOne({ journey }: StepOneProps) {
  const form = useForm({
    defaultValues: {
      journey: journey ?? "beginner"
    } as StepOneSchema,
    validators: {
      onSubmit: StepOneSchema
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (err) {
        showApiError(err, "Failed to complete onboarding step one");
      }
    }
  });

  const handleSkip = () => {};

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

        <div className="flex items-center justify-end gap-3">
          <CustomButton
            type="button"
            variant="outline"
            onClick={handleSkip}
            children="Skip"
          />
          <form.Subscribe
            selector={(state) => [state.isValid, state.isSubmitting]}
            children={([isValid, isSubmitting]) => (
              <SubmitButton
                isValid={isValid}
                isSubmitting={isSubmitting}
                children="Get Started"
              />
            )}
          />
        </div>
      </form>
    </SectionWrapper>
  );
}
