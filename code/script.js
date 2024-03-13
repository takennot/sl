// rumu4402 Ruslan Musaev

// Initial variables
let currentLevel = 0;
// questions
let codeSnippets = [
    "function add(x, y) {",
    "function subtract(x, y) {",
    "function multiply(x, y) {",
    "function power(base, exponent) {",

    "function turnOnCapsLock(str) {",
    "function turnOffCapsLock(str) {",
    "function getStringLength(str) {",
    "function reverseString(str) {",

    "// make a function with following requirements: called 'kachow', takes no arguments, returns 0. (remember that '}' is already written 😉)",
    "// Wait, what was previous function called? (Just call the function, come on bro. And yes, the ';' is mandatory.)",
    "// Could you make 'kachow' have parameter 'w'? (Just copypaste answer from level 9 and add 'w' lmao)",
    "// Type pirate flag emoji",

    "// what will 'return [] == ![];' return? true or false?",
    "// what will 'return NaN === NaN;' return? true or false?",
    "// what about 'return Object.is(NaN, NaN);'? true or false?",
    "// FINAL QUESTION... WHAT IS true + true?"
];
// answers
let correctCodes = [
    "return x + y;",
    "return x - y;",
    "return x * y;",
    "return Math.pow(base, exponent);",

    "return str.toUpperCase();",
    "return str.toLowerCase();",
    "return str.length;",
    "return str.split(\"\").reverse().join(\"\");",

    "function kachow() { return 0 ;",
    "kachow();",
    "function kachow(w) { return 0 ;",
    "🏴‍☠️",

    "true",
    "false",
    "true",
    "2"
];
let timerInterval;
const timeLimitSeconds = 60; // Time limit for each level in seconds

// start the tutorial
function startGame() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('tutorial').style.display = 'block';
    playSound("hackerSound"); // Start playing the hacker sound
}

// start the level
function startLevel() {
    currentLevel = 1;
    document.getElementById('tutorial').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    displayCode();
    updateLevelNumber(); // Update level number
    startTimer();
}

// update the displayed level number
function updateLevelNumber() {
    document.getElementById('levelNumber').textContent = currentLevel;
}

// start the timer
function startTimer() {
    let timeLeft = timeLimitSeconds;
    updateTimerDisplay(timeLeft);
    // setInterval runs every second (1000 ms part)
    // function() is an anon func (aka no name func)
    // if no time left, clearInterval will stop the countdown for timerInterval
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000); // Update timer every second
}

// update timer display
function updateTimerDisplay(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    // add minutes, add colon,
    // if its less than 10 seconds left, add a 0 in the beginning for style points, otherwise add nothing
    // last, add seconds
    document.getElementById('timer').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// display code snippet
function displayCode() {
    if (currentLevel <= codeSnippets.length) {
        document.getElementById('codeSnippet').textContent = codeSnippets[currentLevel - 1];
    }
}

// check user input
function checkCode() {
    // get user input, trim it, convert to lower case, normalize string. Basically just make sure that it will be properly checkable
    let userInput = document.getElementById('codeInput').value.trim().toLowerCase().replace(/\s+/g, '');
    // same here
    let correctCode = correctCodes[currentLevel - 1].toLowerCase().replace(/\s+/g, '');

    if (userInput === correctCode) {
        document.getElementById('result').textContent = 'Code is correct!';
        clearInterval(timerInterval); // Stop the timer
        playSound('levelWinSound'); // Play level win sound
        // run nextLevel() after 2 seconds
        setTimeout(nextLevel, 2000);
    } else {
        gameOver();
    }
}

// proceed to the next level
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

// game over
function gameOver() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('codeInput').value = '';
    document.getElementById('completeLevelButton').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('gameOver').style.display = 'block';
    stopHackerSound();
    playSound('gameLoseSound'); // Play game lose sound
}

// game won
function gameWon() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('completeLevelButton').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('tutorial').style.display = 'none';
    document.getElementById('gameWon').style.display = 'block';
    playSound('gameWinSound'); // Play game win sound
    stopHackerSound();
}

// restart the game
function restartGame() {
    currentLevel = 0;
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('gameWon').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
    stopHackerSound();
}

// play sound by name
// example so I dont forget
// playSound("typingSound")
function playSound(soundName) {
    let audio = document.getElementById(soundName);
    audio.pause(); // Pause the audio if it's already playing
    audio.currentTime = 0; // Reset audio playback to the beginning
    audio.play(); // Play the audio
}

// stop hacker sound
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

function backToTitle() {
    document.getElementById('tutorial').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
}

// show the complete level button
function showCompleteLevelButton() {
    if (document.getElementById('completeLevelButton').style.display === 'none') {
        document.getElementById('completeLevelButton').style.display = 'block';
    } else {
        document.getElementById('completeLevelButton').style.display = 'none';
    }
}


// Event listener to detect when the numpad 5 key is pressed (for complete level button)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Numpad5') {
        showCompleteLevelButton();
    }
});

// complete the current level
function completeLevel() {
    clearInterval(timerInterval);
    nextLevel();
}

function openDiscussion(){
    document.getElementById('intro').style.display = 'none';
    document.getElementById('discussion').style.display = 'block';
}

function closeDiscussion(){
    document.getElementById('discussion').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
}