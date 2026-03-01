import InkwaveLogoBigIcon from "@/assets/inkwave-logo-big";
import CustomFormField from "@/components/common/custom-form-field";
import CustomInputField from "@/components/common/custom-input-field";
import SubmitButton from "@/components/common/submit-button";
import { cn } from "@/lib/utils";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { useForm } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_auth-layout/forgot-password/")({
  component: RouteComponent
});

function RouteComponent() {
  const [isEmailSuccess, setIsEmailSuccess] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: ""
    } as ForgotPasswordSchema,
    validators: {
      onSubmit: ForgotPasswordSchema
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
        setIsEmailSuccess(true);
      } catch (err: any) {
        toast.error(err.message ?? "Failed to forgot password");
      }
    }
  });

  return (
    <>
      <div>
        <InkwaveLogoBigIcon className="mb-10" />
        {isEmailSuccess ? (
          <>
            <h3 className="text-3xl font-semibold text-cc-primary-2 mb-2">Email successfully sent !</h3>
            <p className="text-cc-primary-2-400 text-sm">
              We&apos;ve sent a reset link to your email. Please check your inbox and follow the instructions.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-semibold text-cc-primary-2 mb-2">Forgot password ?</h3>
            <p className="text-cc-primary-2-400 text-sm">
              Don&apos;t worry! It happens to the best of us. Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </>
        )}
      </div>

      {!isEmailSuccess && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-10 mb-14 text-sm space-y-5">
          <form.Field name="email">
            {(field) => (
              <CustomFormField
                label="Email *"
                field={field}>
                <CustomInputField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className={cn(!field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1")}
                />
              </CustomFormField>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.isValid, state.isSubmitting]}
            children={([isValid, isSubmitting]) => (
              <SubmitButton
                isValid={isValid}
                isSubmitting={isSubmitting}
                variant="pink"
                className="w-full mb-5"
                children="Send Reset Link"
              />
            )}
          />
          <p className="text-center text-sm text-cc-primary-2-400">
            Did you recall credentials?{" "}
            <Link
              from="/"
              to="/login"
              className="text-cc-primary-400 underline font-medium">
              Login
            </Link>{" "}
          </p>
        </form>
      )}
    </>
  );
}

