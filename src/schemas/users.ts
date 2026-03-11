import * as v from "valibot";

const socialUrl = (label: string) => v.optional(v.nullable(v.pipe(v.string(), v.url(`Please provide a valid ${label} URL`))));

export const UpdateUserSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty("Please provide the name"), v.minLength(1), v.maxLength(100)),
    bio: v.optional(v.nullable(v.pipe(v.string(), v.maxLength(500)))),
    x: socialUrl("X"),
    facebook: socialUrl("Facebook"),
    linkedin: socialUrl("LinkedIn"),
    instagram: socialUrl("Instagram"),
    youtube: socialUrl("YouTube"),
    threads: socialUrl("Threads"),
    tiktok: socialUrl("TikTok")
  })
);
export type UpdateUserSchema = v.InferInput<typeof UpdateUserSchema>;
