#!/bin/bash
set -e

# Run migrations and seeders if database is ready
echo "Waiting for MySQL database connection..."
until php artisan db:monitor --databases=mysql 2>/dev/null || php -r "new PDO('mysql:host='.getenv('DB_HOST').';port='.getenv('DB_PORT').';dbname='.getenv('DB_DATABASE'), getenv('DB_USERNAME'), getenv('DB_PASSWORD'));" 2>/dev/null; do
    echo "MySQL is still warming up... sleeping 2s"
    sleep 2
done

echo "Running migrations and initial database seeders..."
php artisan migrate --force --seed || true

echo "Starting Apache server..."
exec "$@"
