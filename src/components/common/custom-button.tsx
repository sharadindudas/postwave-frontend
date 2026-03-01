import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

export interface CustomButtonProps extends ComponentProps<"button"> {
  type?: ButtonProps["type"];
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  Icon?: LucideIcon;
  iconClassName?: string;
  iconPosition?: "left" | "right";
}

export default function CustomButton({
  className,
  Icon,
  iconClassName,
  iconPosition = "left",
  variant = "default",
  children,
  type = "button",
  size = "xxl",
  disabled = false,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      className={className}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className={cn("size-5", iconClassName)} />}
      {children}
      {Icon && iconPosition === "right" && <Icon className={cn("size-5", iconClassName)} />}
    </Button>
  );
}
