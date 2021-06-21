fetch("https://opentdb.com/api.php?amount=10");

let formulario = document.getElementById("trivia");
let amount = document.getElementById("trivia_amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let start = document.getElementById("start");
let gameover = document.getElementById("gameover");
let next = document.getElementById("siguiente");


let questions;
let qIndex = 0;
let wrongAnswers;

var correct_index_answer;
let currentQuestion;

var rightAnwers = 0;





let getAPIData = e => { //recibe los datos de la url de la api cada vez que clickeo submit
    e.preventDefault();
    fetch("");

    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`
    fetch(url)
        .then(response => {
            return response.json(); //lo convierte a json
        }).then(dataApi => {
            questions = (dataApi.results); //me trae el arreglo tipo objeto en json pero como una promesa
            startGame();
        })
};

const startGame = () => {
    questionsContent.style.display = "flex";
    trivia.style.display = "none";
    currentQuestion = questions[qIndex];
    document.getElementById("preguntaActual").innerText = currentQuestion.question;
    console.log("incorrect anwers:" + currentQuestion.incorrect_answers);



    ///si son de true y false entra al if si no entra al else
    if (currentQuestion.incorrect_answers.length == 1) {
        document.getElementById(1).innerText = "true";
        document.getElementById(2).innerText = "False";

        document.getElementById(1).value = "boolean";
        document.getElementById(2).value = "boolean";
        let x = document.getElementById(3);
        let y = document.getElementById(4);
        x.classList.add("ocultar");
        y.classList.add("ocultar");

    } else {

        correct_index_answer = Math.round(Math.random() * 4); /*numero aleatorio del 1 al 4*/
        /*en la siguiente linea vamos a traer el id que es igual al numero random ycolocarle la respuesta correcta ahi*/
        document.getElementById(correct_index_answer).innerText = currentQuestion.correct_answer;
        let j = 0;
        for (let i = 1; i <= 4; i++) {
            if (i === correct_index_answer) continue /*colocaos todos los demas respuestas */
            else {
                let element = currentQuestion.incorrect_answers[j];
                j++;
                document.getElementById(i).innerText = `${element}`;
            }

        }



    } /*fin else*/

};



//listeners
formulario.addEventListener("submit", getAPIData);

let correcto = document.getElementById("correcto");
let incorrecto = document.getElementById("incorrecto");
let respuesta;
//funcion que escucha el id del click
function cualesmiID(e) {
    if (e.value == "boolean") {

        let id = e.id;
        let ID = parseInt(id);
        console.log(ID); //2 false y el 1 =true
        if (ID === 1) {
            respuesta = True;
        } else { respuesta = False; }

        if (currentQuestion.incorrect_answers === respuesta) {
            console.log("respuesta correcta");

        } else console.log("respuesta incorrecta xxx");


    } else {
        let id = e.id;
        let ID = parseInt(id);


        if (correct_index_answer === ID) {
            correcto.classList.remove("ocultar");
            rightAnwers++;

        } else {
            incorrecto.classList.remove("ocultar");
        }
        document.getElementById("puntuacion").innerText = `tu puntuación es: ${rightAnwers}`;
    }

    let siguiente = () => {
        if (qIndex + 1 < amount.value) {
            qIndex++;
            startGame();
            correcto.classList.add("ocultar");
            incorrecto.classList.add("ocultar");
        } else {
            console.log("ya no hay preguntas");
            next.classList.add("ocultar");
            correcto.classList.add("ocultar");
            gameover.classList.remove("ocultar");
        }
    }

};