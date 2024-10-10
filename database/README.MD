# Dockerized PostgreSQL Setup

This guide provides instructions for setting up a PostgreSQL database using Docker. This setup makes it easy to get a PostgreSQL database running locally with persistence.

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

## Files
- **docker-compose.yml**: Contains the configuration for running PostgreSQL in Docker.
- **.env**: Contains environment variables for the PostgreSQL setup.

## Getting Started
Follow these steps to set up and run the PostgreSQL database.

### 1. Create the `.env` file
Create a file named `.env` and paste the following content into it:

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=challenge
```

Replace `myuser`, `mypassword`, and `mydatabase` with your desired username, password, and database name.

### 2. Start the PostgreSQL Database
Run the following command to start the PostgreSQL service:

```bash
docker-compose up -d
```

- `-d`: Runs the container in detached mode, meaning it runs in the background.

### 3. Stop the PostgreSQL Database
To stop the database container, use the following command:

```bash
docker-compose down
```

This command stops and removes the container while keeping the data intact, as the volume (`postgres_data`) is persistent.

## Connecting to the Database
You can connect to the PostgreSQL database in several ways:

### 1. Using `psql` from Your Local Machine
Run the following command to connect to the database using the `psql` client:

```bash
psql -h localhost -U myuser -d mydatabase
```

You will be prompted to enter the password (`mypassword`).

### 2. Using Docker `exec` to Access the Database
You can also access the running container directly:

```bash
docker exec -it postgres_db psql -U myuser -d mydatabase
```

This command opens a `psql` shell inside the container.

## Persistence
The data in the PostgreSQL container is saved in a Docker volume named `postgres_data`. This ensures that even if you stop or remove the container, your data is retained and will be restored when the container restarts.

## Cleanup
If you want to remove the container and its associated data, use the following command:

```bash
docker-compose down -v
```

The `-v` flag removes the named volume (`postgres_data`) along with the container, which deletes all database data.

## Summary
- Create a `.env` file with the PostgreSQL configuration.
- Create a `docker-compose.yml` file to define the services.
- Use `docker-compose up -d` to start the database.
- Connect using `psql` or via Docker `exec`.
- Data is persisted using a Docker volume.
