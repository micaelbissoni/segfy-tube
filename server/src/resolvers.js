import videoModel from "./models/video-model";

const resolvers = {
  Query: {
    videosSaved: async (root, { limit }, context) =>
      await videoModel.videosSaved({ limit }, context),
  },
  Mutation: {
    searchVideo: async (parent, { video: args }, context) =>
      await videoModel.search(args, context),
  },
};

export default resolvers;
