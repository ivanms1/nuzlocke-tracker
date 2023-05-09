import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getToken } from "next-auth/jwt";

import { schema } from "pothos/schema";

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const token = await getToken({ req });

    if (token) {
      return { userId: token?.id };
    }

    return {
      userId: "unauthenticated",
    };
  },
});
