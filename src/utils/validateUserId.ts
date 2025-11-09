import type { ServerResponse } from "http";
import { Messages } from "../constants/messages.ts";
import { StatusCodes } from "../constants/statusCodes.ts";
import { sendJson } from "./sendJson.ts";
import { validate } from "uuid";

export const validateUserId = (
  userId: string,
  response: ServerResponse
): boolean => {
  if (!validate(userId)) {
    sendJson(response, StatusCodes.BAD_REQUEST, {
      message: Messages.INVALID_USERID,
    });
    return false;
  }
  return true;
};
