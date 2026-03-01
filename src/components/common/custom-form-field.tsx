import type { AnyFieldApi } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface CustomFormFieldProps {
  field: AnyFieldApi;
  label?: React.ReactNode;
  showLabel?: boolean;
  labelClassName?: ComponentProps<typeof Label>["className"];
  className?: ComponentProps<"div">["className"];
  children?: React.ReactNode;
}

export default function CustomFormField({
  field,
  label,
  showLabel = true,
  labelClassName = "",
  className = "",
  children,
}: CustomFormFieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {showLabel && (
        <Label
          htmlFor={field.name}
          className={cn(
            "text-cc-primary-2-600 font-semibold",
            !field.state.meta.isValid && "text-alert-1",
            labelClassName,
          )}
        >
          {label}
        </Label>
      )}
      {children}
      {!field.state.meta.isValid && (
        <div className="-mt-1.5 text-sm text-cc-alert-1">{field.state.meta.errors[0]?.message}</div>
      )}
    </div>
  );
}
