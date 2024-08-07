import z from "zod";

export const LoginBody = z
  .object({
    email: z.string().email().min(8),
    password: z.string().min(8),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const RegisterBody = z
  .object({
    email: z.string().email().min(8),
    password: z.string().min(8),
    username: z.string().min(8),
    avatar: z.string().optional(),
  })
  .strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
