/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./config/env";
import app from "./app";

let server: Server

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);

        console.log("Connected to DB for Headless task!")
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
};

(async () => {
    await startServer();
})();

// Rejection Error
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected. Server shutting down!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Exception Error
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected, Server is shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// SigTerm
process.on("SIGTERM", () => {
  console.log("Signal termination detected, Server is shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// SigInt
process.on("SIGINT", () => {
  console.log("Signal interruption detected, Server is shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});