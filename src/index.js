const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const { logEnvironmentVariables } = require("./helpers/env-logger");

const errorHandler = require("./middlewares/error-handler");

const mainRouter = require("./routes");

dotenv.config();

const PORT = process.env.APP_PORT || 5000;

async function startServer() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
    });
    app.use(cors());

    app.use(express.static("src/public"));
    app.use(express.static("src/public/editor"));
    app.use(express.static("build/public"));
    app.use(express.static("build/public/editor"));

    app.get("/", (_, res) => {
      res.json({ message: "Ah yes, boiler-plate works." });
    });

    app.use("/api/v1", mainRouter);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log("=====> EnvironmentVariables", logEnvironmentVariables());
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

startServer();
