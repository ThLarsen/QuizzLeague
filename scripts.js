// Data structure
let quizData = {
    teams: [],
    rounds: [],
    scores: []
};

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    populateTeamsDropdown();
    populateRoundsDropdown();
    generateRoundButtons();
    updateStandingsTable();
});

// Tab switching
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

function loadData() {
const data = localStorage.getItem('quizData');
if (data) {
quizData = JSON.parse(data);
} else {
// Real data from the provided quiz league table
quizData = {
    teams: [
        { id: 1, name: "Kokken,Tyven, hans kone og hennes elskere" },
        { id: 2, name: "Quizly Bears" },
        { id: 3, name: "Knut sine høner" },
        { id: 4, name: "Quizmy ass" },
        { id: 5, name: "i siste liten" },
        { id: 6, name: "No Fun Intended" },
        { id: 7, name: "Just happy to be here" },
        { id: 8, name: "Quizimilis" },
        { id: 9, name: "Ikke ta meg på Quizen" }, // Corrected team name
        { id: 10, name: "Vi jobber med saken" },
        { id: 11, name: "Pedro Castillo" },
        { id: 12, name: "Victors Vaffor & B'N'B" },
        { id: 13, name: "Mafia" },
        { id: 14, name: "Tusseladden" },
        { id: 15, name: "Rolig som skjæra på tunet" },
        { id: 16, name: "404" },
        { id: 17, name: "Lavterskel" },
        { id: 18, name: "Tone's dispipler" },
        { id: 19, name: "Tøvsjurer og andre fuglearter" },
        { id: 20, name: "Titanic" },
        { id: 21, name: "Quiz my baby one more time 1" },
        { id: 22, name: "Bjørnens hule" },
        { id: 23, name: "Mølje" },
        { id: 24, name: "Uvitenskap!" },
        { id: 25, name: "Kjetil Heit!" },
        { id: 26, name: "Spice girls 1" },
        { id: 27, name: "FK Kad (Rjomor Supporterklubb)" },
        { id: 28, name: "Fernet" },
        { id: 29, name: "Slick" },
        { id: 30, name: "Lady Bugs" },
        { id: 31, name: "Portvin 2" },
        { id: 32, name: "Quiz my baby one more time 2" },
        { id: 33, name: "Team Lund" },
        { id: 34, name: "Catalans" },
        { id: 35, name: "The Thee Musketeers" },
        { id: 36, name: "Peter Lorenkrantz dispipler" },
        { id: 37, name: "Southampton 24/25" },
        { id: 38, name: "Treff på Quiz" },
        { id: 39, name: "Å-laget" },
        { id: 40, name: "The Skibidi Ben Dovers" },
        { id: 41, name: "Pannekake Profetene" }
    ],
    rounds: [
        { id: 1, number: 1, date: "2025-02-14" },
        { id: 2, number: 2, date: "2025-02-28" },
        { id: 3, number: 3, date: "2025-03-14" },
        { id: 4, number: 4, date: "2025-03-28" },
        { id: 5, number: 5, date: "2025-04-11" },
        { id: 6, number: 6, date: "2025-04-25" },
        { id: 7, number: 7, date: "2025-05-09" },
        { id: 8, number: 8, date: "2025-05-23" },
        { id: 9, number: 9, date: "2025-06-06" },
        { id: 10, number: 10, date: "2025-06-20" }
    ],
    scores: [
        // Round 1 (Feb 14)
        { teamId: 1, roundId: 1, score: 12 },
        { teamId: 2, roundId: 1, score: 7 },
        { teamId: 4, roundId: 1, score: 7 },
        { teamId: 5, roundId: 1, score: 3 },
        { teamId: 6, roundId: 1, score: 1 },
        { teamId: 7, roundId: 1, score: 10 },
        { teamId: 8, roundId: 1, score: 3 },
        { teamId: 11, roundId: 1, score: 7 },
        { teamId: 12, roundId: 1, score: 10 },
        { teamId: 14, roundId: 1, score: 7 },
        { teamId: 17, roundId: 1, score: 1 },
        { teamId: 19, roundId: 1, score: 1 },
        { teamId: 23, roundId: 1, score: 1 },
        { teamId: 24, roundId: 1, score: 1 },
        { teamId: 25, roundId: 1, score: 1 },
        
        // Round 2 (Feb 28)
        { teamId: 1, roundId: 2, score: 12 },
        { teamId: 2, roundId: 2, score: 12 },
        { teamId: 4, roundId: 2, score: 4 },
        { teamId: 5, roundId: 2, score: 7 },
        { teamId: 6, roundId: 2, score: 8 },
        { teamId: 7, roundId: 2, score: 6 },
        { teamId: 8, roundId: 2, score: 1 },
        { teamId: 9, roundId: 2, score: 6 },
        { teamId: 10, roundId: 2, score: 4 },
        { teamId: 11, roundId: 2, score: 1 },
        { teamId: 13, roundId: 2, score: 1 },
        { teamId: 17, roundId: 2, score: 2 },
        { teamId: 18, roundId: 2, score: 4 },
        { teamId: 19, roundId: 2, score: 1 },
        { teamId: 22, roundId: 2, score: 1 },
        { teamId: 26, roundId: 2, score: 1 },
        { teamId: 27, roundId: 2, score: 1 },
        { teamId: 28, roundId: 2, score: 1 },
        { teamId: 29, roundId: 2, score: 1 },
        
        // Round 3 (Mar 14)
        { teamId: 1, roundId: 3, score: 8 },
        { teamId: 2, roundId: 3, score: 10 },
        { teamId: 3, roundId: 3, score: 12 },
        { teamId: 4, roundId: 3, score: 3 },
        { teamId: 5, roundId: 3, score: 5 },
        { teamId: 7, roundId: 3, score: 1 },
        { teamId: 8, roundId: 3, score: 3 },
        { teamId: 9, roundId: 3, score: 1 },
        { teamId: 11, roundId: 3, score: 3 },
        { teamId: 13, roundId: 3, score: 1 },
        { teamId: 14, roundId: 3, score: 1 },
        { teamId: 15, roundId: 3, score: 7 },
        { teamId: 16, roundId: 3, score: 4 },
        { teamId: 20, roundId: 3, score: 1 },
        { teamId: 30, roundId: 3, score: 1 },
        
        // Round 4 (Mar 28)
        { teamId: 1, roundId: 4, score: 12 },
        { teamId: 2, roundId: 4, score: 8 },
        { teamId: 3, roundId: 4, score: 10 },
        { teamId: 5, roundId: 4, score: 5 },
        { teamId: 6, roundId: 4, score: 6 },
        { teamId: 7, roundId: 4, score: 1 },
        { teamId: 8, roundId: 4, score: 8 },
        { teamId: 11, roundId: 4, score: 1 },
        { teamId: 13, roundId: 4, score: 4 },
        { teamId: 15, roundId: 4, score: 1 },
        { teamId: 16, roundId: 4, score: 3 },
        { teamId: 17, roundId: 4, score: 2 },
        { teamId: 19, roundId: 4, score: 1 },
        { teamId: 20, roundId: 4, score: 2 },
        { teamId: 21, roundId: 4, score: 1 },
        { teamId: 22, roundId: 4, score: 1 },
        { teamId: 31, roundId: 4, score: 1 },
        
        // Round 5 (Apr 11)
        { teamId: 1, roundId: 5, score: 12 },
        { teamId: 2, roundId: 5, score: 8 },
        { teamId: 3, roundId: 5, score: 6 },
        { teamId: 4, roundId: 5, score: 12 },
        { teamId: 5, roundId: 5, score: 1 },
        { teamId: 6, roundId: 5, score: 4 },
        { teamId: 8, roundId: 5, score: 2 },
        { teamId: 9, roundId: 5, score: 6 },
        { teamId: 10, roundId: 5, score: 8 },
        { teamId: 13, roundId: 5, score: 3 },
        { teamId: 17, roundId: 5, score: 1 },
        { teamId: 19, roundId: 5, score: 1 },
        { teamId: 20, roundId: 5, score: 1 },
        { teamId: 21, roundId: 5, score: 1 },
        { teamId: 32, roundId: 5, score: 1 },
        { teamId: 33, roundId: 5, score: 1 },
        { teamId: 34, roundId: 5, score: 1 },
        { teamId: 35, roundId: 5, score: 1 },
        { teamId: 36, roundId: 5, score: 1 },
        
        // Round 6-10 (Apr 25 - Jun 20)
        // Round 6 (Apr 25) - No data in the picture
        // Round 7 (May 9) - No data in the picture
        // Round 8 (May 23)   
        // Round 9 (Jun 6) - No data in the picture
        // Round 10 (Jun 20) - No data in the picture
    ],
    pointSystem: [
        { place: 1, points: 12 },
        { place: 2, points: 10 },
        { place: 3, points: 8 },
        { place: 4, points: 7 },
        { place: 5, points: 6 },
        { place: 6, points: 5 },
        { place: 7, points: 4 },
        { place: 8, points: 3 },
        { place: 9, points: 2 },
        { place: 10, points: 1 }
    ]
};
saveData();
}
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('quizData', JSON.stringify(quizData));
}

