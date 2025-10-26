# 🔌 API Integration Guide - Converting PHP to JavaScript

## Quick Reference: PHP → JavaScript Conversions

This guide shows you EXACTLY how to replace PHP database calls with API calls.

---

## 1. FETCHING CATEGORIES (Navigation Menu)

### ❌ OLD PHP CODE (from nav.php):
```php
<?php
include("saver/connection.php");
$query = mysqli_query($connection, "SELECT * FROM `categories` ");
while($load = mysqli_fetch_array($query)){
    $name = $load['name'];
    ?>
    <li><a href="products.php?categories=<?php echo base64_encode($name) ?>"><?php echo $name ?></a></li>
    <?php
}
?>
```

### ✅ NEW JAVASCRIPT CODE:
```html
<ul id="categories-menu">
    <!-- Categories loaded here -->
</ul>

<script>
// Fetch and display categories
fetch('/.netlify/functions/get-categories')
    .then(res => res.json())
    .then(categories => {
        const menu = document.getElementById('categories-menu');
        categories.forEach(cat => {
            const encodedName = btoa(cat.name); // Base64 encode like PHP
            menu.innerHTML += `
                <li>
                    <a href="products.html?categories=${encodedName}">${cat.name}</a>
                </li>
            `;
        });
    })
    .catch(err => console.error('Error loading categories:', err));
</script>
```

---

## 2. LISTING PRODUCTS

### ❌ OLD PHP CODE (from products.php):
```php
<?php
$categorie = base64_decode($_GET['categories']);
$query = mysqli_query($connection, "SELECT * FROM `products` WHERE `categorie` = '$categorie'");
while($load = mysqli_fetch_array($query)){
    ?>
    <div class="product-card">
        <h4><?php echo $load['name'] ?></h4>
        <p>$<?php echo $load['price'] ?></p>
        <img src="upload/<?php echo $load['image'] ?>" />
    </div>
    <?php
}
?>
```

### ✅ NEW JAVASCRIPT CODE:
```html
<div id="products-grid">
    <!-- Products loaded here -->
</div>

<script>
// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('categories'); // Already base64 encoded

// Fetch products
const url = category 
    ? `/.netlify/functions/get-products?category=${category}`
    : '/.netlify/functions/get-products';

fetch(url)
    .then(res => res.json())
    .then(products => {
        const grid = document.getElementById('products-grid');
        products.forEach(product => {
            grid.innerHTML += `
                <div class="product-card">
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                    <img src="upload/${product.image}" alt="${product.name}" />
                    <a href="view-product.html?id=${product._id}">View Details</a>
                </div>
            `;
        });
    });
</script>
```

---

## 3. USER LOGIN FORM

### ❌ OLD PHP CODE (from auth/login.php):
```php
<form action="saver/user/login.php" method="POST">
    <input type="email" name="email" required />
    <input type="password" name="password" required />
    <button type="submit">Login</button>
</form>
```

### ✅ NEW JAVASCRIPT CODE:
```html
<form id="loginForm">
    <input type="email" id="email" required />
    <input type="password" id="password" required />
    <button type="submit">Login</button>
</form>
<div id="message"></div>

<script>
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/.netlify/functions/auth-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('message').innerText = data.error;
        }
    } catch (err) {
        document.getElementById('message').innerText = 'Login failed';
    }
});
</script>
```

---

## 4. USER REGISTRATION

### ❌ OLD PHP CODE:
```php
<form action="saver/user/register.php" method="POST">
    <input type="text" name="name" required />
    <input type="email" name="email" required />
    <input type="password" name="password" required />
    <input type="tel" name="phone" required />
    <button type="submit">Register</button>
</form>
```

### ✅ NEW JAVASCRIPT CODE:
```html
<form id="registerForm">
    <input type="text" id="name" required />
    <input type="email" id="email" required />
    <input type="password" id="password" required />
    <input type="tel" id="phone" required />
    <button type="submit">Register</button>
</form>

<script>
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value
    };
    
    const response = await fetch('/.netlify/functions/auth-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    } else {
        alert(data.error);
    }
});
</script>
```

---

## 5. CREATE RENTAL REQUEST

### ❌ OLD PHP CODE (from process.php):
```php
<?php
session_start();
$product_id = $_GET['product'];
$user_id = $_SESSION['user_id'];
// ... more fields

mysqli_query($connection, "INSERT INTO history ...");
?>
```

