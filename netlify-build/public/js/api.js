// API Helper Functions for Netlify Serverless Functions
const API_BASE = '/.netlify/functions';

// Helper function to get auth token
function getToken() {
    return localStorage.getItem('token');
}

function getAdminToken() {
    return localStorage.getItem('adminToken');
}

// Check if user is logged in
function isLoggedIn() {
    return !!getToken();
}

function isAdminLoggedIn() {
    return !!getAdminToken();
}

// Logout functions
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

function adminLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    window.location.href = '/admin/';
}

// API Functions
const API = {
    // Get all categories
    async getCategories() {
        const response = await fetch(`${API_BASE}/get-categories`);
        return await response.json();
    },

    // Get products (optionally filtered by category)
    async getProducts(category = null) {
        const url = category 
            ? `${API_BASE}/get-products?category=${category}`
            : `${API_BASE}/get-products`;
        const response = await fetch(url);
        return await response.json();
    },

    // Get single product details
    async getProductDetails(productId) {
        const response = await fetch(`${API_BASE}/get-product-details?productId=${productId}`);
        return await response.json();
    },

    // User login
    async userLogin(email, password) {
        const response = await fetch(`${API_BASE}/auth-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return { ok: response.ok, data };
    },

    // User registration
    async userRegister(name, email, password, phone) {
        const response = await fetch(`${API_BASE}/auth-register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, phone })
        });
        return { ok: response.ok, data: await response.json() };
    },

    // Admin login
    async adminLogin(username, password) {
        const response = await fetch(`${API_BASE}/admin-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('admin', JSON.stringify(data.admin));
        }
        return { ok: response.ok, data };
    },

    // Create rental request
    async createRental(rentalData) {
        const token = getToken();
        const response = await fetch(`${API_BASE}/create-rental`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(rentalData)
        });
        return { ok: response.ok, data: await response.json() };
    },

    // Get rental history
    async getRentalHistory() {
        const token = getToken() || getAdminToken();
        const response = await fetch(`${API_BASE}/get-rental-history`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    },

    // Admin: Add product
    async addProduct(productData) {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE}/admin-add-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        return { ok: response.ok, data: await response.json() };
    },

    // Admin: Edit product
    async editProduct(productData) {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE}/admin-edit-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        return { ok: response.ok, data: await response.json() };
    },

    // Admin: Manage categories
    async getAdminCategories() {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE}/admin-manage-categories`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    },

    async addCategory(name) {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE}/admin-manage-categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });
        return { ok: response.ok, data: await response.json() };
    },

    async deleteCategory(categoryId) {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE}/admin-manage-categories`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ categoryId })
        });
        return { ok: response.ok, data: await response.json() };
    },

    // Admin: Approve/reject rental
    async approveRental(rentalId, status) {
        const token = getAdminToken();
        const response = await fetch(`${API_BASE}/admin-approve-rental`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ rentalId, status })
        });
        return { ok: response.ok, data: await response.json() };
    }
};

// Load navigation categories on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Find navigation menu for categories
    const navMenu = document.querySelector('.elementor-nav-menu') || document.querySelector('nav ul');
    
    if (navMenu) {
        try {
            const categories = await API.getCategories();
            const categoriesHTML = categories.map(cat => {
                const encodedName = btoa(cat.name);
                return `<li class="menu-item"><a href="/products.html?category=${encodedName}">${cat.name}</a></li>`;
            }).join('');
            
            // Find the right place to inject categories
            const categoryPlaceholder = navMenu.querySelector('.category-menu-items');
            if (categoryPlaceholder) {
                categoryPlaceholder.innerHTML = categoriesHTML;
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }
    
    // Update UI based on login status
    const userSection = document.querySelector('.user-section');
    if (userSection) {
        if (isLoggedIn()) {
            const user = JSON.parse(localStorage.getItem('user'));
            userSection.innerHTML = `
                <span>Welcome, ${user.name}</span>
                <a href="dashboard.html">Dashboard</a>
                <a href="#" onclick="logout()">Logout</a>
            `;
        } else {
            userSection.innerHTML = `
                <a href="auth/login.html">Login</a>
                <a href="auth/register.html">Register</a>
            `;
        }
    }
});
