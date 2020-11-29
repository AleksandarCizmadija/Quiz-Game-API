const table = document.querySelector('#correct-answers'),
    domCorrectAnswers = document.querySelector('#dom-correct-answers'),
    correctAnswers = JSON.parse(localStorage.getItem('quiz-game-correct-answers')),
    score = JSON.parse(localStorage.getItem('quiz-game-score'));

correctAnswers.forEach(correct => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${correct.question}</td>
        <td>${correct.answer}</td>
    `
    table.appendChild(tr)
});

domCorrectAnswers.innerText = score / 10 + '/' + correctAnswers.length