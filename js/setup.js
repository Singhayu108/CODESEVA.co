/**
 * ITRAM MANAGEMENT - Website Setup and Configuration
 * This file contains setup code and configuration for the website
 */

// Configuration Settings
const CONFIG = {
    // Site Information
    site: {
        name: "DEVORA",
        domain: "itrammanagement.com",
        version: "1.0.0"
    },

    // API Endpoints
    api: {
        formspree: "https://formspree.io/f/movdoakz",
        newsletter: "/api/newsletter-subscribe" // Future implementation
    },
    
    // Feature Flags
    features: {
        darkMode: false,
        animations: true,
        newsletter: true,
        cookies: true
    },
    
    // Default Theme Settings
    theme: {
        primary: "#000000",
        secondary: "#FF3B30",
        textColor: "#1A1A1A",
        lightText: "#FFFFFF",
        backgroundColor: "#F5F5F5",
    },
    
    // Cookie Settings
    cookieSettings: {
        necessary: true, // Always required
        analytics: true,
        marketing: false,
        preferences: true
    }
};

/**
 * Website Initialization
 * Handles setup tasks when the website is loaded
 */
function initWebsite() {
    console.log(`Initializing ${CONFIG.site.name} website (v${CONFIG.site.version})`);
    
    // Check browser compatibility
    checkBrowserCompatibility();
    
    // Initialize theme
    initTheme();
    
    // Initialize animations
    if (CONFIG.features.animations) {
        initAnimations();
    }
    
    // Initialize cookies notice if enabled
    if (CONFIG.features.cookies) {
        initCookiesNotice();
    }
    
    console.log("Website initialization complete");
}

/**
 * Check browser compatibility
 * Warns users on older browsers
 */
function checkBrowserCompatibility() {
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdgeHTML = !isIE && !!window.StyleMedia;
    
    if (isIE) {
        showBrowserWarning("Internet Explorer is not supported. Please use a modern browser like Chrome, Firefox, or Edge for the best experience.");
    } else if (isEdgeHTML) {
        showBrowserWarning("You're using an older version of Edge. For the best experience, please update to the latest version.");
    }
}

/**
 * Show browser compatibility warning
 */
function showBrowserWarning(message) {
    // Create warning element
    const warning = document.createElement('div');
    warning.className = 'browser-warning';
    warning.innerHTML = `
        <div class="container">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button id="dismissWarning">Dismiss</button>
        </div>
    `;
    
    // Style the warning
    warning.style.backgroundColor = "#FFF3CD";
    warning.style.color = "#856404";
    warning.style.padding = "1rem";
    warning.style.textAlign = "center";
    warning.style.position = "fixed";
    warning.style.top = "0";
    warning.style.left = "0";
    warning.style.right = "0";
    warning.style.zIndex = "10000";
    
    // Add to body
    document.body.insertBefore(warning, document.body.firstChild);
    
    // Add dismiss functionality
    document.getElementById('dismissWarning').addEventListener('click', () => {
        warning.remove();
    });
}

/**
 * Initialize theme settings
 */
function initTheme() {
    // Check for saved user preferences
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(JSON.parse(savedTheme));
    } else {
        applyTheme(CONFIG.theme);
    }
    
    // Check for system dark mode preference if dark mode feature is enabled
    if (CONFIG.features.darkMode) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            applyDarkMode();
        }
        
        // Listen for changes to system preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                applyDarkMode();
            } else {
                applyTheme(CONFIG.theme);
            }
        });
    }
}

/**
 * Apply theme settings
 */
function applyTheme(theme) {
    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--light-text', theme.lightText);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
}

/**
 * Apply dark mode theme
 */
function applyDarkMode() {
    const darkTheme = {
        primary: "#000000",
        secondary: "#FF3B30",
        textColor: "#F5F5F5",
        lightText: "#FFFFFF",
        backgroundColor: "#121212"
    };
    
    applyTheme(darkTheme);
}

/**
 * Initialize animation settings
 */
function initAnimations() {
    // If AOS is loaded, initialize it
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false
        });
    }
}

/**
 * Initialize cookies notice
 */
function initCookiesNotice() {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    // Check if there are saved cookie settings
    const savedCookieSettings = localStorage.getItem('cookieSettings');
    if (savedCookieSettings) {
        // Update config with saved settings
        const parsedSettings = JSON.parse(savedCookieSettings);
        CONFIG.cookieSettings = {
            ...CONFIG.cookieSettings,
            ...parsedSettings
        };
    }
    
    if (!cookiesAccepted) {
        showCookiesNotice();
    }
}

/**
 * Show cookies notice
 */
