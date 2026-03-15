class Quiz {
    /**
     * @param {number} id
     * @param {Element} element
     * @param {QuizData} data
     */
    constructor(id, element, data) {
        this.id = id
        this.element = element
        this.data = data
    }
}

let quizzes = [
];

/**
 * @param {Quiz} quiz
 */
function __start_quiz(quiz) {
    console.log(quiz);
}

/**
 * @param {number} quizId 
 */
function start_quiz(quizId) {
    for(let i = 0; i < quizzes.length; i++) {
        let quiz = quizzes[i];

        if(quizId === quiz.id) {
            __start_quiz(quiz);
            break;
        }
    }
}

/**
 * @param {Element} quizElement 
 * @param {any} quiz 
 * @param {number} quizId
 */
function generate_quiz(quizElement, quiz, quizId) {
    quizzes.push({
        id: quizId,
        element: quizElement,
        data: quiz
    });

    quizElement.innerHTML = 
`
<div>
    <button onclick="start_quiz(${quizId})">Start</button>
</div>
`;

    console.log(quizzes);
}

function generate_quizzes() {
    const quizElements = document.getElementsByClassName("quiz");
    if(quizElements.length < 1) {
        console.info("No quizzes to populate on page.");
        return;
    }

    console.info(`Found ${quizElements.length} quiz${quizElements.length > 1 ? 'zes' : ''}.`);

    for(let i = 0; i < quizElements.length; i++) {
        const quizElement = quizElements[i];
        const file = quizElement.getAttribute("file");
        
        fetch(file).then(response => response.json().then(quiz => generate_quiz(quizElement, quiz, i)))
    }
}

generate_quizzes();