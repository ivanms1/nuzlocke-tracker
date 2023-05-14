/*
  Warnings:

  - The values [DEAD] on the enum `STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `types` on the `Encounter` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "STATUS_new" AS ENUM ('SEEN', 'IN_TEAM', 'IN_PC', 'FAINTED');
ALTER TABLE "Encounter" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TYPE "STATUS" RENAME TO "STATUS_old";
ALTER TYPE "STATUS_new" RENAME TO "STATUS";
DROP TYPE "STATUS_old";
COMMIT;

-- AlterTable
ALTER TABLE "Encounter" DROP COLUMN "types";
