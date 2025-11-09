import type { IncomingMessage, ServerResponse } from "node:http";
import { getAllUsersHandler } from "./getAllUsers.ts";
import { getUserByIdHandler } from "./getUserById.ts";
import { createUserHandler } from "./createUser.ts";
import { Endpoints } from "../constants/endpoints.ts";
import { putUserHandler } from "./putUser.ts";

export const handleUserRoutes = async (
  request: IncomingMessage,
  response: ServerResponse
): Promise<boolean> => {
  const url = request.url ?? "";

  if (!url.startsWith(Endpoints.USERS)) return false;

  if (getAllUsersHandler(request, response)) return true;

  const parts = url.split("/");
  const idPart = parts[3] ?? "";
  const userId = idPart.split("?")[0];
  if (userId) {
    if (getUserByIdHandler(request, response, userId)) return true;
  }

  if (await createUserHandler(request, response)) return true;
  if (await putUserHandler(request, response)) return true;

  return false;
};
