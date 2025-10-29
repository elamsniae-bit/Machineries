// Purchase Modal Component
(function() {
    // Create modal HTML if it doesn't exist
    function createModal() {
        if (document.getElementById('purchase-modal')) return;
        
        const modalHTML = `
            <div id="purchase-modal" class="purchase-modal">
                <div class="purchase-modal-content">
                    <span class="purchase-modal-close">&times;</span>
                    <h2>Contact Us to Purchase/Rent</h2>
                    <p style="color: #666; margin-bottom: 20px;">Choose how you'd like to get in touch:</p>
                    <div class="purchase-modal-options">
                        <a href="#" id="purchase-whatsapp" class="purchase-option-btn whatsapp">
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.396 5.194 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.408 1.405-5.234-0.321-0.527c-1.341-2.197-2.051-4.72-2.051-7.286 0-7.585 6.17-13.755 13.755-13.755s13.755 6.17 13.755 13.755c0 7.585-6.17 13.755-13.755 13.755zM22.717 19.242c-0.385-0.193-2.279-1.124-2.632-1.252s-0.609-0.193-0.866 0.193c-0.257 0.386-0.996 1.252-1.22 1.511s-0.449 0.289-0.834 0.096c-0.385-0.193-1.626-0.599-3.096-1.911-1.144-1.021-1.916-2.281-2.141-2.666s-0.024-0.594 0.169-0.786c0.174-0.173 0.385-0.451 0.578-0.676s0.257-0.386 0.385-0.643c0.128-0.257 0.064-0.482-0.032-0.676s-0.866-2.087-1.187-2.857c-0.313-0.751-0.631-0.649-0.866-0.661-0.224-0.012-0.481-0.015-0.737-0.015s-0.673 0.096-1.026 0.482c-0.353 0.386-1.348 1.317-1.348 3.211s1.38 3.722 1.572 3.978c0.193 0.257 2.718 4.15 6.584 5.818 0.92 0.396 1.638 0.633 2.197 0.81 0.924 0.293 1.766 0.252 2.432 0.153 0.742-0.111 2.279-0.932 2.601-1.832s0.321-1.672 0.224-1.832c-0.096-0.161-0.353-0.257-0.737-0.451z"/>
                            </svg>
                            Book via WhatsApp
                        </a>
                        <a href="#" id="purchase-email" class="purchase-option-btn email">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            Book via Email
                        </a>
                    </div>
                    <p style="color: #999; font-size: 14px; margin-top: 20px; text-align: center;">
                        Our team will respond to you within 24 hours
                    </p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Show modal function
    window.showPurchaseModal = function(productName, productId) {
        createModal();
        const modal = document.getElementById('purchase-modal');
        const whatsappBtn = document.getElementById('purchase-whatsapp');
        const emailBtn = document.getElementById('purchase-email');
        
        // Update WhatsApp link (placeholder for now - user will update)
        const whatsappMessage = encodeURIComponent(`Hi! I'm interested in renting/purchasing: ${productName}`);
        whatsappBtn.href = `#`; // Placeholder - will be updated to actual WhatsApp link
        whatsappBtn.setAttribute('data-product', productName);
        
        // Update Email link (placeholder for now - user will update)
        const emailSubject = encodeURIComponent(`Inquiry about ${productName}`);
        const emailBody = encodeURIComponent(`Hi,\n\nI'm interested in renting/purchasing: ${productName}\n\nProduct ID: ${productId}\n\nPlease provide me with more information about availability and pricing.\n\nThank you!`);
        emailBtn.href = `#`; // Placeholder - will be updated to actual email
        emailBtn.setAttribute('data-subject', emailSubject);
        emailBtn.setAttribute('data-body', emailBody);
        
        modal.style.display = 'block';
        
        // Close modal when clicking X
        const closeBtn = modal.querySelector('.purchase-modal-close');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    };
    
    // Initialize modal on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createModal);
    } else {
        createModal();
    }
})();
