document.addEventListener('DOMContentLoaded', () => {
    const goku = document.getElementById('goku');
    const attack = document.getElementById('attack');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    let isJumping = false;
    let attackPosition = 800;
    let attackSpeed = 5;
    let gameOver = false;
    let gameStarted = false;
    let score = 0;

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        gameStarted = true;
        moveAttack();
        increaseScore();
    });

    restartButton.addEventListener('click', () => {
        window.location.reload();
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && gameStarted) {
            jump();
        }
    });

    gameContainer.addEventListener('click', (event) => {
        if (gameStarted && !isJumping) {
            jump();
        }
    });

    function jump() {
        if (isJumping) return;
        isJumping = true;
        goku.classList.add('jumping');

        setTimeout(() => {
            goku.classList.remove('jumping');
            isJumping = false;
        }, 1000);
    }

    function moveAttack() {
        const attackInterval = setInterval(() => {
            if (gameOver) {
                clearInterval(attackInterval);
                return;
            }

            attackPosition -= attackSpeed;
            attack.style.left = attackPosition + 'px';

            if (attackPosition <= 0) {
                attackPosition = 800; // Reset attack position
            }

            // Collision detection
            const gokuRect = goku.getBoundingClientRect();
            const attackRect = attack.getBoundingClientRect();

            if (
                attackRect.left < gokuRect.right &&
                attackRect.right > gokuRect.left &&
                attackRect.bottom > gokuRect.top &&
                attackRect.top < gokuRect.bottom &&
                !isJumping
            ) {
                gameOver = true;
                restartButton.style.display = 'block';
            }
        }, 20);

        // Increase speed after 10 seconds
        setTimeout(() => {
            attackSpeed = 8;
        }, 10000);
    }

    function increaseScore() {
        const scoreInterval = setInterval(() => {
            if (gameOver) {
                clearInterval(scoreInterval);
                return;
            }

            score += 1;
            scoreDisplay.textContent = `Score: ${score}`;

            if (score >= 1000 && !goku.classList.contains('super-saiyan')) {
                transformToSuperSaiyan();
            }
        }, 100);
    }

    function transformToSuperSaiyan() {
        goku.classList.add('transformation');
        setTimeout(() => {
            goku.classList.remove('transformation');
            goku.classList.add('super-saiyan');
        }, 3000); // Espera 3 segundos antes de aplicar o estilo de Super Saiyajin
    }
});
