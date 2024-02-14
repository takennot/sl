// Ruslan Musaev rumu4402

// Get stuff and store it in variables
const questionField = document.querySelector('input[id="questionField"]');
const newQuestionButton = document.getElementById('getQuestion');
const answerField = document.querySelector('input[id="answerField"]');
const submitButton = document.getElementById('submitButton');
const span = document.getElementById('check');

let currentAnswer;

// self-explanatory but, generate random numbers
const getRandomNumbers = () => {
    const arr = [];

    for (let i = 0; i < 2; i++) {
        arr.push(Math.floor(Math.random() * 10));
    }

    return arr;
};

// Generate equation based on type
const getRandomEquation = (type) => {
    const [num1, num2] = getRandomNumbers();

    switch (type) {
        case 'addition':
            return [`${num1} + ${num2} = ?`, num1 + num2];

        case 'subtraction':
            return [`${num1} - ${num2} = ?`, num1 - num2];

        case 'multiplication':
            return [`${num1} * ${num2} = ?`, num1 * num2];
    }
};

// Handle get question button click
newQuestionButton.onclick = () => {
    const type = document.querySelector('input[name="math"]:checked');
    const [text, answer] = getRandomEquation(type.id);

    // Display question and reset answer field and feedback span
    questionField.value = text;
    currentAnswer = answer;

    answerField.value = '';
    span.innerHTML = '';
};

// Handle submit answer button click
submitButton.onclick = () => {
    // Check answer and display feedback
    if (Number(answerField.value) === currentAnswer) {
        span.innerHTML = '👍';
    } else {
        span.innerHTML = '👎';
    }
};