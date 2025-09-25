# Development Environment Setup

This document provides instructions for setting up the development environment
for the VISTA project, including the PostgreSQL database and pgAdmin for
database management.

_(Detailed instructions and specific commands will be refined as the project
progresses.)_

## Prerequisites

Before you begin, ensure you have the following software installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) (v18.0 or higher)
- [pnpm](https://pnpm.io/installation) (v7.0 or higher)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vista
```

### 2. Environment Variables

Create a `.env` file in the root of the project based on the
`dev/env-example.txt` file:

```bash
cp dev/env-example.txt .env
```

Then, update the values in `.env` with proper values for your development
environment.

### 3. Start Development Database

The development environment uses PostgreSQL and pgAdmin. To start these
services:

```bash
cd dev
docker-compose up -d
```

This will start:

- PostgreSQL on port `5432`
- pgAdmin on port `8080`

### 4. Initialize the Database

Once PostgreSQL is running, initialize the database schema by applying the SQL
scripts in the `dev/scripts/` directory:

#### Connect to PostgreSQL via pgAdmin

1. Open your browser and navigate to `http://localhost:8080`
2. Log in with the credentials:
   - Email: `admin@mail.com`
   - Password: `password123`
3. Add a new server with these settings:
   - General: Name it anything (e.g., "Vista DB")
   - Connection:
     - Host name/address: `db` (as defined in docker-compose.yml service name)
     - Port: `5432`
     - Username: `postgres_user`
     - Password: `postgres_password`

#### Execute the Database Scripts

1. Once connected, navigate to the `postgres_db` database in the left panel (not
   the default `postgres` database)
2. Right-click on the `postgres_db` database name and select "Query Tool"
3. Execute both SQL scripts in order:
   - First, run `dev/scripts/2025-09-25-12-24-application-user-creation.sql` to
     create the application user with limited permissions. This is what the
     application uses.
   - Then, run `dev/scripts/2025-09-25-12-34-init.sql` to create the database
     schema

### 5. Install Project Dependencies

From the project root directory:

```bash
pnpm install
```

### 6. Run the Application

```bash
pnpm dev
```

The application will start and be accessible at `http://localhost:3000`

## Troubleshooting

### Docker Issues

If Docker or Docker Compose won't start:

1. Ensure Docker is running: `docker ps`
2. If needed, restart Docker service
3. Run `docker-compose down && docker-compose up -d` to restart the services

### Database Connection Issues

If the application cannot connect to the database:

1. Verify PostgreSQL is running: `docker-compose ps`
2. Ensure the connection sections of `DATABASE_URL` in `.env` matches those in
   `docker-compose.yml`
3. Check that the application user has been created and has the correct
   permissions

### pgAdmin Access Issues

If you cannot access pgAdmin at `http://localhost:8080`:

1. Verify the pgadmin4 container is running: `docker-compose ps`
2. Check the pgadmin logs: `docker-compose logs pgadmin`
3. Ensure port 8080 is not being used by another service
