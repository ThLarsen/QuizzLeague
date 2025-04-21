// standings.js - Handles the standings tab functionality
import { calculateTotalPoints, generateRoundScoresSummary } from './utils.js';

/**
 * Calculate standings for all teams
 * @param {Object} data - The quiz data object
 * @returns {Array} - Array of team standings
 */
function calculateStandings(data) {
    const standings = [];
    
    // Calculate raw scores for each team
    data.teams.forEach(team => {
        const teamScores = data.scores.filter(score => score.teamId === team.id);
        const totalPoints = calculateTotalPoints(team.id, data.scores);
        const played = teamScores.length;
        const average = played > 0 ? totalPoints / played : 0;
        
        standings.push({
            teamId: team.id,
            teamName: team.name,
            played,
            totalPoints,
            average
        });
    });
    
    return standings;
}

/**
 * Updates the standings table in the UI
 * @param {Object} data - The quiz data object
 */
function updateStandingsTable(data) {
    const tbody = document.getElementById('standings-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const standings = calculateStandings(data);
    
    // Sort by total points (descending), then by average (descending)
    const sortedStandings = standings.sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) {
            return b.totalPoints - a.totalPoints;
        }
        return b.average - a.average;
    });
    
    // Handle shared places in the standings display
    let currentRank = 1;
    let currentPoints = sortedStandings.length > 0 ? sortedStandings[0].totalPoints : 0;
    
    sortedStandings.forEach((standing, index) => {
        // Update rank for different points
        if (standing.totalPoints < currentPoints) {
            currentPoints = standing.totalPoints;
            currentRank = index + 1;
        }

        // Generate round scores summary
        const roundScoresSummary = generateRoundScoresSummary(
            standing.teamId, 
            data.rounds, 
            data.scores
        );        
        
        const row = document.createElement('tr');
        if (currentRank <= 3) {
            row.className = `rank-${currentRank}`;
        }
        
        row.innerHTML = `
            <td>${currentRank}</td>
            <td>${standing.teamName}</td>
            <td>${standing.played}</td>
            <td class="round-scores" data-tooltip="${roundScoresSummary}">${roundScoresSummary}</td>
            <td>${standing.totalPoints}</td>
            <td>${standing.average.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

export { updateStandingsTable };