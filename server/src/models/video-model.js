import MongoCollection from "../connectors/mongo/MongoCollection";
import { ObjectID } from "mongodb";
import YoutubeController from "../connectors/googleapis/youtube";

const videoCol = new MongoCollection("video");
const youtubeCtrl = new YoutubeController();

const publicFields = {
  _id: 1,
  name: 1,
  youtubeResult: 1,
};

const videoModel = {
  async videosSaved({ limit }, { user }) {
    const docs = await videoCol
      .getCol()
      .find(
        {},
        {
          projection: publicFields,
          limit,
          sort: { _id: -1 },
        }
      )
      .toArray();
    return docs;
  },
  async search(videoData, { user }) {
    let video = await videoCol.getCol().insertOne(videoData);

    video = video.result && video.result.ok && video.ops[0];
    if (!video || !video._id) {
      throw new Error("Não foi possível criar nova busca de vídeo.");
    }

    return await youtubeCtrl.searchVideo(video).then((response) => {
      return response;
    });
  },
};

export default videoModel;
