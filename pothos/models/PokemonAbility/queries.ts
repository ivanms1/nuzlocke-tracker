import builder from "pothos/builder";

builder.prismaObject("PokemonAbility", {
  name: "PokemonAbility",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    desc: t.exposeString("desc"),
  }),
});
