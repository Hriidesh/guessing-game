document.addEventListener("DOMContentLoaded", function() {
    var lowerLimit = 1;
    var upperLimit = 100;
    var number = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
    var attempts = 0;
    var history = [];
    var hotColdThreshold = 10;
    var guessInput = document.getElementById("guess-input");
    var guessButton = document.getElementById("guess-button");
    var result = document.getElementById("result");
    var attemptsInfo = document.getElementById("attempts");
    var feedbackInfo = document.getElementById("feedback");
    var hintInfo = document.getElementById("hint");

    guessButton.addEventListener("click", function() {
        var guess = parseInt(guessInput.value);
        attempts++;
        history.push(guess);

        if (guess < number) {
            result.textContent = "Too low!";
        } else if (guess > number) {
            result.textContent = "Too high!";
        } else {
            result.textContent = "Congratulations! You guessed the number " + number + " in " + attempts + " attempts.";
            disableGuessing();
        }

        var remainingAttempts = 7 - attempts;
        if (remainingAttempts > 0) {
            attemptsInfo.textContent = "You have " + remainingAttempts + " attempts left.";

            if (attempts > 1) {
                var prevGuess = history[history.length - 2];
                var prevDistance = Math.abs(number - prevGuess);
                var currDistance = Math.abs(number - guess);

                if (currDistance < prevDistance) {
                    feedbackInfo.textContent = "Getting warmer!";
                } else if (currDistance > prevDistance) {
                    feedbackInfo.textContent = "Getting colder!";
                } else {
                    feedbackInfo.textContent = "Same distance as before!";
                }
            }

            if (Math.abs(number - guess) <= hotColdThreshold) {
                feedbackInfo.textContent += " You're getting hot!";
            } else {
                feedbackInfo.textContent += " You're getting cold!";
            }

            if (number % guess === 0) {
                hintInfo.textContent = "Hint: The number is divisible by your guess!";
            } else {
                hintInfo.textContent = "Hint: The number is not divisible by your guess!";
            }
        }

        if (attempts === 7 && guess !== number) {
            result.textContent = "Sorry, you ran out of attempts. The number was " + number + ".";
            disableGuessing();
        }

        guessInput.value = "";
    });

    function disableGuessing() {
        guessInput.disabled = true;
        guessButton.disabled = true;
    }
});
