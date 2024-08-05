// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as crypto from 'crypto'; // Để tạo hash cho session
const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: { name: 'user' },
  });

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: await hash('example', 10),
      bio: 'Administrator',
      role: { connect: { id: adminRole.id } },
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      username: 'user',
      password: await hash('example', 10),
      bio: 'Regular user',
      role: { connect: { id: userRole.id } },
    },
  });

  // Create an article
  const article = await prisma.article.create({
    data: {
      title: 'Sample Article',
      description: 'This is a sample article',
      content: 'Content of the sample article',
      authorId: admin.id,
      slug: 'sample-article',
    },
  });

  // Create tags
  const tag1 = await prisma.tag.create({
    data: { name: 'Tag1' },
  });

  const tag2 = await prisma.tag.create({
    data: { name: 'Tag2' },
  });

  // Connect tags to the article
  await prisma.article.update({
    where: { id: article.id },
    data: {
      tags: {
        connect: [{ id: tag1.id }, { id: tag2.id }],
      },
    },
  });

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      content: 'This is a comment on the sample article',
      authorId: regularUser.id,
      articleId: article.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: 'Another comment on the sample article',
      authorId: admin.id,
      articleId: article.id,
    },
  });

  // Create followers
  await prisma.follower.create({
    data: {
      followerId: regularUser.id,
      followingId: admin.id,
    },
  });

  await prisma.follower.create({
    data: {
      followerId: admin.id,
      followingId: regularUser.id,
    },
  });

  // Create favorites
  await prisma.article.update({
    where: { id: article.id },
    data: {
      favoritedBy: {
        connect: [{ id: regularUser.id }, { id: admin.id }],
      },
    },
  });

  // Create sessions
  const createSession = async (userId: number) => {
    const hash = crypto.randomBytes(64).toString('hex'); // Generate a random hash for session

    await prisma.session.create({
      data: {
        userId,
        hash,
      },
    });
  };

  await createSession(admin.id);
  await createSession(regularUser.id);

  console.log('Seed data has been added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
