# Customization Guide - Heavy Equipment Rental Application

This guide will help you customize colors, images, and contact links in your application.

## 📧 Contact Links (WhatsApp & Email)

### Location: `netlify-build/public/js/purchase-modal.js`

Find and update these placeholder links:

```javascript
// Line ~35 - WhatsApp Link
whatsappBtn.href = `#`; // REPLACE WITH YOUR WHATSAPP LINK

// Example for WhatsApp:
whatsappBtn.href = `https://wa.me/14065059795?text=${whatsappMessage}`;
// Replace 14065059795 with your WhatsApp number (country code + phone number, no spaces or +)

// Line ~41 - Email Link  
emailBtn.href = `#`; // REPLACE WITH YOUR EMAIL

// Example for Email:
emailBtn.href = `mailto:support@heavyquips.com?subject=${emailSubject}&body=${emailBody}`;
// Replace support@heavyquips.com with your actual email address
```

## 🎨 Primary Colors

### Orange Color (`#ff8d2a` or `rgb(239, 141, 42)`)

**Main CSS File:** `netlify-build/public/css/custom-styles.css`

Find and replace `#ff8d2a` with your desired color:

```css
/* Line ~44 - Email button */
.purchase-option-btn.email {
    background-color: #ff8d2a;  /* CHANGE THIS COLOR */
    color: white;
}
```

**Products Page:** `netlify-build/public/js/products-page.js`

Find and replace the color in product cards:

```javascript
// Line ~35 - Product name heading
<h3 style="color: #ff8d2a; margin: 15px 0;">${product.name}</h3>

// Line ~42 - Purchase button
background: #ff8d2a;
```

**Navbar:** `netlify-build/public/components/navbar.html`

Find and replace:

```html
<!-- Line ~156 - Category links -->
<a href="/products.html?categories=${encodedName}" style="color:rgb(239, 141, 42)" class="dropdown-item">
```

### Changing to Purple (Example)

Replace all instances of:
- `#ff8d2a` with `#9b51e0` (purple hex)
- `rgb(239, 141, 42)` with `rgb(155, 81, 224)` (purple rgb)

## 🖼️ Images

### Logo

**Location:** `netlify-build/public/wp-content/uploads/sites/20/2024/08/EquipLogo1.png`

**How to change:**
1. Upload your new logo to the same directory
2. Name it `EquipLogo1.png` (overwrite existing), OR
3. Update the references in:
   - `netlify-build/public/components/navbar.html` (Line ~70 and Line ~105)

```html
<!-- Line ~70 -->
<img width="289" height="89" src="/wp-content/uploads/sites/20/2024/08/EquipLogo1.png" class="attachment-full size-full wp-image-459" alt="Equip Logo" />

<!-- Line ~105 -->
<img src="/wp-content/uploads/sites/20/2024/08/EquipLogo1.png" title="Equip" alt="Equip Logo" />
```

### Product Images

**Upload Directory:** `netlify-build/public/upload/`

Product images are stored in the MongoDB database with paths relative to `/upload/` directory.

**To add new product images:**
1. Upload image files to `netlify-build/public/upload/`
2. When creating products via the admin panel, reference them as: `/upload/your-image-name.jpg`

**Default Product Image:** `/wp-content/uploads/sites/20/2024/08/default-product.jpg`

### Favicon

**Location:** `netlify-build/public/machineries-logo.png`

Replace this file with your own favicon (keep the name the same, or update all HTML pages).

## 📞 Contact Information (Top Bar)

**Location:** `netlify-build/public/components/navbar.html`

Update these details in the top contact bar (Lines ~14, ~21, ~28):

```html
<!-- Line ~14 - Address -->
<span class="elementor-icon-list-text">1249 N Homestead Rd, North Platte, NE 69101, United States</span>

<!-- Line ~21 - Email -->
<span class="elementor-icon-list-text">support@heavyquips.com</span>

<!-- Line ~28 - Phone -->
<span class="elementor-icon-list-text">+1(406) 505-9795</span>
```

## 📁 Quick Reference - File Locations

