const dotenv = require("dotenv");
dotenv.config();

const logEnvironmentVariables = () => {
  const envObject = {
    BACKEND_LOCAL_URL: process.env.BACKEND_LOCAL_URL,
  };
  return envObject;
};

module.exports = { logEnvironmentVariables };
