import builder from "pothos/builder";

builder.prismaObject("PokemonType", {
  name: "PokemonType",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    color: t.exposeString("color"),
  }),
});
