import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  isValid: boolean;
  isSubmitting: boolean;
  loadingText?: string;
}

const SubmitButton = ({
  className,
  variant = "default",
  size = "xxl",
  isValid,
  isSubmitting,
  children,
  loadingText = "Submitting...",
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      disabled={!isValid || isSubmitting}
      className={className}
      type="submit">
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
