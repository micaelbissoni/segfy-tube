const { google } = require("googleapis");
import settings from "../../settings";

export default class YoutubeController {
  constructor() {}

  async searchVideo({ query }) {
    return new Promise(function (resolve, reject) {
      const youtube = google.youtube({
        version: "v3",
        auth: settings.googleApiKey,
      });

      youtube.search
        .list({
          part: "id,snippet",
          q: query,
        })
        .then(({ data }) => {
          const items = [...data.items];
          const itemsMaped = items.map((item) => {
            const { id, snippet } = item;
            snippet.id = id;
            return snippet ? snippet : false;
          });
          resolve(itemsMaped);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}
