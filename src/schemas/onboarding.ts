import * as v from "valibot";

export const UpdateUserOnboardingSchema = v.object({
  isOnboarded: v.optional(v.boolean()),
  onboardingStep: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  journey: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
  platformsUsed: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
  source: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
  goals: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500))))
});
export type UpdateUserOnboardingSchema = v.InferInput<typeof UpdateUserOnboardingSchema>;

export const StepOneSchema = v.object({
  journey: v.pipe(v.string(), v.nonEmpty("Please provide a journey"))
});
export type StepOneSchema = v.InferInput<typeof StepOneSchema>;
