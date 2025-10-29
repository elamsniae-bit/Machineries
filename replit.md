# Heavy Equipment Management System (Machineries)

## Overview
This is a **Node.js/MongoDB-based** heavy equipment rental and management system built for Netlify deployment. The application allows users to browse, rent, and manage heavy equipment inventory. It includes both an admin panel and a customer-facing interface with full API integration.

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
- **Backend**: Node.js with Netlify Serverless Functions
- **Database**: MongoDB Atlas (cloud-hosted)
- **Frontend**: HTML, CSS, JavaScript
- **Framework**: Netlify with automatic deployments
- **Admin UI**: Custom admin dashboard with JWT authentication

## Database Setup
The application uses MongoDB Atlas for data storage. The database contains:
- **categories** - 11 equipment categories
- **products** - 88 products (varying per category)
- **users** - Customer and admin accounts
- **contacts** - Contact form submissions
- **rentals** - Equipment rental requests

### Categories (11 Total)
1. Excavators (6 products)
2. Bulldozers (6 products)
3. Wheel Loaders (6 products)
4. Backhoe Loaders (6 products)
5. Skid Steer Loaders (6 products)
6. Motor Graders (6 products)
7. Dump Trucks (6 products)
8. Concrete Mixers (6 products)
9. Cranes (6 products)
10. Forklifts (6 products)
11. Chainsaw (8 products)

### Default Admin Credentials
- **Username**: admin
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
The application runs on Netlify Dev Server:
```bash
cd netlify-build
netlify dev
```

The server is configured to run automatically via Replit workflows and serves on `http://localhost:5000`

## Access Points
- **Homepage**: `/` or `/index.html`
- **Products**: `/products.html` (with category filtering)
- **Product Details**: `/view-product.html?id=<product_id>`
- **Contact**: `/contact.html` (working contact form)
- **Admin Login**: `/admin/`
- **Admin Dashboard**: `/admin/dashboard.html`
- **User Dashboard**: `/dashboard.html`

## Recent Changes

### October 29, 2025
- ✅ **Added Purchase button contact modal:**
  - Replaced page-reload behavior with popup modal
  - Modal shows WhatsApp and Email contact options
  - WhatsApp pre-fills message with product name
  - Email pre-fills subject and body with product details
  - Beautiful responsive design with animations
- ✅ **Fixed Chainsaw category completely:**
  - Configured MongoDB Atlas connection (MONGODB_URI)
  - Copied all 8 Chainsaw product images to correct location
  - Populated database with all 88 products including 8 Chainsaw products
  - Verified all images loading correctly
  - Fixed API connectivity (all functions returning 200 OK)
- ✅ **Fixed Netlify routing configuration:**
  - Removed problematic catch-all redirect that was breaking multi-page navigation
  - Products, contact, and other pages now load correctly
- ✅ **Fixed horizontal scrolling/overflow:**
  - Added comprehensive CSS to prevent horizontal scrolling on all pages
  - Fixed Elementor container overflow issues
- ✅ **Massively expanded CUSTOMIZATION-GUIDE.md:**
  - Homepage content, navigation, footer customization
  - Database updates, API configuration, deployment instructions
  - Complete directory structure and common mistakes guide
- ✅ **Created comprehensive ADMIN-MIGRATION-PLAN.md:**
  - Detailed analysis of PHP admin section
  - Phased migration strategy (dashboard, products, categories, rentals)
  - Complete task breakdown for admin feature implementation

### October 26, 2025
- ✅ **Complete migration from PHP to Node.js/Netlify**
- ✅ Populated MongoDB with **11 categories** and **88 products**
- ✅ Created working contact page with API integration
- ✅ Fixed navbar to display all product categories dynamically
- ✅ All API endpoints working (13 serverless functions)
- ✅ Created comprehensive GitHub to Netlify deployment guide
- ✅ Set up proper .gitignore for GitHub deployment
- ✅ All navigation links and footer links working properly

## Deployment
See `GITHUB-NETLIFY-DEPLOYMENT-GUIDE.md` for complete instructions on deploying to Netlify via GitHub.

## Notes
- The original application was scraped from a WordPress site, so some static content still contains WordPress references for styling
- The functional application is in the `/netlify-build/` directory
- Old PHP version remains in root directory for reference only
