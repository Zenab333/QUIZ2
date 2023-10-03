const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Constructor chaining is",
        choices: ["subclass constructor calling super class constructor", "super class constructor calling subclass constructor", "none", "both"],
        answer: "subclass constructor calling super class constructor"
    },
    {
        question: "Q. A copy constructor is called?",
        choices: ["all the above", "none of them", "when an object is passed by value as an argument", "when an object is returned by value"],
        answer: "all the above"
    },
    {
        question: "Q. Invoking methods characteristics",
        choices: ["methods can be invoked in any order and calling method should be in same class as worker method", "Worker method and calling method can be invoked in same way", "Any method can call any method", "both A and C"],
        answer: "methods can be invoked in any order and calling method should be in same class as worker method"
    },
    {
        question: "Q. Function Templates can have",
        choices: ["Both a and b", "Explicit instantiation definition with template argument for all parameters", "explicit instantiation of declaration with template argument for all parameters", "none of them"],
        answer: "Both a and b"
    },

    {
        question: "Q.Which feature of OOP indicates code reusability?",
        choices: ["Inheritance", "encaptulation", "abstraction", "none of them"],
        answer: "Inheritance"
    },
    {
        question: "Q. Why Java is Partially OOP language?",
        choices: ["It supports usual declaration of primitive data types", "it does not support pointers", "It doesn’t support all types of inheritance", "none of them"],
        answer: "It supports usual declaration of primitive data types"
    },
    {
        question: "Q.In multilevel inheritance, which is the most significant feature of OOP used?",
        choices: ["Overloading <<", "Overloading ++", "Overloading >>", "none of them"],
        answer: "Overloading <<"
    },
    {
        question: "Q.In which access should a constructor be defined, so that object of the class can be created in any function?",
        choices: ["public", "private", "protected", "none of them"],
        answer: "public"
    },
    {
        question: "Q.Which among the following represents correct constructor?",
        choices: ["classname()", "classname{}", "classname[]", "none of them"],
        answer: "classname()"
    },
    {
        question: "Q.How to access data members of a class?",
        choices: ["Dot or arrow as required", "Arrow operator", "Dot operator", "none of them"],
        answer: "Dot or arrow as required"
    },
    {
        question: "Q.Which feature of OOP reduces the use of nested classes?",
        choices: ["Inheritance", "Abstraction", "Encaptulation", "none of them"],
        answer: "Inheritance"
    },
    {
        question: "Q.Which operator can be used to free the memory allocated for an object in C++?",
        choices: ["delete", "free()", "clear()", "none of them"],
        answer: "delete"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});