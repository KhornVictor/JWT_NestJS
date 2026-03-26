# NestJS JWT Authentication Example

This project is a simple NestJS API that demonstrates how to create and validate JWT access tokens.

## What this project does

- Authenticates a user with username and password
- Creates a JWT token on successful login
- Protects an endpoint with a custom auth guard
- Returns the logged-in user profile from the token payload

## Project flow

1. Send credentials to POST /auth/login
2. Server validates user in UserService
3. Server signs a JWT using JwtService
4. Client sends token in Authorization header
5. Auth guard verifies token and attaches user to request

## Directory map

```json
{
  "jwt": {
    "src": {
      "main.ts": "Application entry point. Bootstraps and starts the NestJS app.",
      "app.module.ts": "Root module that imports and connects all feature modules.",
      "auth": {
        "auth.controller.ts": "Handles authentication endpoints like login and token response.",
        "passport-auth.controller.ts": "Handles authentication routes using Passport guards.",
        "auth.service.ts": "Contains authentication logic such as validating users and generating JWT tokens.",
        "auth.interface.ts": "Defines TypeScript interfaces related to authentication (payloads, login DTOs, etc.).",
        "auth.module.ts": "Authentication module that wires controllers, services, and strategies together.",
        "guards": {
          "auth.guard.ts": "Custom JWT guard to protect routes.",
          "passport-local.guard.ts": "Passport local authentication guard (username/password validation).",
          "passport-jwt.guard.ts": "Passport JWT guard for validating bearer tokens."
        },
        "strategies": {
          "local.strategy.ts": "Passport local strategy implementation for validating credentials.",
          "jwt.strategy.ts": "Passport JWT strategy implementation for validating and decoding JWT tokens."
        }
      },
      "user": {
        "user.controller.ts": "Handles user-related endpoints.",
        "user.service.ts": "Provides user data access and mock user validation logic.",
        "user.interface.ts": "Defines TypeScript interfaces for user objects.",
        "user.module.ts": "User module that groups user controller and service."
      },
      "config": {
        "jwt-secret.ts": "Stores and exports the JWT secret key configuration."
      }
    },
    "test": {
      "app.e2e-spec.ts": "End-to-end test cases for application routes.",
      "jest-e2e.json": "Jest configuration file for e2e testing."
    },
    "package.json": "Project metadata and dependencies configuration.",
    "pnpm-lock.yaml": "Dependency lock file for pnpm.",
    "tsconfig.json": "TypeScript compiler configuration.",
    "tsconfig.build.json": "TypeScript configuration for production builds.",
    "nest-cli.json": "NestJS CLI configuration.",
    "eslint.config.mjs": "ESLint configuration for code linting."
  }
}
```

### Quick purpose by folder

- src/: Application source code.
- src/auth/: Authentication logic (login, token generation, token validation).
- src/auth/guards/: Route protection classes for custom JWT and Passport guards.
- src/auth/strategies/: Passport strategy implementations (local and JWT).
- src/user/: Mock user data access and user endpoints.
- src/config/: Shared configuration values, including JWT secret.
- test/: End-to-end testing setup and test cases.
- root config files: Build, lint, TypeScript, and Nest CLI configuration.

## Requirements

- Node.js 18+
- pnpm

## Install and run

```bash
pnpm install
pnpm start:dev
```

Server runs at:

```text
http://localhost:3000
```

## Current test users

Use one of these accounts to log in:

- john / changeme
- maria / guess
- victor / 123456

## Create JWT (Login)

Request:

```http
POST /auth/login
Content-Type: application/json

{
	"username": "john",
	"password": "changeme"
}
```

Example with curl:

```bash
curl -X POST http://localhost:3000/auth/login \
	-H "Content-Type: application/json" \
	-d "{\"username\":\"john\",\"password\":\"changeme\"}"
```

Example success response:

```json
{
  "accessToken": "<JWT_TOKEN>",
  "userId": 1,
  "username": "john"
}
```

The accessToken value is your JWT.

## Use JWT on protected endpoint

Protected endpoint:

```http
GET /auth/me
Authorization: Bearer <JWT_TOKEN>
```

Example with curl:

```bash
curl http://localhost:3000/auth/me \
	-H "Authorization: Bearer <JWT_TOKEN>"
```

Expected response:

```json
{
  "userId": 1,
  "username": "john"
}
```

## Public endpoint

```http
GET /user
```

This returns all mock users from UserService.

## Where JWT is configured

- JWT secret: src/config/jwt-secret.ts
- JWT module setup: src/auth/auth.module.ts
- Token creation: src/auth/auth.service.ts
- Token verification: src/auth/guards/auth.guard.ts

## Security note

The JWT secret is hardcoded for demo purposes. For production, move it to an environment variable (for example, JWT_SECRET in a .env file) and never commit secrets to source control.
