import MongoCollection from "../connectors/mongo/MongoCollection";
import { ObjectID } from "mongodb";
import YoutubeController from "../connectors/googleapis/youtube";

const videoCol = new MongoCollection("video");
const youtubeCtrl = new YoutubeController();

const publicFields = {
  _id: 1,
  query: 1,
  result: 1,
};

const videoModel = {
  async queriesSaved({ limit }, { user }) {
    const docs = await videoCol
      .getCol()
      .find(
        {},
        {
          projection: publicFields,
          limit,
        }
      )
      .toArray();
    return docs;
  },
  async search(videoData, { user }) {
    const youtubeResponse = await youtubeCtrl
      .searchVideo(videoData)
      .then((response) => {
        return response;
      });

    const findAndUpdate = await videoCol
      .getCol()
      .findOneAndUpdate(
        { query: videoData.query },
        { $set: { result: youtubeResponse } },
        { returnOriginal: false }
      );

    if (findAndUpdate.ok && findAndUpdate.value) {
      return findAndUpdate.value;
    } else {
      videoData.result = youtubeResponse;
      let video = await videoCol.getCol().insertOne(videoData);

      video = video.result && video.result.ok && video.ops[0];
      if (!video || !video._id) {
        throw new Error("Não foi possível criar nova busca de vídeo.");
      } else {
        return video;
      }
    }
  },
};

export default videoModel;
