import inkwaveLogoText from "@/assets/inkwave-logo-text.svg";
import CustomButton from "@/components/common/custom-button";
import SectionWrapper from "@/components/common/section-wrapper";
import SubmitButton from "@/components/common/submit-button";
import { PLATFORMS_USED } from "@/data/onboarding";
import { cn } from "@/lib/utils";
import { StepTwoSchema } from "@/schemas/onboarding";
import { showApiError } from "@/utils/common";
import { useForm } from "@tanstack/react-form";
import { MousePointerClick } from "lucide-react";

interface StepTwoProps {
  onPrevious: () => void;
  onSkip: () => void;
}

export default function StepTwo({ onPrevious, onSkip }: StepTwoProps) {
  const form = useForm({
    defaultValues: {
      platforms: []
    } as StepTwoSchema,
    validators: {
      onSubmit: StepTwoSchema
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (err) {
        showApiError(err, "Failed to complete onboarding step two");
      }
    }
  });

  const togglePlatform = (platformName: string) => {
    form.setFieldValue("platforms", (prev) => (prev.includes(platformName) ? prev.filter((name) => name !== platformName) : [...prev, platformName]));
  };

  return (
    <SectionWrapper className="max-w-3xl">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
        <div>
          <img
            src={inkwaveLogoText}
            alt="inkwave-logo"
            className="mx-auto"
          />
          <h3 className="common-heading">Which platforms have you used before?</h3>
          <p className="common-paragraph">This helps us understand your experience and tailor our support to what you're familiar with.</p>
        </div>

        <div className="space-y-5 mt-10 mb-7">
          <form.Field name="platforms">
            {(field) => (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  {PLATFORMS_USED.map((platform) => (
                    <button
                      type="button"
                      key={platform.id}
                      onClick={() => togglePlatform(platform.name)}
                      className={cn(
                        "h-10 px-3 border-2 transition-all duration-200 text-sm font-medium relative rounded-sm",
                        field.state.value.includes(platform.name)
                          ? "bg-cc-accent-300 text-cc-neutral-100 border-cc-accent-400"
                          : "bg-cc-neutral-100 border-cc-stroke-100"
                      )}>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-center font-medium">{platform.name}</span>
                        {platform.isPopular && (
                          <div className="bg-cc-background-4 text-cc-accent-400 size-7 flex items-center justify-center rounded-sm">
                            <MousePointerClick className="size-4.5" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {!field.state.meta.isValid && <div className="mt-1 text-sm text-cc-alert-1">{field.state.meta.errors[0]?.message}</div>}
              </>
            )}
          </form.Field>
        </div>

        <div className="flex justify-between gap-3">
          <CustomButton
            children="Previous"
            onClick={onPrevious}
          />
          <div className="space-x-4">
            <CustomButton
              variant="outline"
              children="Skip"
              onClick={onSkip}
            />
            <form.Subscribe
              selector={(state) => [state.isValid, state.isSubmitting]}
              children={([isValid, isSubmitting]) => (
                <SubmitButton
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  children="Continue"
                />
              )}
            />
          </div>
        </div>
      </form>
    </SectionWrapper>
  );
}
