import builder from "pothos/builder";
import db from "pothos/db";

export const STATUS = builder.enumType("STATUS", {
  values: ["ENCOUNTERED", "IN_TEAM", "IN_PC", "DEAD"] as const,
  description: "Pokemon status",
});

builder.prismaObject("NuzlockePokemon", {
  name: "NuzlockePokemon",
  fields: (t) => ({
    id: t.exposeID("id"),
    nickname: t.exposeString("nickname"),
    types: t.exposeIntList("types"),
    pokemonId: t.exposeInt("pokemonId"),
    nuzlocke: t.relation("nuzlocke"),
    status: t.expose("status", { type: STATUS }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    locationId: t.exposeInt("locationId"),
  }),
});

builder.queryFields((t) => ({
  getNuzlockePokemon: t.prismaField({
    type: "NuzlockePokemon",
    description: "Get a nuzlocke pokemon by id",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const nuzlockePokemon = await db.nuzlockePokemon.findUnique({
        ...query,
        where: { id: args?.id },
      });

      if (!nuzlockePokemon) {
        throw new Error("NuzlockePokemon not found");
      }

      return nuzlockePokemon;
    },
  }),
  getNuzlockePokemons: t.prismaField({
    type: ["NuzlockePokemon"],
    description: "Get a list of pokemons from a nuzlocke",
    args: {
      nuzlockeId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const nuzlockePokemons = await db.nuzlockePokemon.findMany({
        ...query,
        where: { nuzlockeId: args?.nuzlockeId },
      });

      if (!nuzlockePokemons) {
        throw new Error("NuzlockePokemon not found");
      }

      return nuzlockePokemons;
    },
  }),
}));
