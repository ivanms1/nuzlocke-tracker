import builder from "pothos/builder";
import db from "pothos/db";

builder.prismaObject("User", {
  name: "User",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("username"),
    email: t.exposeString("email"),
    avatar: t.exposeString("avatar", { nullable: true }),
    nuzlockes: t.relation("nuzlockes"),
  }),
});

builder.queryFields((t) => ({
  getUser: t.prismaField({
    type: "User",
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const user = await db.user.findUnique({
        ...query,
        where: { id: args?.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  }),
}));
