const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => "API for hackernews clone",
    feed: (parent, args, context) => context.prisma.links()
  },
  Mutation: {
    post: (parent, args, context, info) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
