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
    
        return {start, startTwoPlayers};
    }
    
    const gameOperation = backEndGameMechanics();
    
    document.getElementById("start").addEventListener("click", gameOperation.start);
    document.getElementById("two-players").addEventListener("click", gameOperation.startTwoPlayers);
}

runProgram();