const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    info: () => "API for hackernews clone",
    feed: () => links,
    link: (parent, args, context, info) => context.prisma.links()
  },
  Mutation: {
    post: (parent, args, context, info) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
    // updateLink: (parent, args) => {
    //   const { id, url, description } = args;

    //   let link = links.find(l => l.id === id);
    //   if (!link) {
    //     return null;
    //   }

    //   let newLink = {
    //     description: description || link.description,
    //     url: url || link.url,
    //     id: id
    //   };

    //   links = links.filter(l => l.id !== newLink.id);
    //   links.push(newLink);
    //   return newLink;
    // },
    // deleteLink: (parent, args) => {
    //   let link = links.find(l => args.id === l.id);
    //   if (!link) {
    //     return null;
    //   }
    //   links = links.filter(l => l.id !== link.id);

    //   return link;
    // }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
