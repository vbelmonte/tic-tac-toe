(function runProgram() {

    let __currentMove = null;
    let __gridArray = document.getElementsByClassName("cell");
    let playerOneName = null;
    let playerTwoName = null;

    function backEndGameMechanics() {

        function __openLandingScreen() {
            let landingScreen = document.getElementsByClassName("landing-screen")[0];
            let startWindow = document.getElementById("start-window");
            landingScreen.style.display = "flex";
            startWindow.style.display = "flex";
        }

        function __leaveGameScreen() {
            let gameScreen = document.getElementsByClassName("main-screen")[0];
            gameScreen.style.display = "none";
        }

        function __hideHeaderButtons() {
            document.getElementById("header-buttons").style.display = "none";
        }

        function __showHeaderButtons() {
            document.getElementById("header-buttons").style.display = "flex";
        }

        function __addExitButtons() {
            return `<div id="gameover-btns">
            <button class="btn-sm btn-green" id="restart">Restart</button>
            <button class="btn-sm btn-red exit-btn">Exit</button>
            </div>`;
        }

        function __assignPlayerNames() {
            let player1 = document.getElementById("player-1");
            let player2 = document.getElementById("player-2");

            if (player1.value === "") {
                playerOneName = "Player 1";
            }
            else {
                playerOneName = player1.value;
            }
            if (player2.value === "") {
                playerTwoName = "Player 2";
            }
            else {
                playerTwoName = player2.value;
            }
        }

        function __clearPlayerNames() {
            playerOneName = null;
            playerTwoName = null;
        }

        function __clearNameInputEntries() {
            document.getElementById("player-1").value = "";
            document.getElementById("player-2").value = "";
        }

        function __initializeGame() {
            __clearGrid();
            gamePlay.determineWhoGoesFirst();
            __setUpGrid();
            __showHeaderButtons();
        }

        function __setUpGrid() {
            for (let i = 0; i < __gridArray.length; i++) {
                __addCellEventListener(__gridArray[i]);
            }
        }

        function __clearGrid() {
            for (let i = 0; i < __gridArray.length; i++) {
                __gridArray[i].innerHTML = "";
                __gridArray[i].classList.remove("x");
                __gridArray[i].classList.remove("o");
                __gridArray[i].classList.remove("end");
                __gridArray[i].style.backgroundColor = "var(--cornsilk)";
            }
        }

        function __disableGrid() {
            for (let i = 0; i < __gridArray.length; i++) {
                __gridArray[i].classList.add("end");
            }
        }

        function __addCellEventListener(cell) { 
            cell.addEventListener("click", function() {
                if (__currentMove === 1) {
                    playerOne.addX(cell);
                }
                else if (__currentMove === 0) {
                    playerTwo.addO(cell);
                }
            });
        }
        
        function start() {
            document.getElementById("start-window").style.display = "none";
            document.getElementById("select-mode").style.display = "flex";
        }
    
        function startTwoPlayers() {
            /*document.getElementById("select-mode").style.display = "none";*/
            document.getElementById("enter-name-mode").style.display = "none";
            document.getElementsByClassName("landing-screen")[0].style.display = "none";
            document.getElementsByClassName("main-screen")[0].style.display = "flex";

            __assignPlayerNames();
            __initializeGame();
        }

        function toggleNamesWindow() {
            document.getElementById("select-mode").style.display = "none";
            document.getElementById("enter-name-mode").style.display = "flex";
        }

        function toggleInfoModal() {
            let infoModal = document.getElementById("modal-info");

            if (infoModal.style.display === "none") {
                infoModal.style.display = "flex";
            }
            else {
                infoModal.style.display = "none";
            }
        }

        function toggleExitModal() {
            let exitModal = document.getElementById("modal-exit");
            
            if (exitModal.style.display === "none") {
                exitModal.style.display = "flex";
            }
            else {
                exitModal.style.display = "none";
            }
        }

        function leaveGame() {
            toggleExitModal();
            __leaveGameScreen();
            __clearPlayerNames();
            __clearNameInputEntries();
            __openLandingScreen();
        }
    
        function restartGame() {
            __initializeGame();
        }

        function endGame() {
            __disableGrid();
            __hideHeaderButtons();
        }

        function highlightBackground() {
            document.getElementsByTagName("body")[0].style.backgroundColor = "var(--green)";
        }

        function restoreBackground() {
            document.getElementsByTagName("body")[0].style.backgroundColor = "var(--light-yellow)";
        }

        function turnMessage(player) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption"><span id="game-object">${player}</span>'s turn.</h4>`;
        }

        function goFirstMessage(player) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption"><span id="game-object">${player}</span> goes first.</h4>`;
        }

        function winnerMessage(winner) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption">Game over. ${winner} wins!</h4>` + __addExitButtons();
            document.getElementById("restart").addEventListener("click", gameOperation.restartGame);
            document.getElementsByClassName("exit-btn")[1].addEventListener("click", gameOperation.toggleExitModal);
        }

        function noWinnerMessage() {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption">No winner.</h4>` + __addExitButtons();
            document.getElementById("restart").addEventListener("click", gameOperation.restartGame);
            document.getElementsByClassName("exit-btn")[1].addEventListener("click", gameOperation.toggleExitModal);
        }

        return {start, startTwoPlayers, toggleNamesWindow, toggleInfoModal, toggleExitModal, leaveGame, restartGame, endGame, highlightBackground, restoreBackground, turnMessage, goFirstMessage, winnerMessage, noWinnerMessage, playerOneName, playerTwoName};
    }

    function gamePlayMechanics() {
        function determineWhoGoesFirst() {
            //1 is Player 1, 0 is Player 2

            let number = Math.round(Math.random());

            if (number == 1) {
                __currentMove = number;
                gameOperation.goFirstMessage(playerOneName);
            }
            else {
                __currentMove = number;
                gameOperation.goFirstMessage(playerTwoName)
            }
        }
        
        function checkForWinner() {
            // run the winnerAlgorithms
            let xWinner = __winnerAlgorithms("x");
            let oWinner = __winnerAlgorithms("o");

            // if winnerAlgorithm checks off, there is a winner and we end the game
            if (xWinner === true || oWinner === true) {
                if (xWinner === true) {
                    gameOperation.winnerMessage(playerOneName);
                }
                else {
                    gameOperation.winnerMessage(playerTwoName);
                }
                gameOperation.endGame();
            }

            // else if all grid cells are filled with no winner, end the game with no winner
            else if (__checkFullGrid() === true) {
                gameOperation.noWinnerMessage();

            }

            // else if there is no winner, keep playing and switch turns
            else {
                __takeTurns();
            }
        }

        function __checkFullGrid() {
            let fullGridFlag = true;

            for (let i = 0; i < __gridArray.length; i++) {
                if (!(__gridArray[i].classList.contains("x")) && !(__gridArray[i].classList.contains("o"))) {
                    fullGridFlag = false;
                    break;
                }
            }
            return fullGridFlag;
        }

        function __highlightWinnerSequence(cell) {
            cell.style.backgroundColor = "var(--purple)";
        }

        function __takeTurns() {
            if (__currentMove === 1) {
                gameOperation.turnMessage(playerTwoName);
                __currentMove = 0;

            }
            else if (__currentMove === 0) {
                gameOperation.turnMessage(playerOneName);
                __currentMove = 1;
            }
        }

        function __winnerAlgorithms(player) {
            if (__gridArray[0].classList.contains(player) && __gridArray[1].classList.contains(player) && __gridArray[2].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[0]);
                __highlightWinnerSequence(__gridArray[1]);
                __highlightWinnerSequence(__gridArray[2]);
                return true;
            }

            else if (__gridArray[3].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[5].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[3]);
                __highlightWinnerSequence(__gridArray[4]);
                __highlightWinnerSequence(__gridArray[5]);
                return true;
            }

            else if (__gridArray[6].classList.contains(player) && __gridArray[7].classList.contains(player) && __gridArray[8].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[6]);
                __highlightWinnerSequence(__gridArray[7]);
                __highlightWinnerSequence(__gridArray[8]);
                return true;
            }

            else if (__gridArray[0].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[8].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[0]);
                __highlightWinnerSequence(__gridArray[4]);
                __highlightWinnerSequence(__gridArray[8]);
                return true;
            }

            else if (__gridArray[2].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[6].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[2]);
                __highlightWinnerSequence(__gridArray[4]);
                __highlightWinnerSequence(__gridArray[6]);
                return true;
            }

            else if (__gridArray[0].classList.contains(player) && __gridArray[3].classList.contains(player) && __gridArray[6].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[0]);
                __highlightWinnerSequence(__gridArray[3]);
                __highlightWinnerSequence(__gridArray[6]);
                return true;
            }

            else if (__gridArray[1].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[7].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[1]);
                __highlightWinnerSequence(__gridArray[4]);
                __highlightWinnerSequence(__gridArray[7]);
                return true;
            }

            else if (__gridArray[2].classList.contains(player) && __gridArray[5].classList.contains(player) && __gridArray[8].classList.contains(player)) {
                __highlightWinnerSequence(__gridArray[2]);
                __highlightWinnerSequence(__gridArray[5]);
                __highlightWinnerSequence(__gridArray[8]);
                return true;
            }

            else {
                return false;
            }
        }

        return {determineWhoGoesFirst, checkForWinner};
    }

    function playerOneMechanics() {
        function addX(cell) {
            if (!(cell.classList.contains("x")) && !(cell.classList.contains("o")) && !(cell.classList.contains("end"))) {
                cell.classList.add("x");
                cell.innerHTML = `<img src="images/x-marker.png">`;
                gamePlay.checkForWinner();
            }
        }
        
        return {addX};
    }

    function playerTwoMechanics() {
        function addO(cell) {
            if (!(cell.classList.contains("x")) && !(cell.classList.contains("o")) && !(cell.classList.contains("end"))) {
                cell.classList.add("o");
                cell.innerHTML = `<img src="images/o-marker.png">`;
                gamePlay.checkForWinner();
            }
        }

        return {addO};
    }

    const gameOperation = backEndGameMechanics();
    const gamePlay = gamePlayMechanics();
    const playerOne = playerOneMechanics();
    const playerTwo = playerTwoMechanics();


    (function assignEventListeners() {
        document.getElementById("start").addEventListener("click", gameOperation.start);
        document.getElementById("two-players").addEventListener("click", gameOperation.toggleNamesWindow);
        document.getElementById("play-two-players").addEventListener("click", gameOperation.startTwoPlayers);
        document.getElementsByClassName("btn-info")[0].addEventListener("click", gameOperation.toggleInfoModal);
        document.getElementsByClassName("btn-x")[0].addEventListener("click", gameOperation.toggleInfoModal);
        document.getElementsByClassName("exit-btn")[0].addEventListener("click", gameOperation.toggleExitModal);
        document.getElementsByClassName("exit-btn")[1].addEventListener("click", gameOperation.toggleExitModal);
        document.getElementsByClassName("exit-btns")[0].addEventListener("click", gameOperation.leaveGame);
        document.getElementsByClassName("exit-btns")[1].addEventListener("click", gameOperation.toggleExitModal);
        document.getElementsByClassName("restart-btn")[0].addEventListener("click", gameOperation.restartGame);
        document.getElementsByClassName("restart-btn")[0].addEventListener("mousedown", gameOperation.highlightBackground);
        document.getElementsByClassName("restart-btn")[0].addEventListener("mouseup", gameOperation.restoreBackground);
        document.getElementById("restart").addEventListener("click", gameOperation.restartGame);
    })();
})();