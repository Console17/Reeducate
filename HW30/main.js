import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log("server ruinning on ", url);
