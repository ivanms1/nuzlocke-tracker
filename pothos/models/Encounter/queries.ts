import builder from "pothos/builder";
import db from "pothos/db";

export const STATUS = builder.enumType("STATUS", {
  values: ["SEEN", "IN_TEAM", "IN_PC", "FAINTED"] as const,
  description: "Pokemon status",
});

builder.prismaObject("Encounter", {
  name: "Encounter",
  fields: (t) => ({
    id: t.exposeID("id"),
    nickname: t.exposeString("nickname"),
    pokemon: t.relation("pokemon"),
    nuzlocke: t.relation("nuzlocke"),
    status: t.expose("status", { type: STATUS }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    location: t.exposeString("location"),
  }),
});

builder.queryFields((t) => ({
  getEncounter: t.prismaField({
    type: "Encounter",
    description: "Get encounter by id",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const nuzlockePokemon = await db.encounter.findUnique({
        ...query,
        where: { id: args?.id },
      });

      if (!nuzlockePokemon) {
        throw new Error("NuzlockePokemon not found");
      }

      return nuzlockePokemon;
    },
  }),
  getNuzlockeEncounters: t.prismaField({
    type: ["Encounter"],
    description: "Get a list of encounters from a nuzlocke",
    args: {
      nuzlockeId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const nuzlockeEncounters = await db.encounter.findMany({
        ...query,
        where: { nuzlockeId: args?.nuzlockeId },
      });

      if (!nuzlockeEncounters) {
        throw new Error("NuzlockePokemon not found");
      }

      return nuzlockeEncounters;
    },
  }),
}));
