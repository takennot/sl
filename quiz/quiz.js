// Ruslan Musaev

const button = document.getElementById('restartbutton'); // Get button from html and set it to variable

var canvas = document.getElementById('quizcanvas');
var context = canvas.getContext('2d');

var quizbg = new Image();
var Question = new String();
var Option1 = new String();
var Option2 = new String();
var Option3 = new String();

var mx = 0;
var my = 0;
var CorrectAnswer = 0;
var qnumber = 0;
var rightanswers = 0;
var wronganswers = 0;
var QuizFinished = false;
var lock = false;
var textpos1 = 50;
var textpos2 = 148;
var textpos3 = 238;
var textpos4 = 328;

// array with questions
var Questions = [
    'Glory to Iceland',
    'Konami Code is...',
    'Never gonna',
];

// answers (first indexes are correct)
var Options = [
    ['Eyjafjallajökull', 'Eyafjallajökull', 'Ejafjallajökull'],
    ['↑ ↑ ↓ ↓ ← → ← → B A', '↑ ↓ ↑ ↓ ← → ← → A B', '↓ ↓ ↑ ↑ ← ← → → B A'],
    ['give you up', 'let you down', 'run around & desert you'],
];

// SetQuestions & ProcessClick are own functions to access from restartQuiz
function SetQuestions() {
    Question = Questions[qnumber];
    CorrectAnswer = 1 + Math.floor(Math.random() * 3);

    if (CorrectAnswer == 1) {
        Option1 = Options[qnumber][0];
        Option2 = Options[qnumber][1];
        Option3 = Options[qnumber][2];
    }
    if (CorrectAnswer == 2) {
        Option1 = Options[qnumber][2];
        Option2 = Options[qnumber][0];
        Option3 = Options[qnumber][1];
    }
    if (CorrectAnswer == 3) {
        Option1 = Options[qnumber][1];
        Option2 = Options[qnumber][2];
        Option3 = Options[qnumber][0];
    }

    context.textBaseline = 'middle';
    context.font = '24pt Sometype Mono,Arial';
    context.fillText(Question, 20, textpos1);
    context.font = '18pt Sometype Mono,Arial';
    context.fillText(Option1, 20, textpos2);
    context.fillText(Option2, 20, textpos3);
    context.fillText(Option3, 20, textpos4);
}

function ProcessClick(ev) {
    my = ev.y - canvas.offsetTop;

    if (ev.y == undefined) {
        my = ev.pageY - canvas.offsetTop;
    }

    if (lock) {
        ResetQ();
    } //if lock
    else {
        if (my > 110 && my < 180) {
            GetFeedback(1);
        }
        if (my > 200 && my < 270) {
            GetFeedback(2);
        }
        if (my > 290 && my < 360) {
            GetFeedback(3);
        }
    } //!lock
} //ProcessClick

window.onload = function () {
    canvas.addEventListener('click', ProcessClick, false);

    quizbg.addEventListener('load', () => {
        context.drawImage(quizbg, 0, 0);
        SetQuestions();
    });
    quizbg.src = '../content/quizbg.png';
    console.log(quizbg.src);

    GetFeedback = function (a) {
        if (a == CorrectAnswer) {
            context.drawImage(quizbg, 0, 400, 75, 70, 480, 110 + 90 * (a - 1), 75, 70);
            rightanswers++;
        } else {
            context.drawImage(quizbg, 75, 400, 75, 70, 480, 110 + 90 * (a - 1), 75, 70);
            wronganswers++;
        }
        lock = true;
        context.font = '14pt Sometype Mono,Arial';
        context.fillText('Click again to continue', 20, 380);
    };

    ResetQ = function () {
        lock = false;
        context.clearRect(0, 0, 550, 400);
        qnumber++;
        if (qnumber == Questions.length) {
            EndQuiz();
        } else {
            context.drawImage(quizbg, 0, 0);
            SetQuestions();
        }
    };

    EndQuiz = function () {
        canvas.removeEventListener('click', ProcessClick, false);
        context.drawImage(quizbg, 0, 0, 550, 90, 0, 0, 550, 400);
        context.font = '20pt Sometype Mono,Arial';
        context.fillText('You have finished the quiz!', 20, 100);
        context.font = '16pt Sometype Mono,Arial';
        context.fillText('Correct answers: ' + rightanswers, 20, 200);
        context.fillText('Wrong answers: ' + wronganswers, 20, 240);

        button.style.display = 'block'; // set button's display property to "block" so it shows on screen and can be interacted with (when the quiz is over)
    };
};

const restartQuiz = () => {
    context.clearRect(0, 0, canvas.width, canvas.height); // clear screen

    // reset variable values
    quizbg = new Image();
    Question = new String();
    Option1 = new String();
    Option2 = new String();
    Option3 = new String();

    mx = 0;
    my = 0;
    CorrectAnswer = 0;
    qnumber = 0;
    rightanswers = 0;
    wronganswers = 0;
    QuizFinished = false;
    lock = false;
    textpos1 = 50;
    textpos2 = 148;
    textpos3 = 238;
    textpos4 = 328;

    // event listeners dont exist anymore, so we add them here
    canvas.addEventListener('click', ProcessClick, false);
    quizbg.addEventListener('load', () => {
        context.drawImage(quizbg, 0, 0);
        SetQuestions();
    });
    quizbg.src = '../content/quizbg.png';

    // hide the button again (by setting display to none)
    button.style.display = 'none';
};
