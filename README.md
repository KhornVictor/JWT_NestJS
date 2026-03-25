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
