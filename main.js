fetch("https://opentdb.com/api.php?amount=10");

let formulario = document.getElementById("trivia");
let amount = document.getElementById("trivia_amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let start = document.getElementById("start");


let questions;
let qIndex = 0;
let wrongAnswers;



//funciones

let getAPIData = e => { //recibe los datos de la url de la api cada vez que clickeo submit
    e.preventDefault();
    fetch("");

    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`
    fetch(url)
        .then(response => {
            return response.json(); //lo convierte a json
        }).then(dataApi => {
            questions = (dataApi.results); //me trae el arreglo tipo objeto en json pero como una promesa
            console.log(questions);
            startGame();
        })
};

const startGame = () => {
    questionsContent.style.display = "flex";
    trivia.style.display = "none";

    let currentQuestion = questions[qIndex];
    document.getElementById("preguntaActual").innerText = currentQuestion.question;

    console.log(currentQuestion.question);
    console.log(currentQuestion.correct_answer);
    console.log(currentQuestion.incorrect_answers);
    ///si son de true y false entra al if si no entra al else
    if (currentQuestion.incorrect_answers.length == 1) {
        document.getElementById(1).innerText = "true";
        document.getElementById(2).innerText = "False";
        let x = document.getElementById(3);
        let y = document.getElementById(4);
        x.classList.add("ocultar");
        y.classList.add("ocultar");
    } else {
        let correct_index_answer = Math.round(Math.random() * 4);

        document.getElementById(correct_index_answer).innerText = currentQuestion.correct_answer;
        let j = 0;
        for (let i = 1; i <= 4; i++) {
            if (i === correct_index_answer) continue
            else {
                let element = currentQuestion.incorrect_answers[j];
                j++;
                document.getElementById(i).innerText = `${element}`;
            }

        }


    }

};

//funcion que oculta y muestra elementos
let next = e => {

}

//variable para controlar las preguntas una por una 
//let currentQuestion = question[qIndex];
//document.getElementById("questionName").innerText = currentQuestion.question;


//listeners
formulario.addEventListener("submit", getAPIData);