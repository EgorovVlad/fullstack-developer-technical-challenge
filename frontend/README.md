# Frontend Application

This is the frontend service for your application, built using React, TypeScript, and Vite. This document will guide you through running and using the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
  - [Production Preview](#production-preview)
- [Code Quality](#code-quality)
- [Project Overview](#project-overview)

## Prerequisites

- Node.js v20.x or higher
- Yarn package manager

## Installation

Install all the dependencies specified in your `package.json` file:

```sh
yarn install
```

This command will set up your project by installing all necessary libraries and packages.

## Running the Application

### Development Mode

To start the Vite development server on port 3000:

```sh
yarn dev
```

This will spin up a development server, allowing you to preview changes live as you make edits. By default, it runs on [http://localhost:3000](http://localhost:3000).

### Production Mode

To create a production-ready version of your app:

```sh
yarn build
```

This command does two things:
1. Compiles TypeScript to JavaScript using `tsc -b`.
2. Bundles the app using Vite's `vite build` command to optimize your app for production.

### Production Preview

To preview the production build locally:

```sh
yarn preview
```

This will serve the built files on port 3000, allowing you to test your production bundle before deploying.

## Environment Variables

The following environment variables are used in the application:

- **`VITE_SERVER_API_URL`**: The URL of the backend server.

## Code Quality

To lint your codebase and enforce consistent coding styles:

```sh
yarn lint
```

This uses ESLint to check your files and ensure your code quality remains high.

## Project Overview

This project is built using **React** and **TypeScript**. Vite is used for fast development and building. Some notable libraries and tools include:

- **@mui/material** for UI components.
- **React Hook Form** for handling form states.
- **Zod** for schema validation.
- **ESLint** and **Prettier** for maintaining code quality.
- **Husky** for pre-commit hooks, ensuring that lint checks are performed before commits.

