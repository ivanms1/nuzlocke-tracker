const fs = require("fs");

const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemonData(pokemonId) {
  const response = await fetch(`${apiUrl}${pokemonId}`);
  const data = await response.json();

  const pokemon = {
    name: data.name,
    types: data.types.map((type) => type.type.name),
    baseHp: data.stats[0].base_stat,
    sprite: data.sprites.front_default,
    baseAttack: data.stats[1].base_stat,
    baseDefense: data.stats[2].base_stat,
    baseSpAttack: data.stats[3].base_stat,
    baseSpDefense: data.stats[4].base_stat,
    baseSpeed: data.stats[5].base_stat,
    weight: data.weight,
    height: data.height,
    id: data.id,
    abilities: data.abilities.map((ability) => ability.ability.name),
  };

  return pokemon;
}

async function generatePokemonJSON(startId, endId, fileName) {
  const pokemons = [];

  await Promise.all(
    Array.from({ length: endId - startId + 1 }, (_, i) => i + startId).map(
      async (pokemonId) => {
        const pokemon = await getPokemonData(pokemonId);
        console.log("created", pokemon.name);
        pokemons.push(pokemon);
        return pokemon;
      }
    )
  );

  fs.writeFile(fileName, JSON.stringify(pokemons), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`JSON file '${fileName}' generated successfully.`);
    }
  });
}

// Usage example: generate JSON file for Pokémon IDs 1 to 10
generatePokemonJSON(1, 1010, "pokemon-data.json");
