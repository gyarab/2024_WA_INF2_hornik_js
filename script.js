const app = document.getElementById('app');


let boardSize = 4; 
let playerTurn = 1;
let playerScores = [0, 0];
let moves = 0;

const imagePaths = [

    'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Cherry-256.png',
    'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Lemon-512.png',
    'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Grape-512.png',
    'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Watermelon-512.png',
    'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Apple-512.png',
    'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Strawberry-512.png',
    'https://cdn0.iconfinder.com/data/icons/fruity-3/512/Orange-512.png',
    'https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Coin.png',
];


const createCardImages = (size) => {
    const values = [...imagePaths, ...imagePaths];
    return values.sort(() => 0.5 - Math.random());
};


const createBoard = (size) => {
    const board = document.createElement('div');
    board.className = 'board';
    board.style.gridTemplateColumns = `repeat(${size}, 80px)`;
    const values = createCardImages(size);

    values.forEach((imagePath) => {
        const card = document.createElement('div');
        card.className = 'card';

        
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundImage = `url(${imagePath})`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });

    return board;
};

let flippedCards = [];

// Funkce pro otáčení karet
const flipCard = (card) => {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
};

// Kontrola shody dvojice
const checkMatch = () => {
    moves++;
    const [card1, card2] = flippedCards;
    const image1 = card1.querySelector('.card-back').style.backgroundImage;
    const image2 = card2.querySelector('.card-back').style.backgroundImage;

    if (image1 === image2) {
        playerScores[playerTurn - 1]++;
        flippedCards = [];
        updateScore();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            switchPlayer();
        }, 1000);
    }
};

// Přepínání hráče
const switchPlayer = () => {
    playerTurn = playerTurn === 1 ? 2 : 1;
    updateTurn();
};

// Aktualizace skóre a tahu
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

// Restart hry
const restartGame = () => {
    playerTurn = 1;
    playerScores = [0, 0];
    moves = 0;
    app.innerHTML = '';
    init();
};

// Inicializace hry
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