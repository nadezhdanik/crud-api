export const Messages = {
  USER_NOT_FOUND: "User not found",
  INVALID_USERID: "Invalid userId",
  MISSING_USERDATA: "Missing or invalid user data",
  ROUTE_NOT_FOUND: "Route not found",
  SERVER_ERROR: "Internal Server Error",
  INVALID_JSON: "Invalid JSON body",
};

export const serverStartedMessage = (port: number): string =>
  `Server running at http://localhost:${port.toString()}`;
