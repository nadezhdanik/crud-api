import type { IncomingMessage, ServerResponse } from "node:http";
import { getAllUsersHandler } from "./getAllUsersHandler.ts";

export const handleUserRoutes = (
  request: IncomingMessage,
  response: ServerResponse
): boolean => {
  if (getAllUsersHandler(request, response)) return true;
  return false;
};
