import z from "zod";

export const CreateArticleBody = z
  .object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    content: z.string().min(2).max(50),
    tags: z.array(z.string()),
  })
  .strict();

export type CreateArticleBodyType = z.TypeOf<typeof CreateArticleBody>;

export const UpdateArticleBody = z
  .object({
    title: z.string().min(2).max(50).optional(),
    description: z.string().min(2).max(50).optional(),
    content: z.string().min(2).max(50).optional(),
    tag: z.string().optional(),
  })
  .strict();

export type UpdateArticleBodyType = z.TypeOf<typeof UpdateArticleBody>;
