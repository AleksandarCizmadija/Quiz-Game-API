const domCategoryName = document.querySelector('#dom-category'),
    domQuestionDiv = document.querySelector('.question'),
    domQuestionName = document.querySelector('#dom-question-name'),
    domQuestionCounter = document.querySelector('#dom-question'),
    domDifficultyName = document.querySelector('#dom-difficulty'),
    domScore = document.querySelector('#dom-score'),
    progressBar = document.querySelector('.progress-bar'),
    domAllChoices = Array.from(document.querySelectorAll('.option-text')),
    loader = document.querySelector('.loader'),
    skipBtn = document.querySelector('#skip');


const gameParams = JSON.parse(localStorage.getItem('quiz-game-params'));



if (!gameParams) {
    // console.log('no params');
    window.location.assign('/Quiz-Game-API/index.html');
}

let questions = [];

async function fetchQuestions(amount, category, difficulty) {
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
    const data = await res.json();
    if (data.response_code === 0) {
        formatQuestions(data.results);
        domCategoryName.innerText = gameParams.categotyName;
        domDifficultyName.innerText = gameParams.difficulty.charAt(0).toUpperCase() + gameParams.difficulty.slice(1).toLowerCase();
    }
}

fetchQuestions(gameParams.amount, gameParams.categoryID, gameParams.difficulty);

function formatQuestions(fetchedQuestions) {
    questions = fetchedQuestions.map(singleQuestion => {
        const formQuestion = [];
        formQuestion.question = singleQuestion.question;

        const allChoices = [...singleQuestion.incorrect_answers];
        const randomAnswerIndex = Math.floor(Math.random() * 3) + 1;

        allChoices.splice(randomAnswerIndex - 1, 0, singleQuestion.correct_answer)
        formQuestion.answer = randomAnswerIndex;

        allChoices.forEach((choice, index) => {
            formQuestion['choices' + (index + 1)] = choice
        });
        return formQuestion;
    })

    const correctAnswerLS = fetchedQuestions.map(single => {
        const question = single.question;
        const answer = single.correct_answer;
        return { question, answer }
    })
    localStorage.setItem('quiz-game-correct-answers', JSON.stringify(correctAnswerLS))

    startGame();
}

const gamePoints = 10,
    maxQuestions = gameParams.amount;
let currentQuestion = [],
    availableQuestions = [],
    acceptingQuestion = false,
    questionCounter = 0,
    score = 0;


function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]


    nextQuestion();
}
function nextQuestion() {

    if (availableQuestions.length === 0 || maxQuestions <= questionCounter) {
        domQuestionDiv.innerHTML = '<h1>Game Over</h1>';
        setTimeout(() => {
            window.location.assign('/Quiz-Game-API/end.html')

        }, 1000)
    } else {
        loader.style.display = 'none'
        questionCounter++

        const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);

        currentQuestion = availableQuestions[randomQuestionIndex];

        availableQuestions.splice(randomQuestionIndex, 1);
        domQuestionName.innerText = decode(currentQuestion.question);
        domQuestionCounter.innerText = questionCounter + '/' + maxQuestions;
        progressBar.style.width = questionCounter * 100 / maxQuestions + '%';

        domAllChoices.forEach(option => {
            const optionData = option.dataset.number;
            option.innerText = decode(currentQuestion['choices' + optionData])
        });

        if (maxQuestions === questionCounter) {
            skipBtn.style.display = 'none';
        }
    }
}

domAllChoices.forEach(choice => {
    choice.addEventListener('click', checkAnswer);
})
function checkAnswer(e) {
    const target = e.target;
    const dataNumber = +e.target.dataset.number;

    if (dataNumber === currentQuestion.answer) {
        target.classList.add('correct');
        score += gamePoints;
        domScore.innerText = score;
    } else {
        target.classList.add('incorrect')
    }
    localStorage.setItem('quiz-game-score', JSON.stringify(score));
    setTimeout(() => {
        nextQuestion();
        target.classList.remove('correct')
        target.classList.remove('incorrect')
    }, 1000)
}

function decode(str) {
    const text = document.createElement('textarea');
    text.innerHTML = str
    return text.value;
}

