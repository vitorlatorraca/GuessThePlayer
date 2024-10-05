// Carregar os jogadores a partir do JSON
let players = [];
let selectedPlayer;
let questionsAsked = 0;

// Função para carregar o JSON e inicializar o jogo
async function loadPlayers() {
    const response = await fetch('players.json');
    players = await response.json();
    selectRandomPlayer();
}

// Selecionar um jogador aleatório
function selectRandomPlayer() {
    const randomIndex = Math.floor(Math.random() * players.length);
    selectedPlayer = players[randomIndex];
    console.log("Jogador selecionado:", selectedPlayer.name); // Para depuração
}

// Função para gerar as perguntas disponíveis
function generateQuestions() {
    const questions = [
        "Qual é a nacionalidade do jogador?",
        "Em quais clubes o jogador jogou?",
        "Em quais ligas ele atuou?",
        "Ele já ganhou a Copa do Mundo?",
        "Ele já ganhou a Champions League?",
        "Qual é a posição dele?",
        "Qual é a cor de pele dele?",
        "Ele ainda está jogando?",
        "Qual é a idade do jogador?",
        "Qual é o número da camisa que ele usava?"
    ];

    const questionList = document.getElementById("question-list");
    questions.forEach((question) => {
        const questionButton = document.createElement("button");
        questionButton.innerText = question;
        questionButton.onclick = () => {
            answerQuestion(question);
        };
        questionList.appendChild(questionButton);
    });
}

// Função para responder a pergunta
function answerQuestion(question) {
    let answer = '';

    switch (question) {
        case "Qual é a nacionalidade do jogador?":
            answer = selectedPlayer.nationality;
            break;
        case "Em quais clubes o jogador jogou?":
            answer = selectedPlayer.clubs.join(', '); // Resposta com os clubes
            break;
        case "Em quais ligas ele atuou?":
            answer = selectedPlayer.leagues.join(', '); // Resposta com as ligas
            break;
        case "Ele já ganhou a Copa do Mundo?":
            answer = selectedPlayer.worldCup ? "Sim" : "Não";
            break;
        case "Ele já ganhou a Champions League?":
            answer = selectedPlayer.championsLeague ? "Sim" : "Não";
            break;
        case "Qual é a posição dele?":
            answer = selectedPlayer.position;
            break;
        case "Qual é a cor de pele dele?":
            answer = selectedPlayer.skinColor;
            break;
        case "Ele ainda está jogando?":
            answer = selectedPlayer.retired ? "Não" : "Sim";
            break;
        case "Qual é a idade do jogador?":
            answer = selectedPlayer.age;
            break;
        case "Qual é o número da camisa que ele usava?":
            answer = selectedPlayer.shirtNumber;
            break;
        default:
            answer = "Pergunta inválida.";
    }

    document.getElementById("result").innerText = answer;
    questionsAsked++;
    if (questionsAsked >= 7) {
        document.getElementById("question-list").style.display = 'none'; // Oculta as perguntas após 7 perguntas
    }
}

// Função para verificar a resposta final
function checkAnswer() {
    const userAnswer = document.getElementById("player-name").value.trim();
    const result = document.getElementById("final-result");
    if (userAnswer.toLowerCase() === selectedPlayer.name.toLowerCase()) {
        result.innerText = "Correto! O jogador era " + selectedPlayer.name + ".";
    } else {
        result.innerText = "Incorreto! O jogador era " + selectedPlayer.name + ".";
    }
}

// Carregar jogadores ao iniciar o script
loadPlayers();
generateQuestions();
