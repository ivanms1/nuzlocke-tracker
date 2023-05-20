const fs = require("fs");

const apiUrl = "https://pokeapi.co/api/v2/";

async function getGamesData() {
  const response = await fetch(`${apiUrl}version?limit=100000&offset=0`);
  const data = await response.json();

  const games = data.results.map((game) => ({
    name: game.name,
    url: game.url,
  }));

  return games;
}

async function getGameInfo(gameUrl) {
  const response = await fetch(gameUrl);
  const data = await response.json();

  const versionGroupResponse = await fetch(data.version_group.url);
  const versionGroupData = await versionGroupResponse.json();

  console.log("versionGroupResponse", versionGroupData);

  const gameInfo = {
    id: data.id,
    name: data.names?.find((n) => n.language.name === "en")?.name ?? data.name,
    generation: data.name,
    versionGroup: data.version_group?.name,
    regions: versionGroupData.regions.map((region) => region.name),
  };

  return gameInfo;
}

async function generateGamesJSON(fileName) {
  const gamesData = await getGamesData();

  const games = [];

  //   for (const gameData of gamesData) {
  //     const gameInfo = await getGameInfo(gameData.url);
  //     games.push(gameInfo);
  //   }

  await Promise.all(
    gamesData.map(async (game) => {
      console.log(game);
      const gameInfo = await getGameInfo(game.url);
      console.log(`Adding ${gameInfo.name} to the list...`);
      games.push(gameInfo);
    })
  );

  fs.writeFile(fileName, JSON.stringify(games), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`JSON file '${fileName}' generated successfully.`);
    }
  });
}

// Usage example: generate JSON file for Pokémon games
generateGamesJSON("pokemon-games.json");
