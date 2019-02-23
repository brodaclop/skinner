function createGames() {
    //TODO: don't duplicate this enum
    const State = {
        LIGHT : "light",
        DARK : "dark"
    };

    function alternating() {

        let round = 0;

        function move(answer) {
            return {
                correct : answer == (round % 2 == 0 ? State.LIGHT : State.DARK),
                nextQuestion : (++round % 2 == 0 ? State.LIGHT : State.DARK)
            };
        }

        return {
            name : 'Alternating',
            move : move
        };
    }

    function inverseAlternating() {

        let round = 0;

        function move(answer) {
            return {
                correct : answer == (round % 2 != 0 ? State.LIGHT : State.DARK),
                nextQuestion : (++round % 2 == 0 ? State.LIGHT : State.DARK)
            };
        }

        return {
            name : 'Alternating / Inverse Answers',
            move : move
        };
    }


    function randomised() {
        let current = State.LIGHT;

        function move(answer) {
            return {
                correct : answer == current,
                nextQuestion : current = (Math.random() > 0.5 ? State.LIGHT : State.DARK)
            };
        }

        return {
            name : 'Randomised',
            move : move
        };
    }


    function delayedAnswer() {

        let previous = null;
        let current = null;

        function move(answer) {
            const check = previous;
            previous = current;
            return {
                correct : answer == check,
                nextQuestion : current = (Math.random() > 0.5 ? State.LIGHT : State.DARK)
            };
        }

        return {
            name : 'Randomised / Delayed Answer',
            move : move
        };
    }

    return [
        inverseAlternating,
        alternating,
        delayedAnswer,
        randomised
    ];
}