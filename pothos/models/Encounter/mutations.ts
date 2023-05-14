import builder from "pothos/builder";
import db from "pothos/db";
import { STATUS } from "./queries";

const CreateEncounterInput = builder.inputType("CreateEncounterInput", {
  description: "Create encounter input",
  fields: (t) => ({
    nickname: t.string({ required: true }),
    pokemonId: t.int({ required: true }),
    location: t.string({ required: true }),
    status: t.field({
      type: STATUS,
      required: true,
    }),
  }),
});

builder.mutationFields((t) => ({
  createEncounter: t.prismaField({
    type: "Encounter",
    description: "Create a encounter",
    args: {
      input: t.arg({ type: CreateEncounterInput, required: true }),
      nuzlockeId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      if (!ctx?.userId) {
        throw new Error("You must be logged in to create a encounter");
      }

      const user = await db.user.findUnique({
        where: { id: ctx.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const nuzlocke = await db.nuzlocke.findUnique({
        where: { id: args.nuzlockeId },
      });

      if (!nuzlocke) {
        throw new Error("Nuzlocke not found");
      }

      if (nuzlocke.userId !== ctx.userId) {
        throw new Error(
          "Not authorized to create an encounter for this nuzlocke"
        );
      }

      const encounter = await db.encounter.create({
        ...query,
        data: {
          ...args.input,
          nuzlockeId: args.nuzlockeId,
        },
      });

      return encounter;
    },
  }),
  updateEncounter: t.prismaField({
    type: "Encounter",
    description: "Update encounter",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: CreateEncounterInput, required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      if (!ctx?.userId) {
        throw new Error("You must be logged in to create a encounter");
      }

      const encounter = await db.encounter.findFirst({
        ...query,
        where: { id: args.id },
      });

      const nuzlocke = await db.nuzlocke.findUnique({
        where: { id: encounter?.nuzlockeId },
      });

      if (!nuzlocke) {
        throw new Error("Nuzlocke not found");
      }

      if (nuzlocke.userId !== ctx.userId) {
        throw new Error(
          "Not authorized to update an encounter for this nuzlocke"
        );
      }

      const updatedEncounter = await db.encounter.update({
        ...query,
        where: { id: args.id },
        data: {
          ...args.input,
        },
      });

      return updatedEncounter;
    },
  }),
  deleteEncounter: t.prismaField({
    type: "Encounter",
    description: "Delete encounter",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, query, args, ctx) => {
      if (!ctx?.userId) {
        throw new Error("You must be logged in to create a encounter");
      }

      const encounter = await db.encounter.findFirst({
        ...query,
        where: { id: args.id },
      });

      const nuzlocke = await db.nuzlocke.findUnique({
        where: { id: encounter?.nuzlockeId },
      });

      if (!nuzlocke) {
        throw new Error("Nuzlocke not found");
      }

      if (nuzlocke.userId !== ctx.userId) {
        throw new Error(
          "Not authorized to delete an encounter for this nuzlocke"
        );
      }
      const deletedEncounter = await db.encounter.delete({
        where: { id: args.id },
      });

      return deletedEncounter;
    },
  }),
}));
