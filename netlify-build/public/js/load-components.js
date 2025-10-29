// Component Loader - Loads navbar and footer into pages
(function() {
    async function loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
                
                // Execute any scripts in the loaded HTML
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            }
        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
        }
    }

    // Load components when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadComponent('topbar-container', '/components/topbar.html');
            loadComponent('navbar-container', '/components/navbar.html');
            loadComponent('footer-container', '/components/footer.html');
        });
    } else {
        loadComponent('topbar-container', '/components/topbar.html');
        loadComponent('navbar-container', '/components/navbar.html');
        loadComponent('footer-container', '/components/footer.html');
    }
})();
