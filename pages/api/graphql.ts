import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getServerSession } from "next-auth";

import { schema } from "pothos/schema";
import { authOptions } from "./auth/[...nextauth]";

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      return { userId: session?.user?.id };
    }

    return {
      userId: "unauthenticated",
    };
  },
});
