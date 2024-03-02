import App from "./app.js";
import { getRestClientPort } from "./configs/env-config.js";
const port = getRestClientPort();
const server = new App(port);
server.start();
