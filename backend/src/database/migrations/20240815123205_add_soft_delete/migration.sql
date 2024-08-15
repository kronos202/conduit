-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "deletedAt" TIMESTAMP(3) DEFAULT null;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3) DEFAULT null;