| What to Change | File Location | Lines |
|---|---|---|
| WhatsApp Link | `public/js/purchase-modal.js` | ~35 |
| Email Link | `public/js/purchase-modal.js` | ~41 |
| Primary Color (CSS) | `public/css/custom-styles.css` | ~44 |
| Primary Color (Products) | `public/js/products-page.js` | ~35, ~42 |
| Primary Color (Navbar) | `public/components/navbar.html` | ~156 |
| Logo Image | `public/components/navbar.html` | ~70, ~105 |
| Contact Email | `public/components/navbar.html` | ~21 |
| Contact Phone | `public/components/navbar.html` | ~28 |
| Contact Address | `public/components/navbar.html` | ~14 |
| Product Images | `public/upload/` | Upload here |
| Favicon | `public/machineries-logo.png` | Replace file |

## 🚀 After Making Changes

1. **CSS/JS Changes:** Refresh your browser (Ctrl+F5 or Cmd+Shift+R for hard refresh)
2. **Image Changes:** Clear browser cache if images don't update
3. **Component Changes:** The changes will load automatically when you refresh the page

## 🎨 Advanced: Brand Colors

To maintain consistency, consider updating these additional colors:

### Backgrounds
- Navbar background: `#ffffff` (white)
- Top bar: `#f5f5f5` (light gray)

### Buttons
- Secondary buttons: `#333` (dark gray) - used for "View Details"
- WhatsApp button: `#25D366` (WhatsApp green)

Find these in:
- `netlify-build/public/css/custom-styles.css`
- `netlify-build/public/js/products-page.js`

---

## 🏠 Homepage Content

### Hero Section (Main Banner)

**Location:** `netlify-build/public/index.html`

Find and update the welcome text and heading (around lines ~600-650):

```html
<!-- Welcome text -->
<p>Welcome to heavyquips</p>

<!-- Main heading -->
<h1>Premium Caterpillars and Expert Lumberjack.</h1>
<h2>No Compromise.</h2>

<!-- Description text -->
<p>Explore our high-quality caterpillars and durable lumberjack tools, designed for precision, performance, and reliability in every task</p>
```

### About Us Section

**Location:** `netlify-build/public/index.html` (search for `#about` or "About" section)

Update the about us text, images, and statistics in the about section of index.html

### Testimonials Section

**Location:** `netlify-build/public/index.html` (search for `#Testimonals` or testimonials)

Add or modify customer testimonials in the testimonials section

### FAQs Section

**Location:** `netlify-build/public/index.html` (search for `#FAQs`)

Update frequently asked questions and answers

## 🔗 Footer Customization

**Location:** `netlify-build/public/components/footer.html` (if exists) or `netlify-build/public/index.html` (bottom section)

Update footer links, copyright text, and additional contact information

## 🔗 Social Media Links

**Location:** `netlify-build/public/components/navbar.html`

Update social media links in the top bar (Lines ~39-56):

```html
<!-- Facebook -->
<a class="elementor-icon..." href="YOUR_FACEBOOK_URL" target="_blank">

<!-- Twitter -->
<a class="elementor-icon..." href="YOUR_TWITTER_URL" target="_blank">

<!-- YouTube -->
<a class="elementor-icon..." href="YOUR_YOUTUBE_URL" target="_blank">
```

## 🌐 Navigation Menu

**Location:** `netlify-build/public/components/navbar.html`

Update navigation menu items (Lines ~87-100):

```html
<li><a href="/index.html" class="ekit-menu-nav-link">Home</a></li>
<li><a href="/index.html#about" class="ekit-menu-nav-link">About us</a></li>
<li><a href="/index.html#Testimonals" class="ekit-menu-nav-link">Testimonals</a></li>
<li><a href="/index.html#FAQs" class="ekit-menu-nav-link">FAQs</a></li>
<!-- Categories loaded dynamically -->
<li><a href="/contact.html" class="ekit-menu-nav-link">Contact</a></li>
```

**To add a new menu item:**
1. Add a new `<li>` element in the navbar.html
2. Follow the same structure as existing menu items
3. Update the link href to your desired page

## 🗃️ Database Content & Product Management (MongoDB)

**Since the admin UI is not yet available, here's how to manage products and categories directly:**

---

### 📂 **WHERE TO MANAGE PRODUCTS & CATEGORIES**

