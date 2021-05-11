(function () {
    "use strict";

    // General variables and DOM elements.
    let startBtn = document.querySelector("[data-start]");
    let board = document.querySelectorAll("[data-boardtile]");
    let snake = [2, 1, 0];
    let score = 0;
    let scoreDisplay = document.querySelector("[data-score]");
    let width = 10;

    let speed = 1000;
    let direction = 1;
    let gameRunning = 0;

    // Methods
    let drawSnake = function () {
        for (let tile of board) {
            tile.classList.remove("snake");
        }

        for (let index of snake) {
            board[index].classList.add("snake");
        }
    };

    let moveSnake = function () {
        snake.unshift(snake[0] + direction);
        let tail = snake.pop();
        drawSnake();
        return tail;
    };

    let generateApple = function () {
        for (let tile of board) {
            tile.classList.remove("apple");
        }
        let position;
        do {
            position = Math.floor(Math.random() * board.length);
        } while (board[position].classList.contains("snake"));
        board[position].classList.add("apple");
    };

    let updateScore = function () {
        scoreDisplay.textContent = score;
    };

    let eatApple = function (head, tail) {
        board[head].classList.remove("apple");
        snake.push(tail);
        board[tail].classList.add("snake");
        speed *= 0.9;
        score += 10;
        updateScore();
        clearInterval(gameRunning);
        gameRunning = setInterval(gameStep, speed);
        generateApple();
    };

    let gameOver = function () {
        clearInterval(gameRunning);
        gameRunning = 0;
    };

    let checkEnd = function () {
        if (
            (snake[0] % 10 === 0 && direction === -1) ||
            (snake[0] % 10 === width && direction === 1) ||
            (snake[0] / width < 1) & (direction === -width) ||
            (snake[0] / width >= width - 1) & (direction === -width)
        ) {
            gameOver();
        }
    };

    let gameStep = function () {
        checkEnd();
        let tail = moveSnake();
        let head = snake[0];

        if (board[head].classList.contains("apple")) {
            eatApple(head, tail);
        }
    };

    let updateDirection = function (event) {
        switch (event.code) {
            case "ArrowUp":
                direction = -width;
                break;

            case "ArrowDown":
                direction = width;
                break;

            case "ArrowRight":
                direction = 1;
                break;

            case "ArrowLeft":
                direction = -1;
                break;
        }
    };

    let resetGame = function () {
        score = 0;
        snake = [2, 1, 0];
        speed = 1000;

        clearInterval(gameRunning);
        drawSnake();
        generateApple();
        gameRunning = window.setInterval(gameStep, speed);

        document.addEventListener(
            "keydown",
            function (e) {
                if (
                    [
                        "Space",
                        "ArrowUp",
                        "ArrowDown",
                        "ArrowLeft",
                        "ArrowRight",
                    ].indexOf(e.code) > -1
                ) {
                    e.preventDefault();
                }
            },
            false
        );
    };
    // Game init
    startBtn.addEventListener("click", resetGame);

    document.addEventListener("keyup", updateDirection);
})();
