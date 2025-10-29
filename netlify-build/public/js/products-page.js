// Products Page JavaScript - Loads products dynamically
document.addEventListener('DOMContentLoaded', async () => {
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryEncoded = urlParams.get('categories');
    let category = null;
    
    if (categoryEncoded) {
        try {
            category = atob(categoryEncoded);
        } catch (e) {
            console.error('Invalid category parameter');
        }
    }

    // Load products
    try {
        const products = await API.getProducts(category);
        const productsContainer = document.getElementById('products-container');
        
        if (!productsContainer) {
            console.error('Products container not found');
            return;
        }

        if (products && products.length > 0) {
            productsContainer.innerHTML = products.map(product => `
                <div class="product-card" style="margin: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; display: inline-block; width: 300px; vertical-align: top;">
                    <img src="${product.image || '/wp-content/uploads/sites/20/2024/08/default-product.jpg'}" 
                         alt="${product.name}" 
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;">
                    <h3 style="color: #ff8d2a; margin: 15px 0;">${product.name}</h3>
                    <p style="color: #666;">${product.category || 'General'}</p>
                    <p style="font-weight: bold; color: #333; font-size: 20px;">$${product.price}/day</p>
                    <p style="color: ${product.available ? 'green' : 'red'};">
                        ${product.available ? 'Available' : 'Unavailable'}
                    </p>
                    <button onclick="showPurchaseModal('${product.name.replace(/'/g, "\\'")}', '${product._id}')" 
                       style="display: block; width: 100%; text-align: center; padding: 12px; background: #ff8d2a; color: white; border: none; border-radius: 5px; margin-top: 10px; cursor: pointer; font-size: 16px;">
                        Purchase / Rent
                    </button>
                    <a href="/view-product.html?id=${product._id}" 
                       style="display: block; text-align: center; padding: 12px; background: #333; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                        View Details
                    </a>
                </div>
            `).join('');
        } else {
            productsContainer.innerHTML = '<div style="text-align: center; padding: 50px; color: #666;"><h2>No products available</h2></div>';
        }
    } catch (error) {
        console.error('Error loading products:', error);
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            productsContainer.innerHTML = '<div style="text-align: center; padding: 50px; color: red;"><h2>Error loading products. Please try again later.</h2></div>';
        }
    }
});
