function init() {
    const State = {
        LIGHT : "light",
        DARK : "dark"
    };

    const RECOGNITION_THRESHOLD = 5;

    const result = document.getElementById("result");
    const question = document.getElementById("question");
    const startPanel = document.getElementById("start-panel");
    const startPanelDescription = document.getElementById("start-panel-description");
    const startPanelText = document.getElementById("start-panel-text");
    const startButton = document.getElementById("start-button");
    const light_button = document.getElementById("light-button");
    const dark_button = document.getElementById("dark-button");

    let currentGame;
    let consecutiveCorrect;
    let tries;
    
    function start() {
        const games = createGames();

        currentGame = games[Math.floor(Math.random() * games.length)]();
        consecutiveCorrect = 0;
        tries = 0;
        result.innerText = 'Press a button';
        question.className = State.LIGHT;
        startPanel.style = "visibility : hidden";
    }

    function end() {
        question.className = State.LIGHT;
        result.innerText = '';
        startPanelDescription.innerHTML = "You've played the <em>"+currentGame.name+"</em> game."
        startPanelText.innerHTML = "You've completed the game in <em>"+tries+"</em> moves.";
        startPanel.style = "visibility : visible";
        currentGame = null;
    }


    

    function respond(answer) {
        if (!currentGame)
            return;
        const next = currentGame.move(answer);
        result.innerText = next.correct ? "Correct" : "Incorrect";
        tries++;
        if (next.correct) {
            if (++consecutiveCorrect >= RECOGNITION_THRESHOLD) {
                end();
                return;
            }
        } else {
            consecutiveCorrect = 0;
        }
        question.className = next.nextQuestion;
    }

    light_button.onclick = function() {
        respond(State.LIGHT);
    }

    dark_button.onclick = function() {
        respond(State.DARK);
    }

    startButton.onclick = start;

};