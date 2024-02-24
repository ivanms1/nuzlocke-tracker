import builder from "pothos/builder";

builder.prismaObject("Region", {
  name: "Region",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
  }),
});
