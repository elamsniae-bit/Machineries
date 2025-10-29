# Admin Section Migration Plan
## PHP to Node.js/Netlify/MongoDB Migration

This document outlines the plan for migrating the admin section from PHP/MySQL to Node.js/Netlify/MongoDB.

---

## Current Status ✅

**Already Migrated:**
- ✅ Admin login API (`functions/admin-login.js`)
- ✅ Admin login page (`public/admin/index.html`)
- ✅ All admin panel assets (CSS, JS, fonts, icons)
- ✅ API helper functions (`public/js/api.js`)
- ✅ Some admin API functions:
  - `admin-manage-categories.js`
  - `admin-add-product.js`
  - `admin-edit-product.js`
  - `admin-approve-rental.js`

---

## PHP Admin Structure (Source)

From analyzing `admin/` directory:

1. **`admin/auth/index.php`** - Admin login page
2. **`admin/home/index.php`** - Dashboard (user list, stats)
3. **`admin/products/index.php`** - Product management
4. **`admin/categories/index.php`** - Category management  
5. **`admin/add/index.php`** - Add products
6. **`admin/add2/index.php`** - Add categories (?)
7. **`admin/approve/index.php`** - Approve rental requests

**PHP Components:**
- `components/admin/side.php` - Sidebar navigation
- `components/admin/nav.php` - Top navigation bar
- `components/admin/box.php` - Dashboard statistics boxes

**Database Tables Used:**
- `client` - User/customer data
- `products` - Equipment products
- `categories` - Equipment categories
- Rentals/orders table (needs verification)

---

## Migration Tasks

### Phase 1: HTML Page Migration (Convert PHP to HTML)

#### Task 1.1: Dashboard Page (`home/index.php` → `dashboard.html`)
**File to create:** `netlify-build/public/admin/dashboard.html`

**Features to implement:**
- Dashboard statistics boxes (total users, products, categories, rentals)
- User list table with delete functionality
- Real-time data fetching from MongoDB via API

**API needed:**
- ✅ Already exists: `admin-login.js`
- ⭕ **NEW:** `admin-get-users.js` - Fetch all users
- ⭕ **NEW:** `admin-delete-user.js` - Delete user
- ⭕ **NEW:** `admin-get-stats.js` - Get dashboard statistics

#### Task 1.2: Products Management Page (`products/index.php` → `products.html`)
**File to create:** `netlify-build/public/admin/products.html`

**Features to implement:**
- Product list table (name, price, brand, category, model, condition, year)
- Delete product functionality
- Edit product button (redirect to edit page)
- Add new product button (redirect to add page)

**API needed:**
- ✅ Already exists: `admin-edit-product.js`
- ✅ Already exists: `admin-add-product.js`
- ⭕ **NEW:** `admin-get-products.js` - Fetch all products for admin
- ⭕ **NEW:** `admin-delete-product.js` - Delete product

#### Task 1.3: Categories Management Page (`categories/index.php` → `categories.html`)
**File to create:** `netlify-build/public/admin/categories.html`

**Features to implement:**
- Category list table
- Add new category inline
- Delete category functionality
- Edit category name

**API needed:**
- ✅ Partially exists: `admin-manage-categories.js` (GET, POST, DELETE already implemented!)

#### Task 1.4: Add Product Page (`add/index.php` → `add-product.html`)
**File to create:** `netlify-build/public/admin/add-product.html`

**Features to implement:**
- Product add form with fields:
  - Name, Price, Brand, Category (dropdown), Model
  - Status (new/used dropdown)
  - Year, Image upload, Description, Weight
- Form validation
- Image upload handling
- Success/error messages

**API needed:**
- ✅ Already exists: `admin-add-product.js`
- ⭕ **NEW:** Image upload handling (consider using Cloudinary or store in MongoDB as base64)

#### Task 1.5: Edit Product Page (`products/edit.php` → `edit-product.html`)
**File to create:** `netlify-build/public/admin/edit-product.html`

**Features to implement:**
- Pre-populated product edit form
- Same fields as add product
- Update functionality

