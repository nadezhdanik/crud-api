import cluster from "node:cluster";
import type { IncomingMessage, ServerResponse } from "node:http";
import http from "node:http";
import os from "node:os";
import { createAppServer } from "./server.ts";
import { PORT } from "./config.ts";
import { StatusCodes } from "./constants/statusCodes.ts";
import { Messages } from "./constants/messages.ts";
import { sendJson } from "./utils/sendJson.ts";

const numCPUs = os.cpus().length;
const workers: number[] = [];

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid.toString()} is running`);

  for (let i = 1; i < numCPUs; i++) {
    const workerPort = PORT + i;
    const worker = cluster.fork({ PORT: workerPort });
    workers.push(workerPort);
    console.log(
      `Worker ${String(
        worker.process.pid
      )} listening on port ${workerPort.toString()}`
    );
  }

  let currentWorkerIndex = 0;

  const lbServer = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      if (!workers.length) {
        sendJson(res, StatusCodes.SERVER_ERROR, {
          message: Messages.NO_WORKERS,
        });
        return;
      }

      const workerPort = workers[currentWorkerIndex];
      currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;

      const options = {
        hostname: "localhost",
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      };

      const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(
          proxyRes.statusCode ?? StatusCodes.SERVER_ERROR,
          proxyRes.headers
        );
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });
    }
  );

  lbServer.listen(PORT, () => {
    console.log(
      `Load balancer listening on http://localhost:${PORT.toString()}`
    );
  });
} else {
  const workerPort = process.env["PORT"]
    ? parseInt(process.env["PORT"])
    : PORT + 1;
  createAppServer(workerPort);
}
