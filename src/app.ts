import express, { Router } from "express";
import cors from "cors";
import * as http from "http";
import httpStatus from "http-status";
import ApiError from "./utils/ApiError.js";
import v1Router from "./routes/v1/index.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";
export default class App {
    private readonly app: express.Application;
    private readonly server: http.Server;
    private readonly port;
  
    constructor(port) {
      this.port = port;
      this.app = express();
      this.app.use(cors());
      this.app.use(express.json({ type: "application/json" }));
      this.app.use(express.urlencoded({ extended: true }));
      this.addV1Router(v1Router);
      this.app.use((req, res, next) => {
        next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
      });
      this.app.use(errorConverter);
      this.app.use(errorHandler);
  
      this.server = http.createServer(this.app);
    }
  
    start() {
      this.server.listen(this.port, () => {
        console.log(`server is running on port ${this.port}`);
      });
    }
  
    addV1Router(router: Router) {
      this.app.use(`/api/v1`, router);
    }
    addRouter(router: Router) {
      this.app.use("/api", router);
    }
  }