import { PrismaClient } from "@prisma/client";

// @ts-ignore file missing on prod
import pokemonData from "../pokemon-data.json";
// @ts-ignore file missing on prod
import gameData from "../pokemon-games.json";

// @ts-ignore file missing in prod
import typeData from "../pokemon-types.json";

// @ts-ignore file missing in prod
import abilityData from "../pokemon-abilities.json";

// @ts-ignore file missing in prod
import regionData from "../pokemon-regions.json";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    abilityData.map(async (ability) => {
      console.log(`Creating ability: ${ability.name}`);
      await prisma.pokemonAbility.create({
        data: {
          id: ability.id,
          name: ability.name,
          desc: ability.effect,
        },
      });

      console.log(`Created ability: ${ability.name}`);
    })
  );
  await Promise.all(
    typeData.map(async (type) => {
      console.log(`Creating type: ${type.name}`);
      await prisma.pokemonType.create({
        data: {
          id: type.id,
          name: type.type,
          color: type.color,
        },
      });

      console.log(`Created type: ${type.name}`);
    })
  );
  await Promise.all(
    pokemonData.map(async (pokemon) => {
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
          types: {
            connect: pokemon.types.map((type) => ({ name: type })),
          },
          sprite: pokemon.sprite,
          abilities: {
            connect: pokemon.abilities.map((ability) => ({ name: ability })),
          },
          height: pokemon.height,
          weight: pokemon.weight,
        },
      });
      console.log(`Created pokemon: ${pokemon.name}`);
    })
  );

  await Promise.all(
    regionData.map(async (region) => {
      console.log(`Creating region: ${region.name}`);
      await prisma.region.create({
        data: {
          id: region.id,
          name: region.name,
        },
      });
      console.log(`Created region: ${region.name}`);
    })
  );

  await Promise.all(
    gameData.map(async (game) => {
      console.log(`Creating game: ${game.name}`);
      await prisma.game.create({
        data: {
          id: game.id,
          name: game.name,
          generation: game.generation,
          versionGroup: game.versionGroup,
          regions: {
            connect: game.regions.map((region) => ({ name: region })),
          },
        },
      });
      console.log(`Created game: ${game.name}`);
    })
  );
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
