import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Roles
  const adminRole = await prisma.role.create({
    data: { name: 'admin' },
  });

  const userRole = await prisma.role.create({
    data: { name: 'user' },
  });

  // Users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      username: 'user1',
      password: 'hashedpassword1',
      bio: 'Bio of user 1',
      active: true,
      role: { connect: { id: userRole.id } },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      username: 'user2',
      password: 'hashedpassword2',
      bio: 'Bio of user 2',
      active: true,
      role: { connect: { id: adminRole.id } },
    },
  });

  // Follower
  await prisma.follower.create({
    data: {
      followerId: user1.id,
      followingId: user2.id,
    },
  });

  // Tags
  const tagTech = await prisma.tag.create({
    data: { name: 'tech' },
  });

  const tagLife = await prisma.tag.create({
    data: { name: 'lifestyle' },
  });

  // Articles
  const article1 = await prisma.article.create({
    data: {
      title: 'First Article',
      description: 'An intro article',
      content: 'Hello world!',
      slug: 'first-article',
      authorId: user1.id,
      tags: {
        connect: [{ id: tagTech.id }],
      },
      favoritedBy: {
        connect: [{ id: user2.id }],
      },
    },
  });

  // Comment
  await prisma.comment.create({
    data: {
      content: 'Nice article!',
      articleId: article1.id,
      authorId: user2.id,
    },
  });

  // Session
  await prisma.session.create({
    data: {
      userId: user1.id,
      hash: 'somehashvalue',
    },
  });

  console.log('🌱 Seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
