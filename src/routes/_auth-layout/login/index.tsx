import inkwaveLogoText from "@/assets/inkwave-logo-text.svg";
import CustomFormField from "@/components/common/custom-form-field";
import CustomInputField from "@/components/common/custom-input-field";
import SubmitButton from "@/components/common/submit-button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas/auth";
import { showApiError } from "@/utils/common";
import { useForm, useStore } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_auth-layout/login/")({
  component: RouteComponent
});

function RouteComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    } as LoginSchema,
    validators: {
      onSubmit: LoginSchema
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "/dashboard"
        });
        if (error) {
          showApiError(error, "Login failed");
          return;
        }
        toast.success("Logged in");
        form.reset();
      } catch (err: any) {
        showApiError(err, "Login failed");
      }
    }
  });

  const password = useStore(form.store, (state) => state.values.password);

  return (
    <>
      <div className="space-y-3">
        <img
          src={inkwaveLogoText}
          alt="inkwave-logo"
          className="mb-10"
          loading="lazy"
        />
        <h3 className="text-3xl font-semibold text-cc-primary-2">Log In to Inkwave</h3>
        <p className="text-cc-primary-2-400 text-sm">Welcome back! Stay updated with the latest insights from our exclusive newsletter.</p>
      </div>
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
              children="Login"
            />
          )}
        />
        <div className="text-center font-medium text-sm mt-5">
          <Link
            to="/forgot-password"
            className="text-cc-primary underline">
            Forgot your password?
          </Link>
          <p className="space-x-2 mt-4">
            <span className="text-cc-primary-2-400">Don&apos;t have a Inkwave account?</span>
            <Link
              to="/signup"
              className="text-cc-primary underline">
              Create one
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

