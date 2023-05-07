import builder from "pothos/builder";
import db from "pothos/db";

import { NuzlockeType } from "./queries";

const CreateNuzlockeInput = builder.inputType("CreateNuzlockeInput", {
  description: "Create nuzlocke input",
  fields: (t) => ({
    title: t.string({ required: true }),
    gameId: t.int({ required: true }),
    description: t.string(),
    type: t.field({
      type: NuzlockeType,
      required: true,
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createNuzlocke: t.prismaField({
      type: "Nuzlocke",
      description: "Create a nuzlocke",
      args: {
        userId: t.arg.string({ required: true }),
        input: t.arg({ type: CreateNuzlockeInput, required: true }),
      },
      resolve: async (query, _, args) => {
        const nuzlocke = await db.nuzlocke.create({
          ...query,
          data: {
            ...args.input,
            userId: args.userId,
          },
        });

        return nuzlocke;
      },
    }),
    updateNuzlocke: t.prismaField({
      type: "Nuzlocke",
      description: "Update nuzlocke",
      args: {
        id: t.arg.string({ required: true }),
        input: t.arg({ type: CreateNuzlockeInput, required: true }),
      },
      resolve: async (query, _, args) => {
        const article = await db.nuzlocke.update({
          ...query,
          where: { id: args.id },
          data: args.input,
        });

        return article;
      },
    }),
    deleteNuzlockes: t.field({
      description: "Delete nuzlockes",
      type: ["String"],
      args: {
        ids: t.arg.stringList({ required: true }),
      },
      resolve: async (_, args) => {
        await db.nuzlocke.deleteMany({
          where: { id: { in: args.ids } },
        });

        return args.ids;
      },
    }),
  }),
});
