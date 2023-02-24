function runProgram() {
    function backEndGameMechanics() {
        
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
    
        return {start, startTwoPlayers, toggleInfoModal};
    }
    
    const gameOperation = backEndGameMechanics();
    
    document.getElementById("start").addEventListener("click", gameOperation.start);
    document.getElementById("two-players").addEventListener("click", gameOperation.startTwoPlayers);
    document.getElementById("info").addEventListener("click", gameOperation.toggleInfoModal);
    document.getElementsByClassName("btn-x")[0].addEventListener("click", gameOperation.toggleInfoModal);
}

runProgram();