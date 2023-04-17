const http = require('http');
const logger = require('tracer').colorConsole();

const router = require("./app/router")

http
    .createServer((req, res) => router(req, res))
    .listen(3000, () => logger.log("listen on 3000"))