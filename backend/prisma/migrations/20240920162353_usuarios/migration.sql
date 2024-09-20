-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `identificacao` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nomeUsuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_identificacao_key`(`identificacao`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
