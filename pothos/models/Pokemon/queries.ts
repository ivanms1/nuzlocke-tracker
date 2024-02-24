import builder from "pothos/builder";

builder.prismaObject("Pokemon", {
  name: "Pokemon",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    types: t.relation("types"),
    abilities: t.relation("abilities"),
    height: t.exposeInt("height"),
    weight: t.exposeInt("weight"),
    baseAttack: t.exposeInt("baseAttack"),
    baseDefense: t.exposeInt("baseDefense"),
    baseHp: t.exposeInt("baseHP"),
    baseSpAttack: t.exposeInt("baseSpAttack"),
    baseSpDefense: t.exposeInt("baseSpDefense"),
    baseSpeed: t.exposeInt("baseSpeed"),
    sprite: t.exposeString("sprite"),
  }),
});
