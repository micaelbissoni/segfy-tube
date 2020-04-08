import rawSettings from "../../settings/settings-server";

const { mongoUrl, mongoDbName, jwtSecret, googleApiKey } = rawSettings;

const settings = {
  mongoUrl: process.env.MONGO_URL || mongoUrl,
  mongoDbName: process.env.MONGO_DB_NAME || mongoDbName,
  jwtSecret,
  googleApiKey,
};

export default settings;