function showCookiesNotice() {
    const notice = document.createElement('div');
    notice.className = 'cookies-notice';
    notice.innerHTML = `
        <div class="container">
            <p>We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.</p>
            <div class="cookies-buttons">
                <button id="acceptCookies" class="btn-primary">Accept</button>
                <button id="cookiesSettings" class="btn-secondary">Settings</button>
            </div>
        </div>
    `;
    
    // Style the notice
    notice.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    notice.style.color = "white";
    notice.style.padding = "1.5rem 0";
    notice.style.position = "fixed";
    notice.style.left = "0";
    notice.style.right = "0";
    notice.style.bottom = "0";
    notice.style.zIndex = "1000";
    
    // Create cookie settings panel (hidden initially)
    const settingsPanel = document.createElement('div');
    settingsPanel.className = 'cookie-settings-panel';
    settingsPanel.style.display = 'none';
    settingsPanel.innerHTML = `
        <div class="settings-container">
            <div class="settings-header">
                <h3>Cookie Settings</h3>
                <button id="closeSettings" class="close-btn">&times;</button>
            </div>
            <div class="settings-body">
                <div class="setting-item">
                    <div class="setting-info">
                        <h4>Necessary Cookies</h4>
                        <p>Required for the website to function. Cannot be disabled.</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="necessary-cookies" checked disabled>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <h4>Analytics Cookies</h4>
                        <p>Help us understand how visitors interact with our website.</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="analytics-cookies" ${CONFIG.cookieSettings.analytics ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <h4>Marketing Cookies</h4>
                        <p>Used to track visitors across websites for advertising purposes.</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="marketing-cookies" ${CONFIG.cookieSettings.marketing ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <h4>Preference Cookies</h4>
                        <p>Allow the website to remember choices you make and provide enhanced features.</p>
                    </div>
                    <label class="switch">
                        <input type="checkbox" id="preference-cookies" ${CONFIG.cookieSettings.preferences ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="settings-footer">
                <button id="saveCookieSettings" class="btn-primary">Save Settings</button>
            </div>
        </div>
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'cookie-settings-overlay';
    
    // Add button styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        .cookies-notice .container {
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .cookies-notice p {
            margin: 0;
        }
        .cookies-buttons {
            display: flex;
            gap: 1rem;
        }
        .btn-primary {
            background: #FF3B30;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-secondary {
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            background: #ff1f11;
        }
        .btn-secondary:hover {
            background: rgba(255,255,255,0.1);
        }
        
        /* Cookie Settings Panel Styles */
        .cookie-settings-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            color: #1A1A1A;
            width: 90%;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1001;
            overflow: hidden;
        }
        .settings-container {
            padding: 0;
        }
        .settings-header {
            background: #000;
            color: white;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .settings-header h3 {
            margin: 0;
            font-size: 1.2rem;
        }
        .close-btn {
            background: transparent;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            line-height: 1;
        }
        .settings-body {
            padding: 1.5rem;
            max-height: 60vh;
            overflow-y: auto;
        }
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
        }
        .setting-item:last-child {
            border-bottom: none;
        }
        .setting-info {
            flex: 1;
            padding-right: 1rem;
        }
        .setting-info h4 {
            margin: 0 0 0.5rem 0;
        }
        .setting-info p {
            margin: 0;
            font-size: 0.9rem;
            color: #666;
        }
        .settings-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid #eee;
            text-align: right;
        }
        /* Toggle Switch */
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .slider {
            background-color: #FF3B30;
        }
        input:disabled + .slider {
            opacity: 0.5;
            cursor: not-allowed;
        }
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        /* Overlay */
        .cookie-settings-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1000;
            display: none;
        }
        @media (max-width: 768px) {
            .cookies-notice .container {
                flex-direction: column;
                text-align: center;
            }
            .setting-item {
                flex-direction: column;
                align-items: flex-start;
            }
            .switch {
                margin-top: 1rem;
            }
        }
    `;
    document.head.appendChild(styleEl);
    
    // Add to body
    document.body.appendChild(notice);
    document.body.appendChild(settingsPanel);
    document.body.appendChild(overlay);
    
    // Add event listeners
    document.getElementById('acceptCookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        notice.remove();
    });
    
    document.getElementById('cookiesSettings').addEventListener('click', () => {
        overlay.style.display = 'block';
        settingsPanel.style.display = 'block';
    });
    
    document.getElementById('closeSettings').addEventListener('click', () => {
        overlay.style.display = 'none';
        settingsPanel.style.display = 'none';
    });
    
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        settingsPanel.style.display = 'none';
    });
    
    document.getElementById('saveCookieSettings').addEventListener('click', () => {
        // Save settings to CONFIG and localStorage
        CONFIG.cookieSettings.analytics = document.getElementById('analytics-cookies').checked;
        CONFIG.cookieSettings.marketing = document.getElementById('marketing-cookies').checked;
        CONFIG.cookieSettings.preferences = document.getElementById('preference-cookies').checked;
        
        // Save to localStorage
        localStorage.setItem('cookieSettings', JSON.stringify(CONFIG.cookieSettings));
        localStorage.setItem('cookiesAccepted', 'true');
        
        // Hide panels
        overlay.style.display = 'none';
        settingsPanel.style.display = 'none';
        notice.remove();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Cookie settings saved!';
        successMessage.style.position = 'fixed';
        successMessage.style.bottom = '20px';
        successMessage.style.right = '20px';
        successMessage.style.backgroundColor = '#4CAF50';
        successMessage.style.color = 'white';
        successMessage.style.padding = '10px 20px';
        successMessage.style.borderRadius = '4px';
        successMessage.style.zIndex = '1000';
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

/**
 * Utility function to load scripts dynamically
 */
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    if (callback) {
        script.onload = callback;
    }
    
    document.head.appendChild(script);
}

/**
 * Handle form initialization
 */
function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Ensure Formspree ID is set correctly
        if (contactForm.getAttribute('action') !== CONFIG.api.formspree) {
            contactForm.setAttribute('action', CONFIG.api.formspree);
        }
        
        // Add form submission handling if not already present in main.js
        if (!window.formHandlersInitialized) {
            contactForm.addEventListener('submit', function() {
                const submitBtn = contactForm.querySelector('.submit-btn');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    // Reset button after a timeout (in case the redirect doesn't happen)
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 8000);
                }
            });
        }
    }
    
    // Initialize newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm && CONFIG.features.newsletter) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                // In a real implementation, this would send the data to an API
                console.log('Newsletter subscription for:', email);
                
                // Show success message
                const btn = newsletterForm.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Subscribed!';
                btn.style.backgroundColor = '#4CAF50';
                
                // Reset form
                newsletterForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initWebsite();
    initForms();
}); 