let playersData = [];
let selectedPlayer;

// Função para carregar a base de dados de jogadores
async function loadPlayers() {
    const response = await fetch('players.json');
    playersData = await response.json();
    selectedPlayer = playersData[Math.floor(Math.random() * playersData.length)];
    generateQuestions();
    fillPlayerList();
}

// Função para gerar a lista de perguntas
function generateQuestions() {
    const questionList = document.getElementById('question-list');
    const questions = [
        "Qual a nacionalidade do jogador?",
        "Qual a posição do jogador?",
        "Qual o número da camisa?",
        "Onde ele jogou?",
        "Quais ligas ele atuou?",
        "Ele já ganhou a Copa do Mundo?",
        "Ele já ganhou a Champions League?"
    ];

    questions.forEach((question) => {
        const button = document.createElement('button');
        button.textContent = question;
        button.onclick = () => askQuestion(question);
        questionList.appendChild(button);
    });
}

// Função para perguntar e obter a resposta
function askQuestion(question) {
    const resultBox = document.getElementById('result');
    let answer = "";

    switch (question) {
        case "Qual a nacionalidade do jogador?":
            answer = selectedPlayer.nationality;
            break;
        case "Qual a posição do jogador?":
            answer = selectedPlayer.position;
            break;
        case "Qual o número da camisa?":
            answer = selectedPlayer.jerseyNumber;
            break;
        case "Onde ele jogou?":
            answer = selectedPlayer.clubs.join(", ");
            break;
        case "Quais ligas ele atuou?":
            answer = selectedPlayer.leagues.join(", ");
            break;
        case "Ele já ganhou a Copa do Mundo?":
            answer = selectedPlayer.worldCupWinner ? "Sim" : "Não";
            break;
        case "Ele já ganhou a Champions League?":
            answer = selectedPlayer.championsLeagueWinner > 0 ? "Sim" : "Não";
            break;
        default:
            answer = "Pergunta inválida!";
            break;
    }

    resultBox.textContent = `Resposta: ${answer}`;
}

// Função para verificar a resposta do jogador
function checkAnswer() {
    const playerNameInput = document.getElementById('player-name').value;
    const finalResult = document.getElementById('final-result');

    if (playerNameInput.toLowerCase() === selectedPlayer.name.toLowerCase()) {
        finalResult.textContent = "Você acertou! O jogador é " + selectedPlayer.name + ".";
    } else {
        finalResult.textContent = "Você errou! Tente novamente.";
    }
}

// Função para preencher o datalist com os jogadores
function fillPlayerList() {
    const playersDatalist = document.getElementById('players');

    playersData.forEach(player => {
        const option = document.createElement('option');
        option.value = player.name; // Nome do jogador
        playersDatalist.appendChild(option);
    });
}

// Inicializa o jogo
loadPlayers();
