import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface CustomCheckbox extends ComponentProps<typeof Checkbox> {}

export default function CustomCheckbox({ className, ...props }: CustomCheckbox) {
  return (
    <Checkbox
      className={cn(
        "data-[state=checked]:bg-cc-primary size-5 border border-cc-primary rounded-sm",
        className,
      )}
      {...props}
    />
  );
}
