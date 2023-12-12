/*
  Warnings:

  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_post_id_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "file";
