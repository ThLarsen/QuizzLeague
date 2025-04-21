// main.js - The main entry point for the application
import { quizData } from './data.js';
import { updateStandingsTable } from './standings.js';
import { generateRoundButtons } from './rounds.js';
import { switchTab, initTabs } from './tabs.js';

// Global export of switchTab for inline button usage
window.switchTab = switchTab;

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
    
    // Initialize the rounds tab
    generateRoundButtons(quizData);
    
    // Initialize the standings tab
    updateStandingsTable(quizData);
    
    // Default to standings tab
    switchTab('standings');
});