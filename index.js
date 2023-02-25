function runProgram() {

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
        }

        function clearGrid() {
            for (let i = 0; i < gridArray.length; i++) {
                gridArray[i].innerHTML = "";
            }
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

        function winnerMessage() {
            document.getElementsByClassName("game-message")[0].innerHTML = `<h4 id="caption">Game over. `
        }

        return {start, startTwoPlayers, toggleInfoModal, toggleExitModal, leaveGame, restartGame, initializeGame, updateMessageBox, goFirstMessage, turnMessage};
    }

    function gamePlayMechanics() {

        let currentMove = null;

        function determineWhoGoesFirst() {
            //1 is Player 1, 0 is Player 2

            let number = Math.round(Math.random());

            if (number == 1) {
                // Player 1 goes first
                currentMove = number;
                gameOperation.goFirstMessage("Player 1");
            }
            else {
                // Player 2 goes first
                gameOperation.goFirstMessage("Player 2");
                currentMove = number;
            }
        }

        function __takeTurns() {
            if (currentMove === 1) {
                gameOperation.turnMessage("Player 2");
                currentMove = 0;

            }
            else if (currentMove === 0) {
                gameOperation.turnMessage("Player 1");
                currentMove = 1;
            }
        }

        return {determineWhoGoesFirst};
    }

    const gameOperation = backEndGameMechanics();
    const gamePlay = gamePlayMechanics();
    let gridArray = document.getElementsByClassName("cell");

    (function addCellEventListener() {
        for (let i = 0; i < gridArray.length; i++) {
            gridArray[i].addEventListener("click", function () {
                console.log("click!");
            });
        }
    })();

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