// Sample data structure to store registered players and their scores
let players = [];

// Function to handle event registration
function registerEvent(eventName, fee) {
    document.getElementById('tournament').value = eventName;
    document.getElementById('payment').value = fee;
}

// Function to update payment amount based on selected tournament
function updatePayment() {
    const tournament = document.getElementById('tournament').value;
    let payment = 0;

    switch (tournament) {
        case 'Event 1':
            payment = 50;
            break;
        case 'Event 2':
            payment = 30;
            break;
        case 'Event 3':
            payment = 40;
            break;
        default:
            payment = 0;
    }

    document.getElementById('payment').value = payment;
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const tournament = document.getElementById('tournament').value;
    const p_method = document.getElementById('p_method').value;

    // Check if payment is correctly read
    if (!payment) {
        alert('Payment amount is missing.');
        return;
    }

    // Generate a random score between 0 and 100
    const score = Math.floor(Math.random() * 101);

    // Add the player to the players array
    players.push({ name, email, tournament, payment, p_method, score });

    // Update the leaderboard
    updateLeaderboard();

    // Clear the form
    document.getElementById('registerForm').reset();
}

// Function to update the leaderboard
function updateLeaderboard() {
    const leaderboardTable = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
    leaderboardTable.innerHTML = '';

    // Sort players by score in descending order
    players.sort((a, b) => b.score - a.score);

    // Populate the leaderboard table
    players.forEach((player, index) => {
        const row = leaderboardTable.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = player.name;
        row.insertCell(2).innerText = player.tournament;
        row.insertCell(3).innerText = player.score;
    });
}