#### **Option 1: MongoDB Atlas Web Interface** (Recommended)
This is the easiest way to add, edit, delete, and manage products/categories without code.

**Steps:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in with your MongoDB account
3. Select your cluster
4. Click **"Browse Collections"**
5. Select database: `equipment_rental`
6. You'll see these collections:
   - **categories** - Product categories
   - **products** - All products
   - **users** - Customer accounts
   - **contacts** - Contact form submissions
   - **rentals** - Rental requests

#### **Option 2: MongoDB Connection String Setup**
First, you need to set up your MongoDB connection in the `.env` file:

**File Location:** `netlify-build/.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/equipment_rental
```

**How to get your connection string:**
1. Go to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual database password
6. Make sure the database name is `equipment_rental`

---

### 📋 **MANAGING CATEGORIES**

#### **Category Structure:**
```json
{
  "id": 24,
  "name": "Your Category Name"
}
```

#### **How to Add a New Category (MongoDB Atlas):**
1. Open MongoDB Atlas → Browse Collections
2. Select `equipment_rental` database → `categories` collection
3. Click **"INSERT DOCUMENT"**
4. Add the following JSON:
```json
{
  "id": 24,
  "name": "Excavator Attachments"
}
```
5. Click **"Insert"**

**Important Notes:**
- The `id` must be unique (use the next available number)
- The `name` is case-sensitive
- No extra spaces before or after the name

#### **How to Edit a Category:**
1. Find the category in MongoDB Atlas
2. Click the **pencil icon** (Edit)
3. Modify the `name` field
4. Click **"Update"**

#### **How to Delete a Category:**
1. Find the category in MongoDB Atlas
2. Click the **trash icon** (Delete)
3. Confirm deletion
⚠️ **Warning:** Deleting a category won't delete products, but those products won't show under any category

---

### 🛒 **MANAGING PRODUCTS**

#### **Complete Product Structure:**
```json
{
  "id": 135,
  "price": "$599.99",
  "name": "Caterpillar 320 Excavator",
  "brand": "Caterpillar",
  "categorie": "Excavators",
  "model": "320D",
  "productcondition": "used",
  "year": "2022",
  "image": "excavator-320.jpg",
  "des": "Powerful hydraulic excavator perfect for heavy-duty digging and earthmoving tasks. Features advanced fuel efficiency and operator comfort.",
  "weight": "50,000 lbs"
}
```

**Field Descriptions:**
- `id` - Unique product ID (number, e.g., 135)
- `price` - Price with currency symbol (string, e.g., "$599.99")
- `name` - Product name (string)
- `brand` - Manufacturer brand (string, e.g., "Caterpillar", "John Deere")
- `categorie` - **MUST match a category name EXACTLY** (case-sensitive!)
- `model` - Product model number (string)
- `productcondition` - Either "new" or "used" (lowercase)
- `year` - Manufacturing year (string, e.g., "2022")
- `image` - Image filename (must exist in `/upload/` folder)
- `des` - Product description (string, can be long)
- `weight` - Product weight with unit (string, e.g., "50,000 lbs")

---

### ➕ **HOW TO ADD A NEW PRODUCT**

#### **Step 1: Upload Product Image**
1. Navigate to: `netlify-build/public/upload/`
2. Copy your product image to this folder
3. Name it something simple, like: `excavator-320.jpg`
4. Remember this filename - you'll need it in Step 2

**Supported image formats:** `.jpg`, `.jpeg`, `.png`, `.webp`

#### **Step 2: Add Product to MongoDB**
1. Open MongoDB Atlas → Browse Collections
2. Select `equipment_rental` database → `products` collection
3. Click **"INSERT DOCUMENT"**
4. Copy this template and modify it:

```json
{
  "id": 136,
  "price": "$75,000.00",
  "name": "Caterpillar 320 Excavator",
  "brand": "Caterpillar",
  "categorie": "Excavators",
  "model": "320D",
  "productcondition": "used",
  "year": "2022",
  "image": "excavator-320.jpg",
  "des": "Powerful 20-ton hydraulic excavator with advanced fuel efficiency. Perfect for construction sites, earthmoving, and heavy excavation work.",
  "weight": "50,000 lbs"
}
```

