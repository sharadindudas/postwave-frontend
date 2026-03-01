import InkwaveLogoBigIcon from "@/assets/inkwave-logo-big";
import CustomFormField from "@/components/common/custom-form-field";
import CustomInputField from "@/components/common/custom-input-field";
import SubmitButton from "@/components/common/submit-button";
import { cn } from "@/lib/utils";
import { UpdatePasswordSchema } from "@/schemas/auth";
import { useForm, useStore } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_auth-layout/forgot-password/$token/")({
  component: RouteComponent
});

function RouteComponent() {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  const { token } = Route.useParams();
  console.log(token);

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: ""
    } as UpdatePasswordSchema,
    validators: {
      onSubmit: UpdatePasswordSchema
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (err: any) {
        toast.error(err.message ?? "Failed to update password");
      }
    }
  });

  const newPassword = useStore(form.store, (state) => state.values.newPassword);
  const confirmNewPassword = useStore(form.store, (state) => state.values.confirmNewPassword);

  return (
    <>
      <div>
        <InkwaveLogoBigIcon className="mb-10" />
        <h3 className="text-3xl font-semibold text-cc-primary-2 mb-2">Update Your Password</h3>
        <p className="text-cc-primary-2-400 text-sm">
          Create a new password for your account. Make sure it's strong and something you&apos;ll remember
        </p>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mt-10 mb-14 text-sm space-y-5">
        <form.Field name="newPassword">
          {(field) => (
            <CustomFormField
              label="New Password *"
              field={field}>
              <div className="relative">
                <CustomInputField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className={cn(
                    "pr-10",
                    !field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1 focus-visible:ring-0"
                  )}
                />
                {newPassword && (
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-4">
                    {showNewPassword ? <Eye className="size-4.5" /> : <EyeOff className="size-4.5" />}
                  </button>
                )}
              </div>
            </CustomFormField>
          )}
        </form.Field>
        <form.Field name="confirmNewPassword">
          {(field) => (
            <CustomFormField
              label="Confirm New Password *"
              field={field}>
              <div className="relative">
                <CustomInputField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showConfirmNewPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className={cn(
                    "pr-10",
                    !field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1 focus-visible:ring-0"
                  )}
                />
                {confirmNewPassword && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-4">
                    {showConfirmNewPassword ? <Eye className="size-4.5" /> : <EyeOff className="size-4.5" />}
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
              className="w-full"
              children="Update Password"
            />
          )}
        />
      </form>
    </>
  );
}

