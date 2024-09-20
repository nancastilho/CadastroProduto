/*
  Warnings:

  - You are about to drop the column `dataEdicao` on the `produto` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `dataEdicao`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