### ✅ NEW JAVASCRIPT CODE:
```html
<form id="rentalForm">
    <input type="text" id="rec_name" placeholder="Your Name" required />
    <input type="email" id="rec_email" placeholder="Email" required />
    <input type="tel" id="rec_phone" placeholder="Phone" required />
    <textarea id="rec_address" placeholder="Address" required></textarea>
    <input type="text" id="postal" placeholder="Postal Code" />
    <button type="submit">Submit Rental Request</button>
</form>

<script>
// Get product ID from URL
const productId = new URLSearchParams(window.location.search).get('product');

document.getElementById('rentalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get auth token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login first');
        window.location.href = 'login.html';
        return;
    }
    
    const rentalData = {
        productId: atob(productId), // Decode base64 product ID
        rec_name: document.getElementById('rec_name').value,
        rec_email: document.getElementById('rec_email').value,
        rec_phone: document.getElementById('rec_phone').value,
        rec_address: document.getElementById('rec_address').value,
        postal: document.getElementById('postal').value,
        quality: 'Standard'
    };
    
    const response = await fetch('/.netlify/functions/create-rental', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(rentalData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
        alert('Rental request submitted successfully!');
        window.location.href = 'dashboard.html';
    } else {
        alert(data.error);
    }
});
</script>
```

---

## 6. ADMIN LOGIN

### ✅ NEW JAVASCRIPT CODE:
```html
<form id="adminLoginForm">
    <input type="text" id="username" placeholder="Username" required />
    <input type="password" id="password" placeholder="Password" required />
    <button type="submit">Admin Login</button>
</form>

<script>
document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const response = await fetch('/.netlify/functions/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        window.location.href = 'dashboard.html';
    } else {
        alert(data.error);
    }
});
</script>
```

---

## 7. ADMIN ADD PRODUCT

### ✅ NEW JAVASCRIPT CODE:
```html
<form id="addProductForm">
    <input type="text" id="name" placeholder="Product Name" required />
    <input type="number" id="price" placeholder="Price" required />
    <input type="text" id="brand" placeholder="Brand" />
    <select id="categorie" required>
        <!-- Categories loaded dynamically -->
    </select>
    <input type="text" id="model" placeholder="Model" />
    <input type="number" id="year" placeholder="Year" />
    <textarea id="des" placeholder="Description"></textarea>
    <button type="submit">Add Product</button>
</form>

<script>
// Load categories into dropdown
fetch('/.netlify/functions/get-categories')
    .then(res => res.json())
    .then(categories => {
        const select = document.getElementById('categorie');
        categories.forEach(cat => {
            select.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
        });
    });

// Submit form
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        alert('Admin access required');
        return;
    }
    
    const productData = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        brand: document.getElementById('brand').value,
        categorie: document.getElementById('categorie').value,
        model: document.getElementById('model').value,
        year: document.getElementById('year').value,
        des: document.getElementById('des').value,
        image: '', // Handle file upload separately
        productcondition: 'Good',
        weight: ''
    };
    
    const response = await fetch('/.netlify/functions/admin-add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(productData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
        alert('Product added successfully!');
        document.getElementById('addProductForm').reset();
    } else {
        alert(data.error);
    }
});
</script>
```

---

## 8. VIEW RENTAL HISTORY (User Dashboard)

### ✅ NEW JAVASCRIPT CODE:
```html
<div id="rental-history">
    <h2>My Rentals</h2>
    <div id="rentals-list"></div>
</div>

<script>
const token = localStorage.getItem('token');

fetch('/.netlify/functions/get-rental-history', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(res => res.json())
.then(rentals => {
    const list = document.getElementById('rentals-list');
    
    rentals.forEach(rental => {
        list.innerHTML += `
            <div class="rental-card">
                <h3>${rental.product.name}</h3>
                <p>Status: ${rental.status}</p>
                <p>Date: ${new Date(rental.date).toLocaleDateString()}</p>
                <p>Address: ${rental.rec_address}</p>
            </div>
        `;
    });
});
</script>
```

---

## 9. ADMIN VIEW ALL RENTALS

Same as #8, but admin sees ALL rentals, not just their own.

---

## 10. ADMIN APPROVE RENTAL

### ✅ NEW JAVASCRIPT CODE:
```javascript
async function approveRental(rentalId) {
    const adminToken = localStorage.getItem('adminToken');
    
    const response = await fetch('/.netlify/functions/admin-approve-rental', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
            rentalId: rentalId,
            status: 'Approved'
        })
    });
    
    if (response.ok) {
        alert('Rental approved!');
        location.reload();
    }
}

async function rejectRental(rentalId) {
    const adminToken = localStorage.getItem('adminToken');
    
    const response = await fetch('/.netlify/functions/admin-approve-rental', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
            rentalId: rentalId,
            status: 'Rejected'
        })
    });
    
    if (response.ok) {
        alert('Rental rejected');
        location.reload();
    }
}
```

---

## 🔐 AUTHENTICATION HELPER

Add this to every protected page:

```javascript
// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Check if admin is logged in
function checkAdminAuth() {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        window.location.href = '/admin/index.html';
        return false;
    }
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Admin logout
function adminLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    window.location.href = '/admin/index.html';
}
```

---

**That's it! Every PHP → JavaScript conversion you need! 🎉**
