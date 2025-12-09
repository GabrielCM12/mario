const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const gameOverScreen = document.querySelector('.game-over');
const restartBtn = document.querySelector('#restart-btn');

let score = 0;
let gameRunning = true;

const jump = () => {
    if (!gameRunning) return;
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    if (!gameRunning) return;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''));

    // Atualiza pontuação quando o cano passa
    if (pipePosition < 0) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    // Detecta colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameRunning = false;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        gameOverScreen.style.display = 'block';
    }
}, 10);

document.addEventListener('keydown', jump);

// Reiniciar jogo
restartBtn.addEventListener('click', () => {
    // Resetar variáveis
    gameRunning = true;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    gameOverScreen.style.display = 'none';

    // Restaurar Mario
    mario.src = './imagens/mario.png';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';
    mario.style.animation = '';

    // Restaurar Pipe
    pipe.style.animation = 'pipe-animation 2s infinite linear';
    pipe.style.left = 'auto';
});
