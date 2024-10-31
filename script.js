const app = document.getElementById('app');


let boardSize = 4;
let playerTurn = 1;
let playerScores = [0, 0];
let moves = 0;


const createCardValues = (size) => {
    const values = [];
    for (let i = 1; i <= (size * size) / 2; i++) {
        values.push(i, i);
    }
    return values.sort(() => 0.5 - Math.random());
};


const createBoard = (size) => {
    const board = document.createElement('div');
    board.className = 'board';
    board.style.gridTemplateColumns = `repeat(${size}, 80px)`;
    const values = createCardValues(size);

    values.forEach((value) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });

    return board;
};

let flippedCards = [];


const flipCard = (card) => {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;
    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
};


const checkMatch = () => {
    moves++;
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        playerScores[playerTurn - 1]++;
        flippedCards = [];
        updateScore();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
            flippedCards = [];
            switchPlayer();
        }, 1000);
    }
};


const switchPlayer = () => {
    playerTurn = playerTurn === 1 ? 2 : 1;
    updateTurn();
};


const updateScore = () => {
    document.getElementById('score').textContent = `Hráč 1: ${playerScores[0]} | Hráč 2: ${playerScores[1]}`;
    if (playerScores[0] + playerScores[1] === (boardSize * boardSize) / 2) {
        alert(`Hra skončila! Výsledek: Hráč 1: ${playerScores[0]} - Hráč 2: ${playerScores[1]}`);
    }
};

const updateTurn = () => {
    document.getElementById('turn').textContent = `Na tahu: Hráč ${playerTurn}`;
    document.getElementById('moves').textContent = `Počet tahů: ${moves}`;
};


const restartGame = () => {
    playerTurn = 1;
    playerScores = [0, 0];
    moves = 0;
    app.innerHTML = '';
    init();
};


const init = () => {
    const controls = document.createElement('div');
    controls.className = 'controls';

    const score = document.createElement('div');
    score.id = 'score';
    score.textContent = `Hráč 1: 0 | Hráč 2: 0`;
    controls.appendChild(score);

    const turn = document.createElement('div');
    turn.id = 'turn';
    turn.textContent = `Na tahu: Hráč 1`;
    controls.appendChild(turn);

    const movesCount = document.createElement('div');
    movesCount.id = 'moves';
    movesCount.textContent = `Počet tahů: 0`;
    controls.appendChild(movesCount);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restartovat hru';
    restartButton.addEventListener('click', restartGame);
    controls.appendChild(restartButton);

    app.appendChild(controls);
    app.appendChild(createBoard(boardSize));
};

init();
