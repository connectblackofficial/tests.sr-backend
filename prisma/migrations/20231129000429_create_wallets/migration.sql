-- CreateTable
CREATE TABLE `wallets` (
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `ballance` DOUBLE NOT NULL,

    UNIQUE INDEX `wallets_name_userId_key`(`name`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
