/*
  Warnings:

  - You are about to drop the `NuzlockePokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NuzlockePokemon" DROP CONSTRAINT "NuzlockePokemon_nuzlockeId_fkey";

-- DropTable
DROP TABLE "NuzlockePokemon";

-- CreateTable
CREATE TABLE "Encounter" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "types" INTEGER[],
    "status" "STATUS" NOT NULL,
    "nuzlockeId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_nuzlockeId_key" ON "Encounter"("nuzlockeId");

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_nuzlockeId_fkey" FOREIGN KEY ("nuzlockeId") REFERENCES "Nuzlocke"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
