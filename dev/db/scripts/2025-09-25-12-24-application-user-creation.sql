/*
 * PostgreSQL-specific user creation and permission script
 * This script uses PostgreSQL-specific syntax and will NOT work on other databases
 * (MySQL, SQL Server, Oracle, etc.)
 */

DO $$
DECLARE
username TEXT := 'application_user';
BEGIN
    -- Create user
EXECUTE format('CREATE USER %I WITH PASSWORD ''postgres_password''', username);

-- Grant Basic Connection Permissions
EXECUTE format('GRANT CONNECT ON DATABASE postgres TO %I', username);

-- Grant Schema Permissions
EXECUTE format('GRANT USAGE ON SCHEMA public TO %I', username);

-- Grant Table Permissions: For existing tables
EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO %I', username);

-- Grant Table Permissions: For future tables (default privileges)
EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO %I', username);

-- Grant Sequence Permissions: For existing sequences
EXECUTE format('GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO %I', username);

-- Grant Sequence Permissions: For future sequences
EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO %I', username);
END $$;