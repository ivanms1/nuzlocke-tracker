import PrismaPlugin from "@pothos/plugin-prisma";
import SchemaBuilder from "@pothos/core";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

import type { User } from "@prisma/client";

import db from "./db";

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {
    userId: User["id"];
  };
  Objects: {
    NuzlockeResponse: {
      nextCursor: string;
      prevCursor: string;
      totalCount: number;
      results: PrismaTypes["Nuzlocke"]["Shape"][];
    };
  };
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: JSON;
      Output: JSON;
    };
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
    filterConnectionTotalCount: true,
  },
});

export default builder;
