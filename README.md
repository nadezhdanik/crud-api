# CRUD API

A simple Node.js + TypeScript REST API for managing users.

## Installation

```bash
git clone https://github.com/nadezhdanik/crud-api.git
cd crud-api
npm install
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

- Starts the server with auto-reload using `nodemon` and `ts-node`.
- Server will run at `http://localhost:3000` (default port from config).

### Production Mode

```bash
npm run build
npm run start:prod
```

- Compiles TypeScript to JavaScript in `dist/`.
- Runs the compiled production server.

### Multi Mode

```bash
npm run start:multi
```

- Runs the application with multiple instances support (e.g., clustering or load balancing logic inside src/multi.ts).

## Linting

```bash
npm run lint
npm run lint:fix
```

## Testing

```bash
npm test
npm run test:watch
```

## API Endpoints

- `GET /api/users` – Get all users
- `POST /api/users` – Create a new user
- `GET /api/users/{userId}` – Get user by ID
- `PUT /api/users/{userId}` – Update user by ID
- `DELETE /api/users/{userId}` – Delete user by ID
