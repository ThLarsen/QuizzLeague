// utils.js - Utility functions for the quiz application

/**
 * Formats a date string to a localized date format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

/**
 * Calculates the total points for a team
 * @param {number} teamId - The team ID
 * @param {Array} scores - The array of score objects
 * @returns {number} - Total points
 */
function calculateTotalPoints(teamId, scores) {
    let totalPoints = 0;
    
    // Process each score entry for the team
    scores.forEach((score) => {
        if (score.teamId === teamId) {
            totalPoints += score.score;
        }
    });
    
    return totalPoints;
}

/**
 * Generates a summary of round scores for a team
 * @param {number} teamId - The team ID
 * @param {Array} rounds - The array of round objects
 * @param {Array} scores - The array of score objects
 * @returns {string} - Round scores as a hyphen-separated string
 */
function generateRoundScoresSummary(teamId, rounds, scores) {
    // Get all rounds, sorted by number
    const sortedRounds = [...rounds].sort((a, b) => a.number - b.number);
  
    // Create an array to hold scores, initialized with zeros
    const roundScores = Array(sortedRounds.length).fill("0");
  
    // Find all scores for this team
    const teamScores = scores.filter((s) => s.teamId === teamId);
  
    // For each round the team participated in, get their points
    teamScores.forEach((teamScore) => {
        const round = rounds.find((r) => r.id === teamScore.roundId);
        if (round) {
            const roundIndex = sortedRounds.findIndex((r) => r.id === round.id);
            if (roundIndex !== -1) {
                roundScores[roundIndex] = teamScore.score.toString();
            }
        }
    });
  
    return roundScores.join("-");
}

export { formatDate, calculateTotalPoints, generateRoundScoresSummary };