**API needed:**
- ✅ Already exists: `admin-edit-product.js`

#### Task 1.6: Approve Rentals Page (`approve/index.php` → `rentals.html`)
**File to create:** `netlify-build/public/admin/rentals.html`

**Features to implement:**
- List of all rental requests
- Approve/Reject buttons
- Filter by status (pending, approved, rejected)
- View rental details (user, product, dates, etc.)

**API needed:**
- ✅ Already exists: `admin-approve-rental.js`
- ⭕ **NEW:** `admin-get-rentals.js` - Fetch all rental requests

---

### Phase 2: Shared Components Migration

#### Task 2.1: Admin Sidebar (`components/admin/side.php` → `sidebar.html`)
**File to create:** `netlify-build/public/components/admin/sidebar.html`

**Features:**
- Navigation links to all admin pages:
  - Dashboard
  - Products
  - Categories
  - Add Product
  - Rentals
  - Users
  - Logout
- Active page highlighting
- Collapsible menu (mobile responsive)

#### Task 2.2: Admin Navbar (`components/admin/nav.php` → `navbar.html`)
**File to create:** `netlify-build/public/components/admin/navbar.html`

**Features:**
- Admin user info display
- Notifications dropdown (optional)
- Search functionality (optional)
- Logout button

#### Task 2.3: Dashboard Boxes (`components/admin/box.php` → JavaScript)
**File to create:** `netlify-build/public/admin/js/dashboard-stats.js`

**Features:**
- Statistics cards:
  - Total Users
  - Total Products
  - Total Categories
  - Pending Rentals
  - Total Revenue (optional)
- Real-time data fetching from MongoDB

---

### Phase 3: API Functions to Create

#### Required New API Functions:

1. **`admin-get-users.js`**
   - Method: GET
   - Auth: Requires admin token
   - Returns: All users from MongoDB
   
2. **`admin-delete-user.js`**
   - Method: DELETE
   - Auth: Requires admin token
   - Body: `{ userId }`
   - Action: Delete user from MongoDB

3. **`admin-get-stats.js`**
   - Method: GET
   - Auth: Requires admin token
   - Returns: Dashboard statistics
   ```json
   {
     "totalUsers": 150,
     "totalProducts": 88,
     "totalCategories": 11,
     "pendingRentals": 5,
     "approvedRentals": 42
   }
   ```

4. **`admin-get-products.js`** (Enhanced version)
   - Method: GET
   - Auth: Requires admin token
   - Returns: All products with full details (including unapproved)

5. **`admin-delete-product.js`**
   - Method: DELETE
   - Auth: Requires admin token
   - Body: `{ productId }`
   - Action: Delete product from MongoDB

6. **`admin-get-rentals.js`**
   - Method: GET
   - Auth: Requires admin token
   - Query params: `?status=pending|approved|rejected` (optional)
   - Returns: All rental requests

---

### Phase 4: JavaScript/Frontend Logic

#### Task 4.1: Admin API Client (`admin/js/admin-api.js`)
**File to create:** `netlify-build/public/admin/js/admin-api.js`

Similar to `public/js/api.js` but specifically for admin operations with admin token management.

#### Task 4.2: Component Loader for Admin
Update `load-components.js` or create admin-specific loader to load sidebar and navbar.

#### Task 4.3: Authentication Guard
**File to create:** `netlify-build/public/admin/js/auth-guard.js`

- Check if admin is logged in
- Verify admin token validity
- Redirect to `/admin/index.html` if not authenticated

---

### Phase 5: Database Schema Verification

Verify MongoDB collections have all required fields:

**Collections:**
- ✅ `categories` - `{ id, name }`
- ✅ `products` - `{ id, price, name, brand, categorie, model, status, year, image, description, weight }`
- ⭕ `users` - Verify structure (currently called `client` in PHP?)
- ⭕ `rentals` - Verify structure

**Action Items:**
1. Check if users are stored in MongoDB (currently might be in `users` collection from auth-register)
2. Verify rental requests structure
3. Ensure all PHP tables are migrated to MongoDB collections

---

## Implementation Strategy

