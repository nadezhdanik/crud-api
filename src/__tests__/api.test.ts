import { createAppServer } from "../server.ts";
import type { Server } from "node:http";
import type { User } from "../models/user.ts";
import { Endpoints } from "../constants/endpoints.ts";
import { StatusCodes } from "../constants/statusCodes.ts";
import { Methods } from "../constants/methods.ts";
import { Headers } from "../constants/headers.ts";

const PORT = 3001;
const baseUrl = `http://localhost:${PORT.toString()}`;
let server: Server;

beforeAll(() => {
  server = createAppServer(PORT);
});

afterAll((done) => {
  server.close(done);
});

describe("Scenario 1: Fetch users and create a new user", () => {
  test("GET /api/users should initially return an empty array", async () => {
    const res = await fetch(`${baseUrl}${Endpoints.USERS}`);
    expect(res.status).toBe(StatusCodes.OK);

    const data: User[] = (await res.json()) as User[];
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(0);
  });

  test("POST /api/users should create a new user", async () => {
    const newUser = {
      username: "Tanya",
      age: 30,
      hobbies: ["yoga", "running"],
    };
    const res = await fetch(`${baseUrl}${Endpoints.USERS}`, {
      method: Methods.POST,
      headers: Headers.JSON,
      body: JSON.stringify(newUser),
    });

    expect(res.status).toBe(StatusCodes.CREATED);
    const data: User = (await res.json()) as User;
    expect(data).toMatchObject(newUser);
    expect(data.id).toBeDefined();
  });
});

describe("Scenario 2: Retrieve and update a user independently", () => {
  let userId: string;

  beforeAll(async () => {
    const res = await fetch(`${baseUrl}${Endpoints.USERS}`, {
      method: Methods.POST,
      headers: Headers.JSON,
      body: JSON.stringify({
        username: "Masha",
        age: 22,
        hobbies: ["checkers", "reading"],
      }),
    });
    const data: User = (await res.json()) as User;
    userId = data.id;
  });

  test("GET /api/users/{userId} should return the created user", async () => {
    const res = await fetch(`${baseUrl}${Endpoints.USERS}/${userId}`);
    expect(res.status).toBe(StatusCodes.OK);

    const data: User = (await res.json()) as User;
    expect(data.id).toBe(userId);
    expect(data.username).toBe("Masha");
  });

  test("PUT /api/users/{userId} should update the user", async () => {
    const updatedData = {
      username: "Masha Updated",
      age: 23,
      hobbies: ["chess", "puzzles"],
      id: userId,
    };
    const res = await fetch(`${baseUrl}${Endpoints.USERS}/${userId}`, {
      method: Methods.PUT,
      headers: Headers.JSON,
      body: JSON.stringify(updatedData),
    });

    expect(res.status).toBe(StatusCodes.OK);
    const data: User = (await res.json()) as User;
    expect(data.username).toBe("Masha Updated");
    expect(data.age).toBe(23);
    expect(data.hobbies).toEqual(["chess", "puzzles"]);
    expect(data.id).toBe(userId);
  });
});

describe("Scenario 3: Delete a user independently", () => {
  let userId: string;

  beforeAll(async () => {
    const res = await fetch(`${baseUrl}${Endpoints.USERS}`, {
      method: Methods.POST,
      headers: Headers.JSON,
      body: JSON.stringify({ username: "Dima", age: 28, hobbies: ["guitar"] }),
    });
    const data: User = (await res.json()) as User;
    userId = data.id;
  });

  test("DELETE /api/users/{userId} should delete the user", async () => {
    const res = await fetch(`${baseUrl}${Endpoints.USERS}/${userId}`, {
      method: Methods.DELETE,
    });
    expect(res.status).toBe(StatusCodes.RECORD_DELETED);
  });

  test("GET /api/users/{userId} after deletion should return 404", async () => {
    const res = await fetch(`${baseUrl}${Endpoints.USERS}/${userId}`);
    expect(res.status).toBe(StatusCodes.NOT_FOUND);

    const data: { message: string } = (await res.json()) as { message: string };
    expect(data.message).toBeDefined();
  });
});
