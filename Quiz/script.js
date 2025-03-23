const startButton = document.querySelector(".start_quiz");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionText = document.getElementById("question");
const optionsBox = document.querySelector(".options");
const nextButton = document.querySelector(".next-btn");
const scoreText = document.getElementById("score");
const countQue = document.querySelector(".count_que");
const totalQue = document.querySelector(".total_que");
const playAgainButton = document.querySelector(".again-quiz");
const exitButton = document.querySelector(".exit");

const questions = [
    {
        question: "Which of the following is an example of DML?",
        answer: "UPDATE",
        options: ["CREATE", "UPDATE", "DROP", "ALTER"]
    },
    {
        question: "Network that covers large areas is?",
        answer: "MAN",
        options: ["LAN", "MAN", "WAN", "None"]
    },
    {
        question: "What is the output of 10/0 in JavaScript?",
        answer: "Infinity is printed",
        options: ["Nothing is printed", "0 is printed", "Infinity is printed", "Some Garbage Value"]
    },
    {
        question: "FILE is of which type in C?",
        answer: "struct type",
        options: ["int type", "char * type", "struct type", "None of them"]
    },
    {
        question: "Which OOP principle hides unnecessary details?",
        answer: "Abstraction",
        options: ["Abstraction", "Polymorphism", "Inheritance", "Encapsulation"]
    }
];

let currentQuestion = 0;
let score = 0;

totalQue.textContent = questions.length;

startButton.addEventListener("click", () => {
    startButton.classList.add("inactive");
    quizBox.classList.remove("inactive");
    loadQuestion();
});

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }

    let q = questions[currentQuestion];
    questionText.textContent = q.question;
    optionsBox.innerHTML = "";
    countQue.textContent = currentQuestion + 1;

    q.options.forEach(opt => {
        let div = document.createElement("div");
        div.classList.add("option");
        div.textContent = opt;
        div.onclick = () => checkAnswer(div, q.answer);
        optionsBox.appendChild(div);
    });

    nextButton.classList.add("inactive");
}

function checkAnswer(selected, correct) {
    let options = document.querySelectorAll(".option");
    options.forEach(option => option.onclick = null);

    if (selected.textContent === correct) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("incorrect");
        options.forEach(option => {
            if (option.textContent === correct) option.classList.add("correct");
        });
    }

    nextButton.classList.remove("inactive");
}

nextButton.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
});

function showResults() {
    quizBox.classList.add("inactive");
    resultBox.classList.remove("inactive");
    scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
}

playAgainButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("inactive");
    quizBox.classList.remove("inactive");
    loadQuestion();
});

exitButton.addEventListener("click", () => {
    location.reload();
});
