import z from "zod";

export const LoginBody = z
  .object({
    email: z.string().email().min(8),
    password: z.string().min(8),
  })
  .strict();
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginGoogleBody = z
  .object({
    idToken: z.string(),
  })
  .strict();

export type LoginGoogleBodyType = z.TypeOf<typeof LoginGoogleBody>;

export const RegisterBody = LoginBody.extend({
  email: z.string().email().min(8),
  password: z.string().min(8),
}).strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const EditProfileBody = LoginBody.extend({
  username: z.string().min(8).optional(),
  bio: z.string().optional(),
}).strict();

export type EditProfileBodyType = z.TypeOf<typeof EditProfileBody>;
