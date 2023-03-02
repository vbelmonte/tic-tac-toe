function runProgram() {

    let __currentMove = null;
    let __gridArray = document.getElementsByClassName("cell");

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
        
        function start() {
            document.getElementById("start-window").style.display = "none";
            document.getElementById("select-mode").style.display = "flex";
        }
    
        function startTwoPlayers() {
            document.getElementById("select-mode").style.display = "none";
            document.getElementsByClassName("landing-screen")[0].style.display = "none";
            document.getElementsByClassName("main-screen")[0].style.display = "flex";
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
            __openLandingScreen();
        }
    
        function restartGame() {
            initializeGame();
        }

        function initializeGame() {
            clearGrid();
            gamePlay.determineWhoGoesFirst();
            addCellEventListener();
        }

        function clearGrid() {
            for (let i = 0; i < __gridArray.length; i++) {
                __gridArray[i].innerHTML = "";
            }
        }

        function fillCell(marker) {
            
        }

        function updateMessageBox(message) {
            document.getElementById("caption").innerHTML = message;
        }

        function turnMessage(player) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption"><span id="game-object">${player}</span>'s turn.</h4>`;
        }

        function goFirstMessage(player) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption"><span id="game-object">${player}</span> goes first.</h4>`;
        }

        function winnerMessage(winner) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption">Game over. ${winner} wins!`;
        }

        function addCellEventListener() {
            for (let i = 0; i < __gridArray.length; i++) {
                __gridArray[i].addEventListener("click", function() {
                    if (__currentMove === 1) {
                        playerOne.addX(i);
                    }
                    else if (__currentMove === 0) {
                        playerTwo.addO(i);
                    }
                });
            }
        }

        function disableGrid() {
            for (let i = 0; i < __gridArray.length; i++) {
                /*__gridArray[i].removeEventListener();*/
            }
        }

        return {start, startTwoPlayers, toggleInfoModal, toggleExitModal, leaveGame, restartGame, initializeGame, updateMessageBox, goFirstMessage, turnMessage, winnerMessage, disableGrid};
    }

    function gamePlayMechanics() {
        function determineWhoGoesFirst() {
            //1 is Player 1, 0 is Player 2

            let number = Math.round(Math.random());

            if (number == 1) {
                // Player 1 goes first
                __currentMove = number;
                gameOperation.goFirstMessage("Player 1");
            }
            else {
                // Player 2 goes first
                __currentMove = number;
                gameOperation.goFirstMessage("Player 2");
            }
            console.log("currentMove: " + __currentMove);
        }

        function takeTurns() {
            if (__currentMove === 1) {
                gameOperation.turnMessage("Player 2");
                __currentMove = 0;

            }
            else if (__currentMove === 0) {
                gameOperation.turnMessage("Player 1");
                __currentMove = 1;
            }
        }

        function checkForWinner() {
            // run the winnerAlgorithms
            let xWinner = winnerAlgorithms("x");
            let oWinner = winnerAlgorithms("o");

            // if winnerAlgorithm checks off, there is a winner and we end the game
            if (xWinner === true || oWinner === true) {
                if (xWinner === true) {
                    console.log("Player 1 wins!");
                    gameOperation.winnerMessage("Player 1");
                }
                else {
                    console.log("Player 2 wins!");
                    gameOperation.winnerMessage("Player 2");
                }
                gameOperation.disableGrid();
            }

            // else if all grid cells are filled with no winner, end the game with no winner
            else if (checkFullGrid() === true) {
                console.log("No winner.");
                gameOperation.updateMessageBox("No winner.");
            }

            // else if there is no winner, keep playing and switch turns
            else {
                takeTurns();
            }

        }

        function winnerAlgorithms(player) {
            // if gridArray pattern 1 exists, winner   
            if (__gridArray[0].classList.contains(player) && __gridArray[1].classList.contains(player) && __gridArray[2].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            // else if gridArray pattern 2 exists, winner
            else if (__gridArray[3].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[5].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            // else if gridArray pattern 3 exists, winner
            else if (__gridArray[6].classList.contains(player) && __gridArray[7].classList.contains(player) && __gridArray[8].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            // else if gridArray pattern 4 exists, winner
            else if (__gridArray[0].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[8].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            // else if gridArray pattern 5 exists, winner
            else if (__gridArray[2].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[6].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            // else if gridArray pattern 6 exists, winner
            else if (__gridArray[0].classList.contains(player) && __gridArray[3].classList.contains(player) && __gridArray[6].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            // else if gridArray pattern 7 exists, winner
            else if (__gridArray[1].classList.contains(player) && __gridArray[4].classList.contains(player) && __gridArray[7].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            // else if gridArray pattern 8 exists, winner
            else if (__gridArray[2].classList.contains(player) && __gridArray[5].classList.contains(player) && __gridArray[8].classList.contains(player)) {
                // end game, declare player winner
                return true;
            }

            else {
                return false;
            }
        }

        function checkFullGrid() {
            let fullGridFlag = true;

            for (let i = 0; i < __gridArray.length; i++) {
                if (!(__gridArray[i].classList.contains("x")) && !(__gridArray[i].classList.contains("o"))) {
                    fullGridFlag = false;
                    break;
                }
            }
            return fullGridFlag;
        }

        return {determineWhoGoesFirst, takeTurns, checkForWinner};
    }

    function playerOneMechanics() {

        function addX(i) {
            if (!(__gridArray[i].classList.contains("x")) && !(__gridArray[i].classList.contains("o"))) {
                __gridArray[i].classList.add("x");
                __gridArray[i].innerHTML = `<img src="images/x-marker.png">`;
                gamePlay.checkForWinner();
            }
        }
        
        return {addX};
    }

    function playerTwoMechanics() {
        function addO(i) {
            if (!(__gridArray[i].classList.contains("x")) && !(__gridArray[i].classList.contains("o"))) {
                __gridArray[i].classList.add("o");
                __gridArray[i].innerHTML = `<img src="images/o-marker.png">`;
                gamePlay.checkForWinner();
            }
        }

        return {addO};
    }

    const gameOperation = backEndGameMechanics();
    const gamePlay = gamePlayMechanics();
    const playerOne = playerOneMechanics();
    const playerTwo = playerTwoMechanics();


    document.getElementById("start").addEventListener("click", gameOperation.start);
    document.getElementById("two-players").addEventListener("click", gameOperation.startTwoPlayers);
    document.getElementById("info").addEventListener("click", gameOperation.toggleInfoModal);
    document.getElementsByClassName("btn-x")[0].addEventListener("click", gameOperation.toggleInfoModal);
    document.getElementsByClassName("exit-btn")[0].addEventListener("click", gameOperation.toggleExitModal);
    document.getElementsByClassName("exit-btn")[1].addEventListener("click", gameOperation.toggleExitModal);
    document.getElementsByClassName("exit-btns")[0].addEventListener("click", gameOperation.leaveGame);
    document.getElementsByClassName("exit-btns")[1].addEventListener("click", gameOperation.toggleExitModal);
    document.getElementById("restart").addEventListener("click", gameOperation.restartGame);
}

runProgram();