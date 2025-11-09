import { createServer } from "node:http";
import type { Server } from "node:http";
import { handleUserRoutes } from "./routes/index.ts";
import { StatusCodes } from "./constants/statusCodes.ts";
import { Messages, serverStartedMessage } from "./constants/messages.ts";
import { sendJson } from "./utils/sendJson.ts";

export const createAppServer = (port: number): Server => {
  const server = createServer((request, response) => {
    void handleUserRoutes(request, response)
      .then((handled) => {
        if (!handled) {
          sendJson(response, StatusCodes.NOT_FOUND, {
            message: Messages.ROUTE_NOT_FOUND,
          });
        }
      })
      .catch(() => {
        sendJson(response, StatusCodes.SERVER_ERROR, {
          message: Messages.SERVER_ERROR,
        });
      });
  });

  server.listen(port, () => {
    console.log(serverStartedMessage(port));
  });

  return server;
};
