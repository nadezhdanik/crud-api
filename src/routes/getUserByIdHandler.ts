import type { IncomingMessage, ServerResponse } from "node:http";
import { users } from "../store/userStore.js";
import { sendJson } from "../utils/sendJson.ts";
import { StatusCodes } from "../constants/statusCodes.ts";
import { Methods } from "../constants/methods.ts";
import { isUuid } from "../utils/isUuid.ts";
import { Messages } from "../constants/messages.ts";

export const getUserByIdHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  userId: string
): boolean => {
  if (request.method !== Methods.GET) return false;

  if (!isUuid(userId)) {
    sendJson(response, StatusCodes.BAD_REQUEST, {
      message: Messages.INVALID_USERID,
    });
    return true;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    sendJson(response, StatusCodes.NOT_FOUND, {
      message: Messages.USER_NOT_FOUND,
    });
    return true;
  }

  sendJson(response, StatusCodes.OK, user);
  return true;
};
