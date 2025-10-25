# Heavy Equipment Management System (Equip)

## Overview
This is a PHP-based heavy equipment rental and management system. The application allows users to browse, rent, and manage heavy equipment inventory. It includes both an admin panel and a customer-facing interface.

## Project Structure
- **admin/** - Administrative dashboard and management tools
  - Login system for administrators
  - Product management (add, edit, approve)
  - Category management
  - Order/history tracking
  
- **app/** - Customer dashboard interface
  - User dashboard
  - Product browsing
  
- **saver/** - Database connection and authentication logic
  - connection.php - Database configuration
  - user/ - User authentication (login, register)
  - admin/ - Admin authorization
  
- **components/** - Shared UI components
  - Navigation bars
  - Admin components
  
- **upload/** - File upload directory for product images

## Technology Stack
- **Backend**: PHP 8.2
- **Database**: SQLite (converted from MySQL)
- **Frontend**: HTML, CSS, JavaScript with Bootstrap
- **Admin UI**: Custom admin dashboard template

## Database Setup
The application uses SQLite for data storage. The database is automatically initialized on first run with the following tables:
- `admin` - Administrator accounts
- `categories` - Equipment categories
- `client` - Customer accounts
- `products` - Equipment inventory
- `history` - Rental/transaction history

### Default Admin Credentials
- **Username**: admin
- **Email**: admin@heavyequip.com
- **Password**: admin123

## Key Features
1. **Admin Panel** (`/admin/`)
   - Equipment inventory management
   - Category management
   - Order processing and approval
   - User management

2. **Customer Interface**
   - Browse equipment catalog
   - Product search and filtering
   - Equipment rental requests
   - Dashboard for tracking orders

3. **Database Migration**
   - Converted from MySQL to SQLite for Replit compatibility
   - MySQLi compatibility layer ensures existing code works without modifications

## Configuration Files
- `saver/connection.php` - Database connection and compatibility layer
- `mysqli_compat.php` - MySQLi to PDO compatibility wrapper
- `init_database.php` - Database initialization script

## Running the Application
The application runs on PHP's built-in server:
```bash
php -S 0.0.0.0:5000
```

The server is configured to run automatically via Replit workflows.

## Access Points
- **Homepage**: `/` or `/index.php`
- **Admin Login**: `/admin/`
- **Dashboard**: `/dashboard.php`
- **Products**: `/products.php`
- **Contact**: `/contact.php`

## Recent Changes (October 25, 2025)
- Migrated from MySQL to SQLite database
- Created MySQLi compatibility layer for seamless database transition
- Configured Replit environment for PHP 8.2
- Set up deployment configuration for VM deployment
- Fixed session handling to prevent duplicate session_start() calls
- Initialized database with default admin user and sample categories

## Notes
- The original application was scraped from a WordPress site, so some static content (index.php) still contains WordPress references
- The functional application parts are in the `/admin/` and `/app/` directories
- Static assets and WordPress theme files are preserved for styling purposes
