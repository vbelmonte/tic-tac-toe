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
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption"><span id="game-object">${player}'s</span> turn.</h4>`;
        }

        function goFirstMessage(player) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption"><span id="game-object">${player}</span> goes first.</h4>`;
        }

        function winnerMessage(winner) {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption">Game over. ${winner} wins!`;
        }

        function addCellEventListener() {
            console.log("in addCellEventListener, current move is: " + __currentMove);
            for (let i = 0; i < __gridArray.length; i++) {
                if (__currentMove === 1) {
                    __gridArray[i].addEventListener("click", function() {
                        __gridArray[i].innerHTML = `<img src="images/x-marker.png">`;
                        console.log("x marker");
                    });
                }
                else if (__currentMove === 0) {
                    __gridArray[i].addEventListener("click", function () {
                        __gridArray[i].innerHTML = `<img src="images/o-marker.png">`;
                        console.log("o marker");
                    });
                }
            }
        }

        return {start, startTwoPlayers, toggleInfoModal, toggleExitModal, leaveGame, restartGame, initializeGame, updateMessageBox, goFirstMessage, turnMessage};
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

        function __takeTurns() {
            if (__currentMove === 1) {
                gameOperation.turnMessage("Player 2");
                __currentMove = 0;

            }
            else if (currentMove === 0) {
                gameOperation.turnMessage("Player 1");
                __currentMove = 1;
            }
        }

        return {determineWhoGoesFirst};
    }

    function playerOneMechanics() {
        function addX() {

        }
    }

    function playerTwoMechanics() {
        function addO() {

        }
    }

    const gameOperation = backEndGameMechanics();
    const gamePlay = gamePlayMechanics();


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