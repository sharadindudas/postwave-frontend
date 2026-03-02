import toast from "react-hot-toast";

export const showApiError = (error: any, defaultMessage: string = "An unexpected error occurred") => {
  if (!error) return;

  console.error("Auth Error:", error);

  if (error.code) {
    switch (error.code) {
      case "USER_ALREADY_EXISTS":
        toast.error("Email already registered");
        return;
      case "EMAIL_NOT_VERIFIED":
        toast.error("Email not verified");
        return;
      case "INVALID_EMAIL_OR_PASSWORD":
        toast.error("Invalid email or password");
        return;
      case "TOO_MANY_ATTEMPTS":
        toast.error("Too many attempts. Try again later");
        return;
      case "USER_BANNED":
        toast.error("Account has been banned");
        return;
      case "INVALID_TOKEN":
        toast.error("Reset link invalid or expired");
        return;
      case "USER_NOT_FOUND":
        toast.error("No account found");
        return;
      case "SESSION_EXPIRED":
        toast.error("Session expired. Login again");
        return;
      default:
        toast.error(error.message ?? defaultMessage);
        return;
    }
  }

  if (error.message) {
    toast.error(error.message);
    return;
  }

  toast.error(defaultMessage);
};
