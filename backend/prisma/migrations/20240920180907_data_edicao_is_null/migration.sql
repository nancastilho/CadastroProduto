/*
  Warnings:

  - Added the required column `cargo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `nome` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `produto` MODIFY `dataEdicao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `cargo` VARCHAR(191) NOT NULL,
    ADD COLUMN `foto` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `nome` VARCHAR(191) NOT NULL;
