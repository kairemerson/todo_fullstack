/*
  Warnings:

  - Added the required column `authorEmail` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` ADD COLUMN `authorEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `todo` ADD CONSTRAINT `todo_authorEmail_fkey` FOREIGN KEY (`authorEmail`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
