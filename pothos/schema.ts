import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import path from "path";

import builder from "./builder";

import "./models/index";

export const schema = builder.toSchema();

if (process.env.NODE_ENV !== "production") {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync(path.join(__dirname, "../schema.graphql"), schemaAsString);
}
