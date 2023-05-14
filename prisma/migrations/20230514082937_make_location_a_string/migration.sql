/*
  Warnings:

  - You are about to drop the column `locationId` on the `Encounter` table. All the data in the column will be lost.
  - Added the required column `location` to the `Encounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Encounter" DROP COLUMN "locationId",
ADD COLUMN     "location" TEXT NOT NULL;
