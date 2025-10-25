// Main application JavaScript
// Handles API calls to serverless functions

const API_BASE = '/.netlify/functions';

// Fetch categories for navigation menu
async function loadCategories() {
  try {
    const response = await fetch(`${API_BASE}/get-categories`);
    const categories = await response.json();
    
    // Populate the categories dropdown in navigation
    const categoryMenu = document.querySelector('.categories-dropdown');
    if (categoryMenu && categories.length > 0) {
      categoryMenu.innerHTML = categories.map(cat => `
        <li class="dropdown-item">
          <a href="/products.html?category=${encodeURIComponent(btoa(cat.name))}" 
             style="color:rgb(239, 141, 42)">
            ${cat.name}
          </a>
        </li>
      `).join('');
    } else if (categoryMenu) {
      categoryMenu.innerHTML = '<li style="color:red;">No available products</li>';
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('userData');
  
  if (token && user) {
    // Show dashboard link instead of login
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.href = '/dashboard.html';
      loginBtn.textContent = 'Dashboard';
    }
    return true;
  }
  return false;
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  checkAuth();
});
