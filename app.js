var state = {
    questions: [
        {
            question: "Who was the first emperor to rule the Qing Dynasty?",
            options: ["Emperor Shunzhi", "Mao Zedong", "Hong Xiuquan", "Sun Yat Sen"],
            correctAnswer: 0
        },
        {
            question: "When did the Qing Dynasty start to lose power?",
            options: ["The death of the Qianlong Emperor caused the dynasty to lose power",
                "The Qianlong Emperor not caring about his role as emperor",
                "The invasion of the Qing Dynasty by Japan",
                "A great famine that caused the death of many"],
            correctAnswer: 1
        },
        {
            question: "What was the White Lotus Rebellion?",
            options: ["A campaign to destroy all white lotus flowers",
                "A rebellion that started because of religious reasons", "A secret society that started a rebellion because of taxes",
                "The white lotus were a group of officials that revolted against the emperor"],
            correctAnswer: 2
        },
        {
            question: "The leader of the Taiping Rebellion beleived he was the brother of Jesus. What was his name?",
            options: ["Confucius", "Dalai Lama", "Hong Xiuquan", "Zhou Enlai"],
            correctAnswer: 2
        },
        {
            question: "During the Taiping Rebellion, what was another war that happened in China?",
            options: ["World War 1", "Boxer Rebellion", "Sino-Japanese War", "Second Opium War"],
            correctAnswer: 3
        }
    ],
    currentpage: "start",
    currentQuestion: 0,
    correctScore: 0,
};
//startpage with own template
function startPage() {
    $(".container").empty();
    var firstPage = "<h2>Qing Dynasty</h2><button type = 'submit' class = 'start'>Start</button>";
    $(".container").append(firstPage);
}

function renderQuestion() {
    $(".container").empty();
    var current = state.questions[state.currentQuestion - 1];//current question that we're on
    var optionString = "";
    current.options.map(function (item, optionIndex) {
        var input = "<input type = 'radio' name = options id =" + optionIndex + " value =" + optionIndex + " required>" + item + "<br>";
        optionString += input;
    });
    var itemHTML = `<h3 class = 'question-header'>${state.currentQuestion} of ${state.questions.length}</h3><h3 class = 'questions'>${current.question}</h3><form class = 'answers-form' value = 'text'>${optionString}<button class = 'next-question-button' type = 'submit'>Check Answer</button></form><div class = 'current-score'><div class = 'next-question'><h5 class = 'score_keeper'>${state.correctScore} of ${state.currentQuestion - 1} correct</h5>`;
    //append html instead of replace, use appendTo or append 
    $(".container").append(itemHTML);
}

function checkAnswer(expectedAnswer, userAnswer) {
    var message = "";
    if (expectedAnswer == userAnswer) {
        state.correctScore++;
        message = "<h2>Correct!</h2>"
    }
    
    else {
        var current = state.questions[state.currentQuestion - 1];
        message = 
        `<h3>Sorry, the correct answer is:<h3><h4>"${current.options[current.correctAnswer]}"</h4>`;
    }
    renderAnswersPage(message);
}

function renderAnswersPage(message) {
    var container = $(".container"); //don't call the same jquery selector more than once bc waste of dom resources
    container.empty();
    container.append(message);
    container.append(`<button class = next_question>Next</button>`);

}

function renderNextQuestion() {    
    if (state.currentPage === "question" && state.currentQuestion < state.questions.length) {
        state.currentQuestion++;
        renderQuestion();
    }
    else {
        renderLastPage();
    }
}

function renderLastPage() {
    var container = $(".container");
    container.empty();
    container.append(`<h3>Your Results</h3><h4 class = 'results'>${state.correctScore} out of ${state.currentQuestion} are correct.</h4><button class = replay>Replay</button>`);
}

$("div.container").on("click", "button.next_question", function(event){
    event.preventDefault();
    renderNextQuestion();
});

$("div.container").on("click", "button.replay", function (event) {
    event.preventDefault();
    currentpage = "start";
    state.currentQuestion = 0;
    state.correctScore = 0;
    startPage();
});

$("div").on("click", ".start", function (event) {
    event.preventDefault();
    state.currentPage = "question";
    renderNextQuestion();
});

$("div.container").on("click", "button.next-question-button", function (event) {
    event.preventDefault();
    var current = state.questions[state.currentQuestion - 1];
    var currentOptions = current.options;
    var answer = current.correctAnswer;
    var userAnswer;
    var radios = $("form input:radio");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            userAnswer = radios[i].value;
        }
    }
    checkAnswer(answer, userAnswer);
});
//DONT DO IT - ON CLICK INSIDE OF FUNCTIONS
startPage();