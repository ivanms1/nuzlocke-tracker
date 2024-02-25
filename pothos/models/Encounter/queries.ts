import builder from "pothos/builder";
import db from "pothos/db";
import { Prisma } from "@prisma/client";

import { SearchOrder } from "../Nuzlocke";
import { EncounterFilter } from "../Shared";

export const STATUS = builder.enumType("STATUS", {
  values: ["SEEN", "IN_TEAM", "IN_PC", "FAINTED"] as const,
  description: "Pokemon status",
});

const EncounterSearchInput = builder.inputType("EncounterSearchInput", {
  description: "Search query input",
  fields: (t) => ({
    filter: t.field({
      type: EncounterFilter,
    }),
    orderBy: t.string(),
    cursor: t.string(),
    order: t.field({
      type: SearchOrder,
    }),
  }),
});

const Encounter = builder.prismaObject("Encounter", {
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
    pokemonId: t.exposeInt("pokemonId"),
  }),
});

const EncountersResponse = builder.objectType("EncountersResponse", {
  description: "Paginated list of Encounters",
  fields: (t) => ({
    nextCursor: t.exposeString("nextCursor", { nullable: true }),
    prevCursor: t.exposeString("prevCursor", { nullable: true }),
    totalCount: t.exposeInt("totalCount", { nullable: true }),
    results: t.field({
      type: [Encounter],
      resolve: (parent) => parent.results,
    }),
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
  getNuzlockeEncounters: t.field({
    type: EncountersResponse,
    description: "Get a list of encounters from a nuzlocke",
    args: {
      nuzlockeId: t.arg.string({ required: true }),
      input: t.arg({ type: EncounterSearchInput, required: false }),
    },
    resolve: async (_, args, ctx) => {
      const incomingCursor = args?.input?.cursor;

      const nuzlocke = await db.nuzlocke.findFirst({
        where: { id: args?.nuzlockeId, userId: ctx.userId },
      });

      if (!nuzlocke) {
        throw new Error("Nuzlocke not found");
      }

      let results;
      const filter: Prisma.EncounterWhereInput | undefined = {
        nuzlockeId: args?.nuzlockeId,
        ...args?.input?.filter,
      };

      const totalCount = await db.encounter.count({
        where: filter,
      });

      if (incomingCursor) {
        results = await db.encounter.findMany({
          take: 10,
          skip: 1,
          cursor: {
            id: incomingCursor,
          },
          where: filter,
          orderBy: {
            [args?.input?.orderBy || "createdAt"]: args?.input?.order,
          },
        });
      } else {
        results = await db.encounter.findMany({
          take: 10,
          where: filter,
          orderBy: {
            [args?.input?.orderBy || "createdAt"]: args?.input?.order,
          },
        });
      }

      const lastResult = results[9];
      const cursor = lastResult?.id;

      return {
        prevCursor: args?.input?.cursor ?? "",
        nextCursor: cursor,
        results,
        totalCount,
      };
    },
  }),
}));
