-- MySQL Initialization Script for Portfolio Database
-- This script runs automatically when the container is first created

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the portfolio database
USE portfolio;

-- Grant privileges to the application user
-- Note: User is created by MySQL's entrypoint script via MYSQL_USER env var
-- This ensures the user has proper permissions
GRANT ALL PRIVILEGES ON portfolio.* TO 'user'@'%';
FLUSH PRIVILEGES;

-- Show databases for verification
SHOW DATABASES;

-- Show character set and collation
SHOW VARIABLES LIKE 'character_set%';
SHOW VARIABLES LIKE 'collation%';
