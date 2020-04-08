import { ApolloServer } from "apollo-server";

import verifyJwt from "./auth/verify-jwt";
import AuthDirective from "./auth/AuthDirective";
import getTokenFromHeader from "./auth/get-token-from-header";

import typeDefs from "./schema";
import resolvers from "./resolvers";

import getErrorCode from "./utils/errors";

import mongo from "./connectors/mongo/mongo";

const startServer = async () => {
  try {
    await mongo.init();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        // get the user token from the headers
        const token = getTokenFromHeader(req);
        // try to retrieve a user with the token
        const user = token && (await verifyJwt({ token }));

        return {
          user,
        };
      },
      formatError: (err) => {
        const error = getErrorCode(err.message);
        return { message: error.message, statusCode: error.statusCode };
      },
      schemaDirectives: {
        auth: AuthDirective,
        authorized: AuthDirective,
        authenticated: AuthDirective,
      },
    });

    server.listen(4001).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