5. **Important: Update these fields:**
   - `id` - Use the next available ID number
   - `price`, `name`, `brand`, `categorie`, `model`, etc.
   - `image` - **Must match the filename you uploaded in Step 1**
   - `categorie` - **Must match an existing category name EXACTLY**

6. Click **"Insert"**

---

### ✏️ **HOW TO EDIT AN EXISTING PRODUCT**

#### **Option 1: MongoDB Atlas (Easiest)**
1. Open MongoDB Atlas → Browse Collections
2. Select `equipment_rental` database → `products` collection
3. Find your product (use the search/filter at the top)
4. Click the **pencil icon** (Edit Document)
5. Modify any field (price, name, description, image, etc.)
6. Click **"Update"**

#### **Option 2: Change Product Image**
If you just want to update the image:
1. Upload the new image to `netlify-build/public/upload/`
2. In MongoDB Atlas, edit the product
3. Update the `image` field to the new filename
4. Click **"Update"**

---

### 🗑️ **HOW TO DELETE A PRODUCT**

#### **Using MongoDB Atlas:**
1. Open MongoDB Atlas → Browse Collections
2. Select `equipment_rental` database → `products` collection
3. Find the product you want to delete
4. Click the **trash icon** (Delete Document)
5. Confirm deletion

**Note:** This only removes the product from the database. The image file will still remain in the upload folder.

---

### 🖼️ **MANAGING PRODUCT IMAGES**

#### **Where Product Images Are Stored:**
**Directory:** `netlify-build/public/upload/`

#### **How to Upload New Images:**
1. Navigate to `netlify-build/public/upload/`
2. Copy or upload your image files here
3. Use simple, descriptive filenames:
   - ✅ Good: `excavator-320.jpg`, `bulldozer-d6.png`
   - ❌ Avoid: `IMG_12345.jpg`, `photo (1).png`

#### **Supported Formats:**
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

#### **How to Replace an Image:**
**Option A: Keep the same filename (Easiest)**
1. Delete the old image from `netlify-build/public/upload/`
2. Upload the new image with the **exact same filename**
3. Refresh the website - the new image will appear

**Option B: Use a new filename**
1. Upload the new image to `netlify-build/public/upload/`
2. Open MongoDB Atlas → `products` collection
3. Find the product
4. Edit the `image` field to the new filename
5. Click **"Update"**

#### **Image Optimization Tips:**
- Recommended size: 800x600 pixels
- Keep file size under 500KB for faster loading
- Use `.jpg` for photos, `.png` for graphics with transparency

---

### 🔧 **TROUBLESHOOTING COMMON ISSUES**

#### **Problem: Products not showing in a category**
**Solution:**
1. Check that the `categorie` field matches the category name **exactly** (case-sensitive)
2. Example: "Excavators" ≠ "excavators" ≠ "Excavator"
3. Run the database fix script:
```bash
cd netlify-build
node scripts/fix-database.js
```

#### **Problem: Product image not loading**
**Solutions:**
1. Verify the image file exists in `netlify-build/public/upload/`
2. Check that the `image` field in MongoDB matches the filename exactly
3. Make sure the image format is supported (`.jpg`, `.png`, `.webp`)
4. Try opening the image directly: `http://localhost:5000/upload/your-image.jpg`

#### **Problem: Category not appearing in navbar dropdown**
**Solution:**
1. Check that the category exists in the `categories` collection
2. Verify the category name has no extra spaces
3. Restart the Netlify Dev Server

---

### 📊 **CURRENT DATABASE SUMMARY**

**Database Name:** `equipment_rental`

**Collections:**
- `categories` - 11 equipment categories
- `products` - 88 products across all categories
- `users` - Customer and admin accounts
- `contacts` - Contact form submissions
- `rentals` - Equipment rental requests

**Existing Categories (11 total):**
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
11. Chainsaw (28 products)

---

### ⚙️ **ALTERNATIVE: Using Database Scripts**

If you prefer using scripts instead of MongoDB Atlas:

#### **Add Multiple Products at Once:**
1. Edit: `netlify-build/populate-database.js`
2. Add your products to the `products` array
3. Run: `cd netlify-build && node populate-database.js`