### Option A: Incremental Migration (Recommended)
Migrate one page at a time, test thoroughly, then move to next:

1. ✅ Admin login (already done)
2. Dashboard page + APIs
3. Products management + APIs
4. Categories management (mostly done)
5. Rentals management + APIs
6. Add/Edit products

**Advantages:**
- Can test each feature independently
- Lower risk of breaking existing functionality
- Easier to debug issues

### Option B: Complete Migration
Migrate all pages and APIs together, then test everything:

**Advantages:**
- Faster overall completion
- Consistent approach across all pages

**Disadvantages:**
- Higher risk
- More complex debugging if issues arise

---

## Testing Checklist

After migration, test:

- [ ] Admin login works with correct credentials
- [ ] Admin login rejects incorrect credentials  
- [ ] Dashboard loads and displays correct statistics
- [ ] User list displays all users
- [ ] Can delete users
- [ ] Products list displays all products
- [ ] Can add new products with image upload
- [ ] Can edit existing products
- [ ] Can delete products
- [ ] Categories list displays all categories
- [ ] Can add new categories
- [ ] Can delete categories
- [ ] Rentals list displays all rental requests
- [ ] Can approve/reject rentals
- [ ] Admin logout works correctly
- [ ] Auth guard prevents unauthorized access
- [ ] Mobile responsive design works
- [ ] All navigation links work correctly

---

## File Structure After Migration

```
netlify-build/
├── functions/
│   ├── admin-login.js ✅
│   ├── admin-add-product.js ✅
│   ├── admin-edit-product.js ✅
│   ├── admin-manage-categories.js ✅
│   ├── admin-approve-rental.js ✅
│   ├── admin-get-users.js ⭕
│   ├── admin-delete-user.js ⭕
│   ├── admin-get-stats.js ⭕
│   ├── admin-get-products.js ⭕
│   ├── admin-delete-product.js ⭕
│   └── admin-get-rentals.js ⭕
├── public/
│   ├── admin/
│   │   ├── index.html ✅ (login)
│   │   ├── dashboard.html ⭕
│   │   ├── products.html ⭕
│   │   ├── categories.html ⭕
│   │   ├── add-product.html ⭕
│   │   ├── edit-product.html ⭕
│   │   ├── rentals.html ⭕
│   │   ├── js/
│   │   │   ├── admin-api.js ⭕
│   │   │   ├── auth-guard.js ⭕
│   │   │   ├── dashboard-stats.js ⭕
│   │   │   ├── products-management.js ⭕
│   │   │   └── rentals-management.js ⭕
│   │   └── assets/ ✅ (already copied)
│   └── components/
│       └── admin/
│           ├── sidebar.html ⭕
│           └── navbar.html ⭕
```

Legend:
- ✅ Already exists/migrated
- ⭕ Needs to be created

---

## Estimated Time

Based on complexity:

- **Phase 1 (HTML Pages):** 4-6 hours
- **Phase 2 (Components):** 1-2 hours
- **Phase 3 (API Functions):** 3-4 hours
- **Phase 4 (JavaScript Logic):** 2-3 hours
- **Phase 5 (Testing & Bug Fixes):** 2-3 hours

**Total:** 12-18 hours of focused development work

---

## Next Steps

1. ✅ **Current work completed:**
   - Fixed MongoDB connection
   - Fixed database issues (whitespace trimming, added missing products)
   - Fixed Netlify routing configuration
   - Added horizontal scrolling prevention CSS
   - Updated comprehensive customization guide

2. **Ready to start admin migration:**
   - User confirms they want to proceed with admin migration
   - Start with Phase 1: Dashboard page migration
   - Implement incrementally following Option A strategy

---

## Notes

- The existing admin panel uses Corona Admin template (Bootstrap-based)
- All assets are already in place (`netlify-build/public/admin/assets/`)
- Admin authentication already works (JWT-based)
- Most challenging part will be image upload handling for products
- Consider using Cloudinary for image uploads instead of local storage

---

**Created:** October 29, 2025  
**Author:** Replit Agent  
**Status:** Plan Ready - Awaiting User Approval to Proceed
