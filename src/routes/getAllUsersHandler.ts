import type { IncomingMessage, ServerResponse } from "node:http";
import { getAllUsers } from "../store/userStore.ts";

export const getAllUsersHandler = (
  request: IncomingMessage,
  response: ServerResponse
): boolean => {
  if (request.method !== "GET" && request.url !== "/api/users") return false;

  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(getAllUsers()));
  return true;
};
