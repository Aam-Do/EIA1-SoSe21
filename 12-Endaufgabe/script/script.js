var allTicTacToes = [];
var allDifficulties = [{ value: 3, name: "Standard" }, { value: 4, name: "Advanced" }, { value: 5, name: "Expert" }];
var player1Turn = true;
var player1Score = 0;
var player2Score = 0;
var round = 0;
var infoField;
var playField;
var comGame = false;
var factor;
window.addEventListener("load", function () {
    infoField = document.querySelector("#info");
    playField = document.querySelector("#field");
    drawStartScreen();
});
function drawStartScreen() {
    infoField.innerHTML = "<h2> Welcome to Tic-Tac-Toe! </h2> <p> Select a game mode: </p>";
    playField.innerHTML = "";
    playField.style.visibility = "hidden";
    comGame = false;
    var pvcButton = document.createElement("button");
    var pvpButton = document.createElement("button");
    var pvcNode = document.createTextNode("Player vs COM");
    var pvpNode = document.createTextNode("Player vs Player");
    pvcButton.appendChild(pvcNode);
    pvpButton.appendChild(pvpNode);
    infoField.appendChild(pvcButton);
    infoField.appendChild(pvpButton);
    pvcButton.addEventListener("click", function () { comGame = true; drawDifficultyScreen(); });
    pvpButton.addEventListener("click", function () { drawDifficultyScreen(); });
}
function drawDifficultyScreen() {
    infoField.innerHTML = "<h2> Welcome to Tic-Tac-Toe! </h2> <p> Select a difficulty level: </p>";
    playField.innerHTML = "";
    var _loop_1 = function (i) {
        var difficulty = allDifficulties[i];
        var newDifficultyButton = document.createElement("button");
        var node = document.createTextNode(difficulty.name);
        var idDifficultyButton = document.createAttribute("id");
        idDifficultyButton.value = (allDifficulties[i].value).toString();
        newDifficultyButton.appendChild(node);
        newDifficultyButton.setAttributeNode(idDifficultyButton);
        infoField.appendChild(newDifficultyButton);
        newDifficultyButton.addEventListener("click", function () { setDifficulty(allDifficulties[i].value, i); });
    };
    for (var i = 0; i < allDifficulties.length; i++) {
        _loop_1(i);
    }
    var backButton = document.createElement("p");
    backButton.innerHTML = "< Back";
    var backButtonId = document.createAttribute("id");
    backButtonId.value = "back";
    backButton.setAttributeNode(backButtonId);
    infoField.appendChild(backButton);
    backButton.addEventListener("click", function () { drawStartScreen(); });
}
function setDifficulty(difficulty, difficultyId) {
    allTicTacToes.length = 0;
    for (var x = 0; x < difficulty; x++) {
        allTicTacToes[x] = [];
        for (var y = 0; y < difficulty; y++) {
            allTicTacToes[x][y] = { state: "free" };
        }
    }
    var cssWidthHeight = 228 + 76 * difficultyId + "px";
    playField.style.width = cssWidthHeight;
    playField.style.height = cssWidthHeight;
    factor = difficultyId;
    drawField();
}
function drawField() {
    playField.innerHTML = "";
    infoField.innerHTML = "";
    playField.style.visibility = "visible";
    for (var x = 0; x < allTicTacToes.length; x++) {
        var _loop_2 = function (y) {
            var ticTacToe = allTicTacToes[x][y];
            var newTicTacToe = document.createElement("div");
            var idTicTacToe = document.createAttribute("id");
            var symbolIcon = document.createElement("i");
            var symbolAtrr = document.createAttribute("class");
            idTicTacToe.value = x.toString() + y.toString();
            if (ticTacToe.state == "free") {
                newTicTacToe.addEventListener("click", function () { clickHandler(idTicTacToe.value); });
            }
            else {
                if (ticTacToe.state == "X") {
                    symbolAtrr.value = "fas fa-times";
                }
                else {
                    symbolAtrr.value = "far fa-circle";
                }
                symbolIcon.setAttributeNode(symbolAtrr);
                newTicTacToe.appendChild(symbolIcon);
            }
            var fragment = void 0;
            if (factor == 0) {
                fragment = 0.9;
            }
            else if (factor == 1) {
                fragment = 0.7;
            }
            else {
                fragment = 0.53;
            }
            var symbolSize = void 0;
            if (window.innerWidth < 480) {
                fragment = 1;
                if (factor == 0) {
                    symbolSize = 63;
                }
                else if (factor == 1) {
                    symbolSize = 47;
                }
                else {
                    symbolSize = 36;
                }
            }
            var ticTacToeWidhHeight = (1 / allTicTacToes.length) * 100 - fragment + "%";
            newTicTacToe.style.width = ticTacToeWidhHeight;
            newTicTacToe.style.height = ticTacToeWidhHeight;
            newTicTacToe.setAttributeNode(idTicTacToe);
            playField.appendChild(newTicTacToe);
            symbolIcon.style.fontSize = symbolSize + "px";
        };
        for (var y = 0; y < allTicTacToes.length; y++) {
            _loop_2(y);
        }
    }
    var player1ScoreElement = document.createElement("span");
    var player1ScoreNode = document.createTextNode("Player 1 Score: " + player1Score);
    var player2ScoreElement = document.createElement("span");
    var player2ScoreNode = document.createTextNode(" | Player 2 Score: " + player2Score);
    if (comGame == true) {
        player1ScoreNode = document.createTextNode("COM Score: " + player1Score);
        player2ScoreNode = document.createTextNode(" | Your Score: " + player2Score);
    }
    var roundCounterElement = document.createElement("span");
    var roundCounterNode = document.createTextNode(" | Round: " + (round + 1) + "/" + allTicTacToes.length);
    var progressBar = document.createElement("div");
    var barId = document.createAttribute("id");
    barId.value = "progressBar";
    progressBar.setAttributeNode(barId);
    var progress = ((1 / allTicTacToes.length) * 100) * (round + 1);
    progressBar.style.background = "linear-gradient(90deg, #799fa0 " + progress + "%, whitesmoke " + progress + "%)";
    player1ScoreElement.appendChild(player1ScoreNode);
    player2ScoreElement.appendChild(player2ScoreNode);
    roundCounterElement.appendChild(roundCounterNode);
    infoField.appendChild(player1ScoreElement);
    infoField.appendChild(player2ScoreElement);
    infoField.appendChild(roundCounterElement);
    infoField.appendChild(progressBar);
    if (player1Turn == true && comGame == true) {
        comTurn();
    }
}
function comTurn() {
    setTimeout(function () {
        while (player1Turn == true) {
            var random1 = Math.floor(Math.random() * allTicTacToes.length);
            var random2 = Math.floor(Math.random() * allTicTacToes.length);
            var randomTicTacToe = allTicTacToes[random1][random2];
            if (randomTicTacToe.state == "free") {
                break;
            }
        }
        clickHandler(random1.toString() + random2.toString());
    }, 200);
}
function clickHandler(xy) {
    for (var x = 0; x < allTicTacToes.length; x++) {
        for (var y = 0; y < allTicTacToes.length; y++) {
            var ticTacToe = allTicTacToes[x][y];
            if (x.toString() + y.toString() == xy) {
                if (player1Turn == true) {
                    ticTacToe.state = "X";
                }
                else {
                    ticTacToe.state = "O";
                }
            }
        }
    }
    player1Turn = !player1Turn;
    var roundEnd = checkRoundEnd();
    if (roundEnd == "win" || roundEnd == "draw") {
        endRestartRound(roundEnd);
    }
    else {
        drawField();
    }
}
function checkRoundEnd() {
    var freeCount = 0;
    for (var x = 0; x < allTicTacToes.length; x++) {
        var win_1 = false;
        var correctSymbols_1 = 0;
        for (var y = 0; y < allTicTacToes.length; y++) {
            var ticTacToe = allTicTacToes[x][y];
            if (ticTacToe.state != "free") {
                if (ticTacToe.state == "X") {
                    correctSymbols_1++;
                }
            }
            else {
                freeCount++;
                correctSymbols_1 = NaN;
            }
        }
        if (correctSymbols_1 == 0 || correctSymbols_1 == allTicTacToes.length) {
            win_1 = true;
        }
        if (win_1 == true) {
            return ("win");
        }
        win_1 = false;
        correctSymbols_1 = 0;
        for (var y = 0; y < allTicTacToes.length; y++) {
            var ticTacToe = allTicTacToes[y][x];
            if (ticTacToe.state != "free") {
                if (ticTacToe.state == "X") {
                    correctSymbols_1++;
                }
            }
            else {
                correctSymbols_1 = NaN;
            }
        }
        if (correctSymbols_1 == 0 || correctSymbols_1 == allTicTacToes.length) {
            win_1 = true;
        }
        if (win_1 == true) {
            return ("win");
        }
    }
    var win = false;
    var correctSymbols = 0;
    for (var x = 0; x < allTicTacToes.length; x++) {
        var ticTacToe = allTicTacToes[x][x];
        if (ticTacToe.state != "free") {
            if (ticTacToe.state == "X") {
                correctSymbols++;
            }
        }
        else {
            correctSymbols = NaN;
        }
    }
    if (correctSymbols == 0 || correctSymbols == allTicTacToes.length) {
        win = true;
    }
    if (win == true) {
        return ("win");
    }
    win = false;
    correctSymbols = 0;
    for (var x = 0; x < allTicTacToes.length; x++) {
        var ticTacToe = allTicTacToes[x][allTicTacToes.length - 1 - x];
        if (ticTacToe.state != "free") {
            if (ticTacToe.state == "X") {
                correctSymbols++;
            }
        }
        else {
            correctSymbols = NaN;
        }
    }
    if (correctSymbols == 0 || correctSymbols == allTicTacToes.length) {
        win = true;
    }
    if (win == true) {
        return ("win");
    }
    if (freeCount == 0) {
        return ("draw");
    }
}
function endRestartRound(roundEnd) {
    if (roundEnd == "win") {
        if (player1Turn == false) {
            player1Score++;
        }
        else {
            player2Score++;
        }
    }
    round += 1;
    var difficultyIndex = 0;
    if (allTicTacToes.length == 4) {
        difficultyIndex = 1;
    }
    else if (allTicTacToes.length == 5) {
        difficultyIndex = 2;
    }
    if (round < allTicTacToes.length) {
        setDifficulty(allDifficulties[difficultyIndex].value, difficultyIndex);
    }
    else {
        gameOver(difficultyIndex);
    }
}
function gameOver(difficultyIndex) {
    playField.innerHTML = "";
    infoField.innerHTML = "";
    playField.style.width = "0px";
    playField.style.height = "0px";
    playField.style.visibility = "hidden";
    var winner;
    if (player1Score > player2Score) {
        winner = "Player 1 ( <i class= 'fas fa-times' ></i> ) won!";
        if (comGame == true) {
            winner = "COM ( <i class= 'fas fa-times' ></i> ) won!";
        }
    }
    else if (player2Score > player1Score) {
        winner = "Player 2 ( <i class= 'far fa-circle' ></i> ) won!";
        if (comGame == true) {
            winner = "You ( <i class= 'far fa-circle' ></i> ) won!";
        }
    }
    else {
        winner = "It's a draw!";
    }
    var winnerAnnouncement = document.createElement("p");
    var restartButton = document.createElement("button");
    var startScreenButton = document.createElement("button");
    var br = document.createElement("br");
    var restartNode = document.createTextNode("Restart");
    var startScreenNode = document.createTextNode("Back to Start Screen");
    var buttonIdMobile = document.createAttribute("id");
    buttonIdMobile.value = "buttonMobile";
    winnerAnnouncement.innerHTML = winner;
    infoField.appendChild(winnerAnnouncement);
    restartButton.appendChild(restartNode);
    startScreenButton.appendChild(startScreenNode);
    startScreenButton.setAttributeNode(buttonIdMobile);
    infoField.appendChild(restartButton);
    infoField.appendChild(br);
    infoField.appendChild(startScreenButton);
    player1Turn = true;
    player1Score = 0;
    player2Score = 0;
    round = 0;
    restartButton.addEventListener("click", function () { setDifficulty(allDifficulties[difficultyIndex].value, difficultyIndex); });
    startScreenButton.addEventListener("click", function () { drawStartScreen(); });
}
//# sourceMappingURL=script.js.map