#### **Fix Database Issues:**
```bash
cd netlify-build
node scripts/fix-database.js
```

This script will:
- Trim whitespace from category names
- Verify product/category matching
- Add any missing products

---

### 🎯 **QUICK REFERENCE TABLE**

| Task | File/Location | Method |
|------|---------------|--------|
| **Add MongoDB Connection** | `netlify-build/.env` | Edit `.env` file, add `MONGODB_URI` |
| **Add/Edit Categories** | MongoDB Atlas | Browse Collections → `categories` |
| **Add/Edit Products** | MongoDB Atlas | Browse Collections → `products` |
| **Upload Product Images** | `netlify-build/public/upload/` | Copy files to this folder |
| **View All Products** | MongoDB Atlas | Database: `equipment_rental` → Collection: `products` |
| **Delete Products** | MongoDB Atlas | Find product → Click trash icon |
| **Fix Database Issues** | Terminal | `cd netlify-build && node scripts/fix-database.js` |

---

### ⚠️ **IMPORTANT REMINDERS**

1. **Always match category names exactly** - "Chainsaw" ≠ "chainsaw"
2. **Image filenames are case-sensitive** - "Image.jpg" ≠ "image.jpg"
3. **Upload images BEFORE adding products** - Otherwise broken image links
4. **Use unique product IDs** - Don't reuse existing IDs
5. **Restart the server after database changes** - To see updates immediately

---

### 🚀 **FUTURE: Admin UI**

Once the admin panel is fully migrated, you'll be able to:
- Add/Edit/Delete products through a web interface
- Upload images directly through the admin panel
- Manage categories visually
- View rental requests and approve them
- Manage users and permissions

**Admin Panel Location:** `/admin/dashboard.html` (after migration)

## 📝 Contact Page

**Location:** `netlify-build/public/contact.html`

Update contact form settings and contact information displayed on the contact page.

**API Endpoint:** `netlify-build/functions/submit-contact.js`

Configure where contact form submissions are sent (currently saves to MongoDB `contacts` collection).

## 🔐 Authentication Settings

### User Registration/Login

**API Files:**
- Registration: `netlify-build/functions/auth-register.js`
- Login: `netlify-build/functions/auth-login.js`

**Frontend:**
- Login page: `netlify-build/public/auth/login.html`
- Register page: `netlify-build/public/auth/register.html`

### Admin Login

**API File:** `netlify-build/functions/admin-login.js`
**Frontend:** `netlify-build/public/admin/index.html`

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change the default admin password before deploying to production!

## 🌍 Google Translate Settings

**Location:** Bottom of all HTML pages (e.g., `netlify-build/public/index.html` line ~2796)

```javascript
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},  // Change 'en' to your default language
        'google_translate_element'
    );
}
```

**To change default language:**
- English: `'en'`
- Spanish: `'es'`
- French: `'fr'`
- German: `'de'`

## ⚙️ API Configuration

### MongoDB Connection

**File:** `netlify-build/config/database.js`

The database name is `equipment_rental`. To change it:
```javascript
const db = client.db('equipment_rental');  // Change database name here
```

**Environment Variable:** `MONGODB_URI` (set in Replit Secrets or Netlify Environment Variables)

### API Functions Location

All serverless functions are in: `netlify-build/functions/`

**Available API Endpoints:**
- `/.netlify/functions/get-categories` - Get all categories
- `/.netlify/functions/get-products?category=<encoded_name>` - Get products by category
- `/.netlify/functions/get-product-details?productId=<id>` - Get single product
- `/.netlify/functions/auth-register` - User registration
- `/.netlify/functions/auth-login` - User login
- `/.netlify/functions/admin-login` - Admin login
- `/.netlify/functions/create-rental` - Create rental request
- `/.netlify/functions/submit-contact` - Submit contact form
- And more in the functions directory...

## 🎨 CSS Customization

### Main Stylesheet

**File:** `netlify-build/public/css/custom-styles.css`

This file contains:
- Horizontal scrolling prevention
- Purchase modal styles
- Responsive design adjustments
- Custom overrides

### Elementor CSS