// Add a new team
function addTeam() {
    const teamName = document.getElementById('team-name').value.trim();
    if (teamName) {
        const newId = quizData.teams.length > 0 ? Math.max(...quizData.teams.map(t => t.id)) + 1 : 1;
        quizData.teams.push({ id: newId, name: teamName });
        saveData();
        populateTeamsDropdown();
        updateStandingsTable();
        document.getElementById('team-name').value = '';
        alert(`Team "${teamName}" added successfully!`);
    } else {
        alert('Please enter a team name.');
    }
}

// Add a new round
function addRound() {
    const roundNumber = parseInt(document.getElementById('round-number').value);
    const roundDate = document.getElementById('round-date').value;
    
    if (roundNumber && roundDate) {
        const newId = quizData.rounds.length > 0 ? Math.max(...quizData.rounds.map(r => r.id)) + 1 : 1;
        quizData.rounds.push({ id: newId, number: roundNumber, date: roundDate });
        saveData();
        populateRoundsDropdown();
        generateRoundButtons();
        document.getElementById('round-number').value = '';
        document.getElementById('round-date').value = '';
        alert(`Round ${roundNumber} added successfully!`);
    } else {
        alert('Please enter both round number and date.');
    }
}

// Add a score
function addScore() {
    const teamId = parseInt(document.getElementById('score-team').value);
    const roundId = parseInt(document.getElementById('score-round').value);
    const score = parseInt(document.getElementById('score-value').value);
    
    if (teamId && roundId && !isNaN(score)) {
        // Check if score already exists for this team and round
        const existingScoreIndex = quizData.scores.findIndex(s => s.teamId === teamId && s.roundId === roundId);
        
        if (existingScoreIndex !== -1) {
            // Update existing score
            quizData.scores[existingScoreIndex].score = score;
            alert('Score updated successfully!');
        } else {
            // Add new score
            quizData.scores.push({ teamId, roundId, score });
            alert('Score added successfully!');
        }
        
        saveData();
        updateStandingsTable();
        const activeRound = document.querySelector('.round-btn.active');
        if (activeRound) {
            showRoundScores(parseInt(activeRound.dataset.roundId));
        }
        document.getElementById('score-value').value = '';
    } else {
        alert('Please fill in all fields correctly.');
    }
}

