import { PrismaClient } from "@prisma/client";

import pokemonData from "../pokemon-data.json";
import gameData from "../pokemon-games.json";

const prisma = new PrismaClient();

async function main() {
  // create pokemon from json file
  for (const pokemon of pokemonData) {
    console.log(`Creating pokemon: ${pokemon.name}`);
    await prisma.pokemon.create({
      data: {
        id: pokemon.id,
        name: pokemon.name,
        baseAttack: pokemon.baseAttack,
        baseDefense: pokemon.baseDefense,
        baseHP: pokemon.baseHp,
        baseSpAttack: pokemon.baseSpAttack,
        baseSpDefense: pokemon.baseSpDefense,
        baseSpeed: pokemon.baseSpeed,
        types: pokemon.types,
        sprite: pokemon.sprite,
        abilities: pokemon.abilities,
        height: pokemon.height,
        weight: pokemon.weight,
      },
    });
  }

  // create games from json file
  for (const game of gameData) {
    console.log(`Creating game: ${game.name}`);
    await prisma.game.create({
      data: {
        id: game.id,
        name: game.name,
        generation: game.generation,
        versionGroup: game.versionGroup,
        regions: game.regions,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