Elementor-generated CSS is in: `netlify-build/public/wp-content/uploads/sites/20/elementor/css/`

**Note:** These files are auto-generated from the original WordPress theme. Modify with caution.

## 📦 Deployment Configuration

### Netlify Configuration

**File:** `netlify-build/netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "public"
  functions = "functions"

[dev]
  port = 5000
  autoLaunch = false

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Environment Variables for Production

**Required Secrets (Set in Netlify Dashboard → Site Settings → Environment Variables):**
- `MONGODB_URI` - Your MongoDB connection string
- Any other API keys your application needs

### Build Settings

**File:** `netlify-build/package.json`

```json
{
  "scripts": {
    "dev": "netlify dev",
    "build": "echo 'Build complete'",
    "deploy": "netlify deploy --prod"
  }
}
```

## 📱 Responsive Design

### Mobile Breakpoints

**File:** `netlify-build/public/css/custom-styles.css` (line ~129)

```css
@media (max-width: 768px) {
    /* Mobile styles here */
}
```

### Tablet/Desktop Adjustments

Modify Elementor breakpoints in the CSS or adjust specific component styles in custom-styles.css

## 🛠️ Admin Panel (Coming Soon)

After admin section migration, you'll be able to:
- Add/Edit/Delete Products
- Manage Categories
- View and Approve Rental Requests
- Manage Users
- View Contact Form Submissions

**Admin Panel Location:** `/admin/dashboard.html` (after migration)

## 📊 Analytics & Tracking

To add Google Analytics or other tracking:

**Location:** Add to `<head>` section of all HTML pages

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## 🔍 SEO Customization

### Page Titles & Meta Descriptions

Update in each HTML file's `<head>` section:

```html
<title>Your Page Title</title>
<meta name="description" content="Your page description">
<meta name="keywords" content="heavy equipment, rental, machinery">
```

### Favicon

**Location:** `netlify-build/public/machineries-logo.png`

Also update references in HTML files:
```html
<link rel="icon" type="image/png" href="/machineries-logo.png">
```

## 🚨 Common Customization Mistakes to Avoid

1. **Category name mismatch:** Ensure category names in MongoDB match exactly (case-sensitive, no extra spaces)
2. **Image paths:** Always use paths relative to `/public/` directory (e.g., `/upload/image.jpg`)
3. **Hard-coded URLs:** Avoid using localhost or development URLs in production code
4. **Missing environment variables:** Always set `MONGODB_URI` before deployment
5. **Cache issues:** After CSS/JS changes, do a hard refresh (Ctrl+F5 or Cmd+Shift+R)

## 📂 Complete Directory Structure

```
netlify-build/
├── config/
│   └── database.js              # MongoDB connection
├── functions/                   # Serverless API functions
│   ├── get-categories.js
│   ├── get-products.js
│   ├── auth-login.js
│   └── [all other APIs]
├── public/                      # Static files (served to users)
│   ├── components/              # Reusable components
│   │   ├── navbar.html
│   │   ├── footer.html
│   │   └── topbar.html
│   ├── css/
│   │   └── custom-styles.css   # Your custom CSS
│   ├── js/
│   │   ├── api.js              # API helper functions
│   │   ├── app.js              # Main app logic
│   │   ├── load-components.js  # Component loader
│   │   └── products-page.js    # Products page logic
│   ├── upload/                  # Product images
│   ├── auth/                    # Login/Register pages
│   ├── admin/                   # Admin panel (after migration)
│   ├── index.html              # Homepage
│   ├── products.html           # Products page
│   ├── contact.html            # Contact page
│   ├── dashboard.html          # User dashboard
│   └── view-product.html       # Product details
├── scripts/
│   └── fix-database.js         # Database maintenance script
├── netlify.toml                # Netlify configuration
└── package.json                # Dependencies

```

---

**Need Help?** If you have questions about customization, refer to the main `README.md` file or check the code comments in each file.

## 🆘 Getting Support

If you encounter issues:
1. Check the browser console for JavaScript errors (F12 → Console tab)
2. Review Netlify function logs in the Netlify dashboard
3. Run the database fix script: `node scripts/fix-database.js`
4. Verify all environment variables are set correctly
5. Clear browser cache and do a hard refresh
