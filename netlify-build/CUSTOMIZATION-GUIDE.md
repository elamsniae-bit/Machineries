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

**Need Help?** If you have questions about customization, refer to the main `README.md` file or check the code comments in each file.
