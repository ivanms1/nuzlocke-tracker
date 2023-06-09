-- CreateEnum
CREATE TYPE "NuzlockeType" AS ENUM ('NORMAL', 'CAGELOCKE', 'SOUL_LINK', 'CUSTOM');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ENCOUNTERED', 'IN_TEAM', 'IN_PC', 'DEAD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nuzlocke" (
    "id" TEXT NOT NULL,
    "type" "NuzlockeType" NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Nuzlocke_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NuzlockePokemon" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "types" INTEGER[],
    "status" "STATUS" NOT NULL,
    "nuzlockeId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "NuzlockePokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NuzlockePokemon_nuzlockeId_key" ON "NuzlockePokemon"("nuzlockeId");

-- AddForeignKey
ALTER TABLE "Nuzlocke" ADD CONSTRAINT "Nuzlocke_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NuzlockePokemon" ADD CONSTRAINT "NuzlockePokemon_nuzlockeId_fkey" FOREIGN KEY ("nuzlockeId") REFERENCES "Nuzlocke"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
