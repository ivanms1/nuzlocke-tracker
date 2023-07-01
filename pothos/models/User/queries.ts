import builder from "pothos/builder";
import db from "pothos/db";

builder.prismaObject("User", {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email", { nullable: true }),
    avatar: t.exposeString("avatar", { nullable: true }),
    nuzlockes: t.relation("nuzlockes"),
    image: t.exposeString("image", { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  getCurrentUser: t.prismaField({
    type: "User",
    resolve: async (query, _, __, ctx) => {
      if (!ctx.userId) {
        throw new Error("User not found");
      }

      const user = await db.user.findUnique({
        ...query,
        where: { id: ctx.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  }),
}));
