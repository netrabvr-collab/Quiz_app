let quesNo = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container"); 
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    feedback.textContent = "";      //set feedback initially to NULL
    nextBtn.style.display = "none";     //Hides the next button

    let q = questions[quesNo];      //save array of questions in q
    questionContainer.textContent = q.question;     //display question on the screen

    optionsContainer.innerHTML = "";        //resets the option container to display new options
    q.options.forEach((option, index) => {      
        const btn = document.createElement("button");   
        btn.textContent = option;       //display the options on the button
        btn.onclick = () => checkAnswer(index);     //when the button is clicked call checkAnswer()
        optionsContainer.appendChild(btn);      //add button to option container
    });
}

function checkAnswer(selectedIndex) {
    let correctIndex = questions[quesNo].answer;    //save the correct option in correctIndex
    if (selectedIndex === correctIndex) {       //if selectedindex is equal to correctIndex
        feedback.textContent = "Correct!";  //then set feedback as correct
        score++;    //increase the score
    } else {
        feedback.textContent = `Incorrect! Correct answer: ${questions[quesNo].options[correctIndex]}`;     //if not equal then set feedback as incorrect
    }
    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);      //convert all buttons inside optionsContainer to array and disable all buttons so that user cannot click on them again    
    nextBtn.style.display = "inline-block";     //make the next button visible  
}

nextBtn.onclick = () => {       //when next button is clicked
    quesNo++;       //increment the quesNo
    if (quesNo < questions.length) {        //if quesNo is less than the elements in questions array
        loadQuestion();     //then call loadQuestion()
    } else {
        showScore();    //else call showScore
    }
};

function showScore() {
    questionContainer.style.display = "none";       //set all the terms to hidden
    optionsContainer.style.display = "none";
    feedback.style.display = "none";
    nextBtn.style.display = "none";
    
    scoreContainer.style.display = "block";     //make the scoreContainer Visible
    scoreContainer.textContent = `Your score: ${score} / ${questions.length}`;      //display the score out of total questions
    restartBtn.style.display = "inline-block";      //make restart button visible
}

restartBtn.onclick = () => {        //on clicking restart button
    quesNo = 0;     //set quesNo and score to 0
    score = 0;
    questionContainer.style.display = "block";      //make question, option, and feedback container visible 
    optionsContainer.style.display = "block";
    feedback.style.display = "block";
    scoreContainer.style.display = "none";      //make scoreContainer and restartBtn to hidden
    restartBtn.style.display = "none";
    loadQuestion();     //call loadQuestion()
};

// Load the first question
loadQuestion();