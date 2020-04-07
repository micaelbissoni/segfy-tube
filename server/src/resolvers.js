import videoModel from "./models/video-model";

const resolvers = {
  Query: {
    queriesSaved: async (root, { limit }, context) =>
      await videoModel.queriesSaved({ limit }, context),
  },
  Mutation: {
    searchVideo: async (parent, { video: args }, context) =>
      await videoModel.search(args, context),
  },
};

export default resolvers;
