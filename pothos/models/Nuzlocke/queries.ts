import { Prisma } from "@prisma/client";

import builder from "pothos/builder";
import db from "pothos/db";

export const NuzlockeType = builder.enumType("Role", {
  values: ["NORMAL", "CAGELOCKE", "SOUL_LINK", "CUSTOM"] as const,
  description: "Nuzlocke type",
});

const Nuzlocke = builder.prismaObject("Nuzlocke", {
  name: "Nuzlocke",
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description", { nullable: true }),
    type: t.expose("type", { type: NuzlockeType }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    user: t.relation("user"),
    pokemons: t.relation("pokemons"),
  }),
});

const NuzlockeResponse = builder.objectType("NuzlockeResponse", {
  description: "Paginated list of articles",
  fields: (t) => ({
    nextCursor: t.exposeString("nextCursor", { nullable: true }),
    prevCursor: t.exposeString("prevCursor", { nullable: true }),
    totalCount: t.exposeInt("totalCount", { nullable: true }),
    results: t.field({ type: [Nuzlocke], resolve: (parent) => parent.results }),
  }),
});

const SearchOrder = builder.enumType("SearchOrder", {
  values: ["asc", "desc"] as const,
  description: "Search order",
});

const SearchInput = builder.inputType("SearchInput", {
  description: "Search query input",
  fields: (t) => ({
    search: t.string(),
    orderBy: t.string(),
    cursor: t.string(),
    order: t.field({
      type: SearchOrder,
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    getNuzlocke: t.prismaField({
      type: "Nuzlocke",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (query, _, args) => {
        const nuzlocke = await db.nuzlocke.findUnique({
          ...query,
          where: { id: args?.id },
        });

        if (!nuzlocke) {
          throw new Error("Nuzlocke not found");
        }
        return nuzlocke;
      },
    }),
    searchNuzlockes: t.field({
      type: NuzlockeResponse,
      description: "Search for nuzlockes",
      args: {
        input: t.arg({ type: SearchInput }),
      },
      resolve: async (_, args) => {
        const incomingCursor = args?.input?.cursor;
        let results;
        const filter: Prisma.NuzlockeWhereInput | undefined = {
          OR: [
            {
              title: {
                contains: args?.input?.search || "",
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: args?.input?.search || "",
                mode: "insensitive",
              },
            },
          ],
        };

        const totalCount = await db.nuzlocke.count({
          where: filter,
        });

        if (incomingCursor) {
          results = await db.nuzlocke.findMany({
            take: 9,
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
          results = await db.nuzlocke.findMany({
            take: 9,
            where: filter,
            orderBy: {
              [args?.input?.orderBy || "createdAt"]: args?.input?.order,
            },
          });
        }

        const lastResult = results[8];
        const cursor = lastResult?.id;

        return {
          prevCursor: args?.input?.cursor ?? "",
          nextCursor: cursor,
          results,
          totalCount,
        };
      },
    }),
  }),
});
