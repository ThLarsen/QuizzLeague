// main.js - The main entry point for the application
import { quizData } from './data.js';
import { updateStandingsTable } from './standings.js';
import { generateRoundButtons } from './rounds.js';
import { switchTab, initTabs } from './tabs.js';
import { formatDateTime } from './utils.js';

// Global export of switchTab for inline button usage
window.switchTab = switchTab;

// Display last updated timestamp
function displayLastUpdated(data) {
    const formattedDateTime = formatDateTime(data.lastUpdated);
    document.getElementById('standings-last-updated').textContent = formattedDateTime;
    document.getElementById('rounds-last-updated').textContent = formattedDateTime;
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();

    // Display the last updated timestamp
    displayLastUpdated(quizData);
    
    // Initialize the rounds tab
    generateRoundButtons(quizData);
    
    // Initialize the standings tab
    updateStandingsTable(quizData);
    
    // Default to standings tab
    switchTab('standings');
});