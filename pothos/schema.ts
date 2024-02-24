import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";

import builder from "./builder";

import "./models/index";

export const schema = builder.toSchema();

if (process.env.NODE_ENV !== "production") {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  console.log("updating schema");
  writeFileSync("./pothos/schema.graphql", schemaAsString);
  console.log("done updating schema");
}
