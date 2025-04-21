// tabs.js - Handles the tab switching functionality

/**
 * Switches between tabs
 * @param {string} tabName - The name of the tab to switch to
 */
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';
    
    // Add active class to the clicked tab
    document.querySelectorAll('.tab').forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabName)) {
            tab.classList.add('active');
        }
    });
}

/**
 * Initializes tab event listeners
 */
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Extract tab name from the onclick attribute
            const onclickAttr = e.target.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/switchTab\('([^']+)'\)/);
                if (match && match[1]) {
                    switchTab(match[1]);
                }
            }
        });
    });
}

export { switchTab, initTabs };