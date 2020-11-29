const categories = [
    {
        value: 9,
        name: "General Knowledge"
    },
    {
        value: 10,
        name: "Entertainment: Books"
    },
    {
        value: 11,
        name: "Entertainment: Film"
    },
    {
        value: 12,
        name: "Entertainment: Music"
    },
    {
        value: 13,
        name: "Entertainment: Musicals & Theatres"
    },
    {
        value: 14,
        name: "Entertainment: Television"
    },
    {
        value: 15,
        name: "Entertainment: Video Games"
    },
    {
        value: 16,
        name: "Entertainment: Board Games"
    },
    {
        value: 17,
        name: "Science & Nature"
    },
    {
        value: 18,
        name: "Science: Computers"
    },
    {
        value: 19,
        name: "Science: Mathematics"
    },
    {
        value: 20,
        name: "Mythology"
    },
    {
        value: 21,
        name: "Sports"
    },
    {
        value: 22,
        name: "Geography"
    },
    {
        value: 23,
        name: "History"
    },
    {
        value: 24,
        name: "Politics"
    },
    {
        value: 25,
        name: "Art"
    },
    {
        value: 26,
        name: "Celebrities"
    },
    {
        value: 27,
        name: "Animals"
    },
    {
        value: 28,
        name: "Vehicles"
    },
    {
        value: 29,
        name: "Entertainment: Comics"
    },
    {
        value: 30,
        name: "Science: Gadgets"
    },
    {
        value: 31,
        name: "Entertainment: Japanese Anime & Manga"
    },
    {
        value: 32,
        name: "Entertainment: Cartoon & Animations"
    }
];

const difficulties = [
    {
        value: 'easy',
        name: 'Easy'
    },
    {
        value: 'medium',
        name: 'Medium'
    },
    {
        value: 'Hard',
        name: 'Hard'
    }
];

const form = document.querySelector('#form'),
    numberOfQuestions = document.querySelector('#number-of-questions'),
    selectCategory = document.querySelector('#select-category'),
    selectDifficulty = document.querySelector('#select-difficulty'),
    alert = document.querySelector('.alert');

function createOptions(arr, where) {
    arr.forEach(object => {
        const element = document.createElement('option');
        element.innerText = object.name;
        element.value = object.value;
        where.appendChild(element);
    });
};

form.addEventListener('submit', formSubmited);

createOptions(categories, selectCategory);
createOptions(difficulties, selectDifficulty);

function formSubmited(e) {
    const enteredNumber = +numberOfQuestions.value,
        enteredCategory = +selectCategory.value,
        enteredDifficulty = selectDifficulty.value;

    if (enteredNumber && enteredCategory !== 'default' && enteredDifficulty !== 'default') {
        const categoryName = categories.map(category => category.value === enteredCategory ? category.name : '').join('');
        const gameParams = {
            amount: enteredNumber,
            categoryID: enteredCategory,
            difficulty: enteredDifficulty,
            categotyName: categoryName
        };

        localStorage.setItem('quiz-game-params', JSON.stringify(gameParams));
        window.location.assign('/Quiz-Game-API/game.html');
    } else {
        alert.style.visibility = 'visible';
        setTimeout(() => {
            alert.style.visibility = 'hidden';

        }, 1500);
    }
    e.preventDefault();
}
