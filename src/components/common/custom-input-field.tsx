import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface CustomInputFieldProps extends ComponentProps<typeof Input> {}

export default function CustomInputField({ className, ...props }: CustomInputFieldProps) {
  return (
    <Input
      className={cn(
        "text-sm h-12 px-3 border bg-cc-neutral-100 border-cc-stroke-100 placeholder:text-cc-primary-2-300 focus-visible:ring-0",
        className
      )}
      autoComplete="on"
      {...props}
    />
  );
}
