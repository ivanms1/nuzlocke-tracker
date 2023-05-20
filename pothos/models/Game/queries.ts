import builder from "pothos/builder";

builder.prismaObject("Game", {
  name: "Game",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    generation: t.exposeString("generation"),
    versionGroup: t.exposeString("versionGroup"),
    regions: t.exposeStringList("regions"),
  }),
});
