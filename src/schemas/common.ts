import * as v from "valibot";

export const nameSchema = v.pipe(
  v.string(),
  v.nonEmpty("Please provide a name"),
  v.trim(),
  v.minLength(2, "Name must be at least 2 characters long"),
  v.maxLength(50, "Name must not exceed 50 characters")
);

export const emailSchema = v.pipe(
  v.string(),
  v.nonEmpty("Please provide an email address"),
  v.trim(),
  v.minLength(5, "Email must be at least 5 characters long"),
  v.maxLength(254, "Email must not exceed 254 characters"),
  v.email("Please provide a valid email address"),
  v.regex(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    "Please provide a valid email address"
  ),
  v.transform((email) => email.toLowerCase()),
  v.check((email) => !/(10minutemail|guerrillamail|mailinator|tempmail)/.test(email), "Disposable email addresses are not allowed"),
  v.check((email) => !email.includes(".."), "Email cannot contain consecutive dots")
);

export const passwordSchema = v.pipe(
  v.string(),
  v.minLength(8, "Password must be at least 8 characters long"),
  v.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  )
);
