const fs = require("fs");

const apiUrl = "https://pokeapi.co/api/v2/";

async function getAbilitiesData() {
  const response = await fetch(`${apiUrl}ability?limit=100000&offset=0`);
  const data = await response.json();

  const abilities = data.results.map((ability) => ({
    name: ability.name,
    url: ability.url,
  }));

  return abilities;
}

async function getAbilityInfo(abilityUrl) {
  const response = await fetch(abilityUrl);
  const data = await response.json();

  const abilityInfo = {
    id: data.id,
    label: data.names?.find((n) => n.language.name === "en")?.name ?? data.name,
    name: data.name,
    effect:
      data.effect_entries?.find((e) => e.language.name === "en")?.effect ??
      "No effect",
  };

  return abilityInfo;
}

async function generateAbilitiesJSON(fileName) {
  const abilitiesData = await getAbilitiesData();

  const abilities = [];

  await Promise.all(
    abilitiesData.map(async (ability) => {
      console.log(ability);
      const abilityInfo = await getAbilityInfo(ability.url);
      console.log(`Adding ${abilityInfo.name} to the list...`);
      abilities.push(abilityInfo);
    })
  );

  fs.writeFile(fileName, JSON.stringify(abilities), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`JSON file '${fileName}' generated successfully.`);
    }
  });
}

generateAbilitiesJSON("pokemon-abilities.json");
