import inkwaveLogoText from "@/assets/inkwave-logo-text.svg";
import CustomCheckbox from "@/components/common/custom-checkbox";
import CustomFormField from "@/components/common/custom-form-field";
import CustomInputField from "@/components/common/custom-input-field";
import SubmitButton from "@/components/common/submit-button";
import { env } from "@/config/env";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { SignupSchema } from "@/schemas/auth";
import { showApiError } from "@/utils/common";
import { useForm, useStore } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_auth-layout/signup/")({
  component: RouteComponent
});

function RouteComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    } as SignupSchema,
    validators: {
      onSubmit: SignupSchema
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          callbackURL: `${env.frontendUrl}/login`
        });

        if (error) {
          showApiError(error, "Registration failed");
          return;
        }

        toast.success("Check your email to verify");
        form.reset();
      } catch (err: any) {
        showApiError(err, "Registration failed");
      }
    }
  });

  const password = useStore(form.store, (state) => state.values.password);

  return (
    <>
      <div className="space-y-2">
        <img
          src={inkwaveLogoText}
          alt="inkwave-logo"
          className="mb-10"
          loading="lazy"
        />
        <h3 className="text-3xl font-semibold text-cc-primary-2">Let's get started with Launch ✨</h3>
        <p className="text-cc-primary-2-400 text-sm">One-time phone verification via SMS is required for signup. Msg and data rates may apply.</p>
      </div>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mt-10 mb-14 text-sm space-y-5">
        <form.Field name="name">
          {(field) => (
            <CustomFormField
              label="Name *"
              field={field}>
              <CustomInputField
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                placeholder="Name"
                className={cn(!field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1 focus-visible:ring-0")}
              />
            </CustomFormField>
          )}
        </form.Field>
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
                className={cn(!field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1 focus-visible:ring-0")}
              />
            </CustomFormField>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <CustomFormField
              label="Password *"
              field={field}>
              <div className="relative">
                <CustomInputField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={cn(
                    "pr-10",
                    !field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1 focus-visible:ring-0"
                  )}
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-4">
                    {showPassword ? <Eye className="size-4.5" /> : <EyeOff className="size-4.5" />}
                  </button>
                )}
              </div>
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
              className="w-full mb-4"
              children="Get Started"
            />
          )}
        />
        <div className="text-center font-medium text-sm">
          <p className="space-x-2 mt-4">
            <span className="text-cc-primary-2-400">Already have an account?</span>
            <Link
              to="/login"
              className="text-cc-primary underline">
              Login
            </Link>
          </p>
          <div className="flex justify-center items-center space-x-2 my-6.5">
            <CustomCheckbox
              id="receive-updates"
              defaultChecked
            />
            <label
              htmlFor="receive-updates"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-cc-primary-2-400">
              I want to receive updates about Inkwave
            </label>
          </div>
          <p>
            By signing up you consent to our <span className="text-cc-primary font-semibold cursor-pointer">Terms and Conditions</span> and{" "}
            <span className="text-cc-primary font-semibold cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </form>
    </>
  );
}

