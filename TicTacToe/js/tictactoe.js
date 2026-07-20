// This variable keeps track of whose turn it is.
let activePlayer = "X";

// This array stores moves such as "0X" or "4O".
let selectedSquares = [];

// This variable prevents more moves after a win or tie.
let gameOver = false;

// These are all possible winning square combinations.
const winningCombinations = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["6", "4", "2"]
];

// These coordinates correspond to the winning combinations above.
const winLineCoordinates = [
    [50, 100, 558, 100],
    [50, 304, 558, 304],
    [50, 508, 558, 508],
    [100, 50, 100, 558],
    [304, 50, 304, 558],
    [508, 50, 508, 558],
    [100, 100, 520, 520],
    [100, 508, 510, 90]
];

/**
 * Places an X or O in the selected square.
 * Returns true when a move is successfully placed.
 */
function placeXOrO(squareNumber) {
    // Do not allow moves after the game has ended.
    if (gameOver) {
        return false;
    }

    // Check whether this square was already selected.
    const squareAlreadyUsed = selectedSquares.some(
        move => move.startsWith(squareNumber)
    );

    if (squareAlreadyUsed) {
        return false;
    }

    // Retrieve the clicked table cell.
    const selectedSquare = document.getElementById(squareNumber);

    // Display the image belonging to the active player.
    if (activePlayer === "X") {
        selectedSquare.style.backgroundImage = 'url("images/x.png")';
    } else {
        selectedSquare.style.backgroundImage = 'url("images/o.png")';
    }

    // Store the move and play the placement sound.
    selectedSquares.push(squareNumber + activePlayer);
    audio("./media/place.mp3");

    // Check whether the move ended the game.
    if (checkWinConditions()) {
        return true;
    }

    // Change the active player.
    activePlayer = activePlayer === "X" ? "O" : "X";

    // Give the computer a turn after the human places X.
    if (activePlayer === "O" && !gameOver) {
        setStatus("Computer is thinking...");
        disableClick();

        setTimeout(function () {
            computersTurn();
        }, 700);
    } else if (!gameOver) {
        setStatus("Your turn");
    }

    return true;
}

/**
 * Chooses a random available square for the computer.
 */
function computersTurn() {
    if (gameOver) {
        return;
    }

    const availableSquares = [];

    // Build an array containing only unused square numbers.
    for (let i = 0; i < 9; i++) {
        const squareNumber = String(i);
        const used = selectedSquares.some(
            move => move.startsWith(squareNumber)
        );

        if (!used) {
            availableSquares.push(squareNumber);
        }
    }

    // Stop if no moves remain.
    if (availableSquares.length === 0) {
        return;
    }

    // Select one available square at random.
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    placeXOrO(availableSquares[randomIndex]);
}

/**
 * Checks every possible winning combination.
 * Returns true if the current move caused a win or tie.
 */
function checkWinConditions() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];

        if (
            arrayIncludes(
                combination[0] + activePlayer,
                combination[1] + activePlayer,
                combination[2] + activePlayer
            )
        ) {
            gameOver = true;
            setStatus(activePlayer + " wins!");

            const coordinates = winLineCoordinates[i];
            drawWinLine(
                coordinates[0],
                coordinates[1],
                coordinates[2],
                coordinates[3]
            );

            return true;
        }
    }

    // A full board without a winning combination is a tie.
    if (selectedSquares.length >= 9) {
        gameOver = true;
        setStatus("Tie game!");
        audio("./media/tie.mp3");

        setTimeout(function () {
            resetGame();
        }, 1200);

        return true;
    }

    return false;
}

/**
 * Checks whether three specific move values are stored in the array.
 */
function arrayIncludes(squareA, squareB, squareC) {
    return (
        selectedSquares.includes(squareA) &&
        selectedSquares.includes(squareB) &&
        selectedSquares.includes(squareC)
    );
}

/**
 * Temporarily disables clicks while the computer is taking its turn.
 */
function disableClick() {
    const body = document.getElementById("body");
    body.style.pointerEvents = "none";

    setTimeout(function () {
        if (!gameOver) {
            body.style.pointerEvents = "auto";
        }
    }, 800);
}

/**
 * Creates and plays an audio file from the supplied path.
 */
function audio(audioURL) {
    const sound = new Audio(audioURL);

    // Ignore autoplay-related promise errors without stopping the game.
    const playPromise = sound.play();

    if (playPromise !== undefined) {
        playPromise.catch(function () {
            // The game still works if the browser blocks sound.
        });
    }
}

/**
 * Draws an animated winning line on the HTML canvas.
 */
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById("win-lines");
    const context = canvas.getContext("2d");

    let x = coordX1;
    let y = coordY1;

    // Calculate small movement steps toward the endpoint.
    const differenceX = coordX2 - coordX1;
    const differenceY = coordY2 - coordY1;
    const totalSteps = 45;
    const stepX = differenceX / totalSteps;
    const stepY = differenceY / totalSteps;
    let step = 0;

    // Disable clicking and play the win sound.
    document.getElementById("body").style.pointerEvents = "none";
    audio("./media/winGame.mp3");

    function animateLineDrawing() {
        context.clearRect(0, 0, 608, 608);
        context.beginPath();
        context.moveTo(coordX1, coordY1);
        context.lineTo(x, y);
        context.lineWidth = 10;
        context.lineCap = "round";
        context.strokeStyle = "rgba(70, 255, 33, 0.85)";
        context.stroke();

        if (step < totalSteps) {
            x += stepX;
            y += stepY;
            step++;
            requestAnimationFrame(animateLineDrawing);
        }
    }

    animateLineDrawing();

    // Clear the winning line and begin a new game.
    setTimeout(function () {
        clearCanvas();
        resetGame();
    }, 1500);
}

/**
 * Removes all content from the winning-line canvas.
 */
function clearCanvas() {
    const canvas = document.getElementById("win-lines");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Resets the board after a win, tie, or reset-button click.
 */
function resetGame() {
    // Remove all X and O images from the table cells.
    for (let i = 0; i < 9; i++) {
        const square = document.getElementById(String(i));
        square.style.backgroundImage = "";
    }

    // Reset all game variables.
    selectedSquares = [];
    activePlayer = "X";
    gameOver = false;

    clearCanvas();
    document.getElementById("body").style.pointerEvents = "auto";
    setStatus("Your turn");
}

/**
 * Updates the status message shown below the board.
 */
function setStatus(message) {
    document.getElementById("status").textContent = message;
}
