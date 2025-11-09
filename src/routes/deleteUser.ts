import type { IncomingMessage, ServerResponse } from "node:http";
import { users } from "../store/userStore.ts";
import { StatusCodes } from "../constants/statusCodes.ts";
import { Methods } from "../constants/methods.ts";
import { sendJson } from "../utils/sendJson.ts";
import { validate } from "uuid";
import { Messages } from "../constants/messages.ts";
import { extractUserId } from "../utils/extractUserId.ts";

export const deleteUserHandler = (
  request: IncomingMessage,
  response: ServerResponse
): boolean => {
  if (request.method !== Methods.DELETE) return false;

  const userId = extractUserId(request.url);
  if (!userId) return false;

  if (!validate(userId)) {
    sendJson(response, StatusCodes.BAD_REQUEST, {
      message: Messages.INVALID_USERID,
    });
    return true;
  }

  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    sendJson(response, StatusCodes.NOT_FOUND, {
      message: Messages.USER_NOT_FOUND,
    });
    return true;
  }

  users.splice(index, 1);

  sendJson(response, StatusCodes.RECORD_DELETED, {});
  return true;
};
