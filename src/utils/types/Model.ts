// import { Prisma, User } from '@prisma/client';

// export type Models = {
//   User: {
//     model: User;
//     where: Prisma.UserWhereInput;
//     // other user related types
//   };
// };

// import * as p from '@prisma/client';

// type ModelDelegates = {
//   [K in p.Prisma.ModelName]: p.PrismaClient[Uncapitalize<K>];
// };

// type WhereInput<T> =
//   T extends Model<Record<string, unknown>, p.Prisma.ModelName>
//     ? Exclude<
//         Parameters<ModelDelegates[T['kind']]['findFirst']>[0],
//         undefined | null
//       >['where']
//     : never;

// type Model<T extends Record<string, unknown>, TName extends string> = T & {
//   kind: TName;
// };
