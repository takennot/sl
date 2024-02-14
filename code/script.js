// Group members: [Insert names here]

// Initial variables
let currentLevel = 0;
let codeSnippets = [
    "// Write a function called 'multiply' that multiplies two numbers\nfunction multiply(x, y) {\n  // Write your code here\n}",
    "// Write a function called 'power' that raises a number to a given power\nfunction power(base, exponent) {\n  // Write your code here\n}",
    "// Write a function called 'divide' that divides one number by another\nfunction divide(x, y) {\n  // Write your code here\n}",
    "// Write a function called 'subtract' that subtracts one number from another\nfunction subtract(x, y) {\n  // Write your code here\n}"
];
let correctCodes = [
    "function multiply(x, y) {\n  return x * y;\n}",
    "function power(base, exponent) {\n  return Math.pow(base, exponent);\n}",
    "function divide(x, y) {\n  return x / y;\n}",
    "function subtract(x, y) {\n  return x - y;\n}"
];
let timerInterval;
const timeLimitSeconds = 60; // Time limit for each level in seconds

// Function to start the game & tutorial
function startGame() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('tutorial').style.display = 'block';
    playSound("hackerSound"); // Start playing the hacker sound
}

// Function to start the level
function startLevel() {
    currentLevel = 1;
    document.getElementById('tutorial').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    displayCode();
    updateLevelNumber(); // Update level number
    startTimer();
}

// Function to update the displayed level number
function updateLevelNumber() {
    document.getElementById('levelNumber').textContent = currentLevel;
}

// Function to start the timer
function startTimer() {
    let timeLeft = timeLimitSeconds;
    updateTimerDisplay(timeLeft);

    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000); // Update timer every second
}

// Function to update timer display
function updateTimerDisplay(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('timer').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to display code snippet
function displayCode() {
    if (currentLevel <= codeSnippets.length) {
        document.getElementById('codeSnippet').textContent = codeSnippets[currentLevel - 1];
    }
}

// Function to check user input
function checkCode() {
    let userInput = document.getElementById('codeInput').value.trim();
    let correctCode = correctCodes[currentLevel - 1];

    // Normalize the strings by removing whitespace and line breaks
    let normalizedUserInput = normalizeString(userInput);
    let normalizedCorrectCode = normalizeString(correctCode);

    if (normalizedUserInput === normalizedCorrectCode) {
        document.getElementById('result').textContent = 'Code is correct!';
        clearInterval(timerInterval); // Stop the timer
        playSound('levelWinSound'); // Play level win sound
        setTimeout(nextLevel, 2000);
    } else {
        gameOver();
    }
}

// Function to normalize strings by removing whitespace and line breaks
function normalizeString(str) {
    return str.replace(/\s+/g, '');
}


// Function to proceed to the next level
function nextLevel() {
    currentLevel++;
    if (currentLevel <= codeSnippets.length) {
        document.getElementById('result').textContent = ''; // Reset result message
        document.getElementById('codeInput').value = ''; // Clear code input field
        displayCode();
        updateLevelNumber(); // Update level number
        startTimer(); // Start timer for next level
    } else {
        gameWon();
    }
}

// Function for game over
function gameOver() {
    clearInterval(timerInterval); // Stop the timer
    playSound('gameLoseSound'); // Play game lose sound
    document.getElementById('game').style.display = 'none';
    document.getElementById('gameOver').style.display = 'block';
    stopHackerSound();
}

// Function for game won
function gameWon() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('game').style.display = 'none'; // Hide game div
    document.getElementById('gameOver').style.display = 'none'; // Hide game over screen
    document.getElementById('tutorial').style.display = 'none'; // Hide tutorial screen
    document.getElementById('gameWon').style.display = 'block'; // Show game won screen
    playSound('gameWinSound'); // Play game win sound
    stopHackerSound();
}

// Function to restart the game
function restartGame() {
    currentLevel = 0;
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('gameWon').style.display = 'none'; // Hide game won screen
    document.getElementById('gameOver').style.display = 'none'; // Hide game over screen
    document.getElementById('intro').style.display = 'block'; // Show intro screen
    stopHackerSound();
}

// Function to play sound by name
// example so I dont forget
// playSound("typingSound")
function playSound(soundName) {
    let audio = document.getElementById(soundName);
    audio.pause(); // Pause the audio if it's already playing
    audio.currentTime = 0; // Reset audio playback to the beginning
    audio.play(); // Play the audio
}

// Function to stop hacker sound
// unique to hacker because its looped xd
function stopHackerSound() {
    document.getElementById('hackerSound').pause();
}

function showCredits() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('credits').style.display = 'block';
}

function hideCredits() {
    document.getElementById('credits').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
}