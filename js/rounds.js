// rounds.js - Handles the rounds tab functionality
import { formatDate } from './utils.js';

/**
 * Generates buttons for each round
 * @param {Object} data - The quiz data object
 */
function generateRoundButtons(data) {
    const container = document.getElementById('round-selector');
    if (!container) return;
    
    container.innerHTML = '';
    
    data.rounds.sort((a, b) => a.number - b.number).forEach(round => {
        const button = document.createElement('button');
        button.className = 'round-btn';
        button.textContent = `${formatDate(round.date)}`;
        button.dataset.roundId = round.id;
        button.onclick = function() {
            document.querySelectorAll('.round-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            showRoundScores(round.id, data);
        };
        container.appendChild(button);
    });
    
    // Select the first round by default if it exists
    if (data.rounds.length > 0) {
        const firstButton = container.querySelector('.round-btn');
        firstButton.classList.add('active');
        showRoundScores(parseInt(firstButton.dataset.roundId), data);
    }
}

/**
 * Shows scores for a specific round
 * @param {number} roundId - The round ID to show
 * @param {Object} data - The quiz data object
 */
function showRoundScores(roundId, data) {
    const tbody = document.getElementById('round-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const roundScores = data.scores.filter(score => score.roundId === roundId);
    
    // Sort by score (descending)
    const sortedScores = roundScores.sort((a, b) => b.score - a.score);
    
    if (sortedScores.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3" style="text-align: center;">No scores recorded for this round yet.</td>';
        tbody.appendChild(row);
        return;
    }
    
    // Track shared places
    let currentRank = 1;
    let currentScore = sortedScores[0].score;
    
    sortedScores.forEach((score, index) => {
        const team = data.teams.find(team => team.id === score.teamId);
        if (!team) return;
        
        // Check if we need to update the rank (for a different score)
        if (score.score < currentScore) {
            currentScore = score.score;
            // Skip ranks based on how many teams shared the previous score
            currentRank = index + 1;
        }
        
        const row = document.createElement('tr');
        if (currentRank <= 3) {
            row.className = `rank-${currentRank}`;
        }
        
        row.innerHTML = `
            <td>${currentRank}</td>
            <td>${team.name}</td>
            <td>${score.score}</td>
        `;
        
        tbody.appendChild(row);
    });
}

export { generateRoundButtons, showRoundScores };