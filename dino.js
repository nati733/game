const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
let score = 0;
let isJumping = false;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let position = 0;
    let upInterval = setInterval(() => {
        if (position >= 100) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 10;
                dino.style.bottom = position + "px";
            }, 20);
        }
        position += 10;
        dino.style.bottom = position + "px";
    }, 20);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

function checkCollision() {
    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();

    if (dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top) {
        alert("Game Over! Score: " + score);
        location.reload(); // Restart the game
    }
}

function moveCactus() {
    let cactusPosition = 600;
    let cactusInterval = setInterval(() => {
        if (cactusPosition < -30) {
            cactusPosition = 600;
            score++;
            scoreDisplay.textContent = "Score: " + score;
        }
        cactusPosition -= 10;
        cactus.style.right = cactusPosition + "px";
        checkCollision();
    }, 20);
}

moveCactus();