// Populate teams dropdown
function populateTeamsDropdown() {
    const dropdown = document.getElementById('score-team');
    dropdown.innerHTML = '<option value="" disabled selected>Select Team</option>';
    
    quizData.teams.sort((a, b) => a.name.localeCompare(b.name)).forEach(team => {
        const option = document.createElement('option');
        option.value = team.id;
        option.textContent = team.name;
        dropdown.appendChild(option);
    });
}

// Populate rounds dropdown
function populateRoundsDropdown() {
    const dropdown = document.getElementById('score-round');
    dropdown.innerHTML = '<option value="" disabled selected>Select Round</option>';
    
    quizData.rounds.sort((a, b) => a.number - b.number).forEach(round => {
        const option = document.createElement('option');
        option.value = round.id;
        option.textContent = `Round ${round.number} (${formatDate(round.date)})`;
        dropdown.appendChild(option);
    });
}

// Generate round buttons
function generateRoundButtons() {
    const container = document.getElementById('round-selector');
    container.innerHTML = '';
    
    quizData.rounds.sort((a, b) => a.number - b.number).forEach(round => {
        const button = document.createElement('button');
        button.className = 'round-btn';
        //button.textContent = `Round ${round.number}`;
        button.textContent = `${formatDate(round.date)}`;
        button.dataset.roundId = round.id;
        button.onclick = function() {
            document.querySelectorAll('.round-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            showRoundScores(round.id);
        };
        container.appendChild(button);
    });
    
    // Select the first round by default if it exists
    if (quizData.rounds.length > 0) {
        const firstButton = container.querySelector('.round-btn');
        firstButton.classList.add('active');
        showRoundScores(parseInt(firstButton.dataset.roundId));
    }
}

// Show scores for a specific round
// Update the showRoundScores function to handle shared places
function showRoundScores(roundId) {
    const tbody = document.getElementById('round-body');
    tbody.innerHTML = '';
    
    const roundScores = quizData.scores.filter(score => score.roundId === roundId);
    
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
    let skippedRanks = 0;
    
    sortedScores.forEach((score, index) => {
        const team = quizData.teams.find(team => team.id === score.teamId);
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

// Update standings table
// Update the standings table to reflect the new calculation
function updateStandingsTable() {
    const tbody = document.getElementById('standings-body');
    tbody.innerHTML = '';
    
    const standings = calculateStandings();
    
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
        // Check if we need to update the rank (for different points)
        if (standing.totalPoints < currentPoints) {
            currentPoints = standing.totalPoints;
            currentRank = index + 1;
        }
        
        const row = document.createElement('tr');
        if (currentRank <= 3) {
            row.className = `rank-${currentRank}`;
        }
        
        row.innerHTML = `
            <td>${currentRank}</td>
            <td>${standing.teamName}</td>
            <td>${standing.played}</td>
            <td>${standing.totalPoints}</td>
            <td>${standing.average.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Calculate standings
// Update the calculateStandings function to handle shared places
function calculateStandings() {
    const standings = [];
    
    // First calculate raw scores for each team
    quizData.teams.forEach(team => {
        const teamScores = quizData.scores.filter(score => score.teamId === team.id);
        const totalPoints = calculateTotalPoints(team.id);
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

// New function to calculate total points with shared places
function calculateTotalPoints(teamId) {
    let totalPoints = 0;
    
    // Process each round
    quizData.rounds.forEach(round => {
        // Get all scores for this round
        const roundScores = quizData.scores.filter(score => score.roundId === round.id);
        
        // Sort by score (descending)
        const sortedScores = roundScores.sort((a, b) => b.score - a.score);
        
        // Skip if no scores for this round
        if (sortedScores.length === 0) return;
        
        // Track positions
        let currentRank = 1;
        let currentScore = sortedScores[0].score;
        let teamsAtCurrentScore = 0;
        
        // Find this team's position and calculate points
        for (let i = 0; i < sortedScores.length; i++) {
            // Check if we need to update the rank (for a different score)
            if (sortedScores[i].score < currentScore) {
                currentScore = sortedScores[i].score;
                currentRank = i + 1;
            }
            
            // If this is our team, calculate points
            if (sortedScores[i].teamId === teamId) {
                // Find the points for this rank from the point system
                const pointsEntry = quizData.pointSystem.find(p => p.place === currentRank);
                if (pointsEntry) {
                    totalPoints += pointsEntry.points;
                }
                break; // Found our team, no need to continue
            }
        }
    });
    
    return totalPoints;
}

// Export data
function exportData() {
    const dataStr = JSON.stringify(quizData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'pub-quiz-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import data
function importData() {
    const fileInput = document.getElementById('import-data');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // Validate data structure
                if (importedData.teams && importedData.rounds && importedData.scores) {
                    quizData = importedData;
                    saveData();
                    
                    // Refresh everything
                    populateTeamsDropdown();
                    populateRoundsDropdown();
                    generateRoundButtons();
                    updateStandingsTable();
                    
                    alert('Data imported successfully!');
                } else {
                    alert('Invalid data format.');
                }
            } catch (error) {
                alert('Error parsing JSON data: ' + error.message);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file to import.');
    }
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}