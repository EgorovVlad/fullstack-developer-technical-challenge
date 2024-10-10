# Backend Application

This is the backend service for your application, built using Node.js, TypeScript, Prisma, and Express. This document will guide you through running and using the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
  - [Database Setup](#database-setup)
  - [Database Migrations](#database-migrations)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Code Quality](#code-quality)

## Prerequisites

- Node.js v20.x or higher
- Yarn package manager
- Docker and Docker Compose

## Installation

1. Start the Dockerized database:

   Navigate to the `database` directory:

   ```sh
   cd ../database
   ```

   Start the PostgreSQL database:

   ```sh
   docker-compose up -d
   ```

   This command will start a PostgreSQL container with the following configuration:

  - **User**: `user`
  - **Password**: `password`
  - **Database**: `challenge`

   The database will be accessible on port `5432`.

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Generate the Prisma client:

   ```sh
   yarn prisma:generate
   ```

4. Run database migrations:

   ```sh
   yarn prisma:migrate
   ```

## Running the Application

### Development Mode

To run the application in development mode with automatic server restarts:

```sh
yarn start:dev
```

This uses `nodemon` to watch for changes in your codebase and restart the server as needed.

### Production Mode

To build and run the application in production mode:

1. Build the application:

   ```sh
   yarn build
   ```

2. Start the application:

   ```sh
   yarn start:prod
   ```

## Database Migrations

To run Prisma migrations:

```sh
yarn prisma:migrate
```

To generate Prisma client:

```sh
yarn prisma:generate
```

## Scripts

The project includes several useful scripts defined in `package.json`:

- **`yarn start:dev`**: Runs the app in development mode with `nodemon`.
- **`yarn start:prod`**: Runs the compiled JavaScript in production mode.
- **`yarn build`**: Builds the TypeScript code into JavaScript in the `dist` folder.
- **`yarn prisma:migrate`**: Runs Prisma database migrations.
- **`yarn prisma:generate`**: Generates Prisma client code based on the schema.
- **`yarn lint`**: Runs ESLint to lint your code.
- **`yarn format`**: Formats the code using Prettier.

## Environment Variables

The following environment variables are used in the application:

- **`DATABASE_URL`**: Connection string for the database.
- **`PORT`**: The port number for the Express server.
- **`CORS_ORIGIN`**: The origin allowed by CORS.
- **`RATE_LIMIT_MAX`**: Maximum number of requests allowed from an IP in the rate limit window.
- **`RATE_LIMIT_WINDOW_MS`**: Duration for rate limiting (in milliseconds).

## API Documentation

The API documentation is auto-generated using **Swagger** and is available at:

```
http://localhost:3000/
```

The API has the logs endpoint available at:

```
http://localhost:3000/logs
```

Use this URL to explore the endpoints, view request/response formats, and try out the API directly.

## Code Quality

To maintain high code quality, the following tools are used:

- **ESLint**: For identifying and fixing code issues.
- **Prettier**: For formatting code consistently.
- **Husky & lint-staged**: To automatically lint and format code before committing.

To lint your code:

```sh
yarn lint
```

To format your code:

```sh
yarn format
```
