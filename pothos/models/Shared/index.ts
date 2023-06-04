import builder from "pothos/builder";

export const StringFilter = builder.prismaFilter("String", {
  name: "StringFilter",
  ops: ["contains", "equals", "startsWith", "not"],
});

export const PokemonFilter = builder.prismaWhere("Pokemon", {
  fields: () => ({
    name: StringFilter,
  }),
});

export const EncounterFilter = builder.prismaWhere("Encounter", {
  fields: () => ({
    nickname: StringFilter,
    location: StringFilter,
    pokemon: PokemonFilter,
  }),
});
