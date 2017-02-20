// Game object
var lazyRappers = {
    wordBank: ["desiigner", "2chainz", "soulja boi", "young thug", "post malone"],
    livesRemaining: 10,
    usedLetters: "",
    incorrectLetters: "",
    wins: 0,
    losses: 0,
    currentWord: "",
    displayWord: "",
};

// startGame function
function startGame() {  
    // get random word from wordBank
    lazyRappers.currentWord = lazyRappers.wordBank[Math.floor(Math.random() * lazyRappers.wordBank.length)];
    console.log("current word= ", lazyRappers.currentWord);

    //uppercase
    lazyRappers.currentWord = lazyRappers.currentWord.toUpperCase();

    //generate display word on screen
    console.log("currentWord length =" , lazyRappers.currentWord.length);
    
    // loop to the word to separate letters
    for(var i = 0; i < lazyRappers.currentWord.length; i++) {
        if (lazyRappers.currentWord[i] != " ") {
            lazyRappers.displayWord += "_";
        } else {
            lazyRappers.displayWord += lazyRappers.currentWord[i];
            console.log("display word= ",lazyRappers.displayWord);
        }
    }

    startScreen();
}  // end startGame function

//Render start screen
function startScreen() {
    //Show the display word on the screen
    $('.displayWord').html(lazyRappers.displayWord);


    //Show message to "press any key to start"
    // $('.gameMessage').text("Press any key to start");

    //Show lives remaining
    $(".livesRemaining").html(lazyRappers.livesRemaining + " Lives Remaining");

    //Show incorrect letters
    $('.incorrectLetters').html("Incorrect Letters: " + lazyRappers.incorrectLetters);

    //Show wins and losses
    $('.wins').html(lazyRappers.wins + " Wins");

    $('.losses').html(lazyRappers.losses + " Losses");
} //end startScreen function

//Handling users letter guess
function handleUserInput(userGuess) {
    console.log(userGuess);

    //Check to see if letter pressed was already used
    if (lazyRappers.usedLetters.indexOf(userGuess) === -1) {
        lazyRappers.usedLetters += userGuess;
        console.log("Here's your guess");

        //Guessed right
        if (lazyRappers.currentWord.indexOf(userGuess) !== -1) {
            console.log("you guessed right");

            //Changes strings to arrays for letters
            var temp = lazyRappers.displayWord.split('');
            console.log(temp);

            //Loop through current word
            for (var i = 0; i < lazyRappers.currentWord.length; i++) {
                if (lazyRappers.currentWord[i] == userGuess) {
                    temp[i] = userGuess;
                }
            }
            lazyRappers.displayWord = temp.join('');

            //updating the display word
            $('.displayWord').html(lazyRappers.displayWord);

        //Incorrect letter
        } else if (lazyRappers.incorrectLetters.indexOf(userGuess) == -1) {
            lazyRappers.incorrectLetters += userGuess;

            //Updating incorrect letters
            $('.incorrectLetters').html("Incorrect Letters: " + lazyRappers.incorrectLetters);
            console.log("incorrect letter");

            //Updating lives remaining
            lazyRappers.livesRemaining--;
            $('.livesRemaining').html(lazyRappers.livesRemaining + " Lives Remaining");
            console.log("you guessed wrong");
            }
    }
} //end handleUserInput function

//Updating losses when lives are at 0
function handleUserLosses(userGuess) {

    //If lives hits 0, updates losses
    for (var i = 0; i < lazyRappers.currentWord.length; i++) {
        if(lazyRappers.livesRemaining == 0) {
            lazyRappers.currentWord -= 1;
            console.log("end round");

            lazyRappers.losses++;
            $('.losses').html(lazyRappers.losses + " Losses");
            console.log("added losses");
        }
    }    
} //end handleUserLosses function

//Updating wins when rapper is guessed right
function handleUserWins(userGuess) {
    
    //If the rapper is guessed right, update wins
    for (var i = 0; i < lazyRappers.currentWord.length; i++) {
        if(lazyRappers.currentWord == lazyRappers.displayWord) {
            lazyRappers.currentWord -= 1;
            console.log("round finished");

        lazyRappers.wins++;
        $('.wins').html(lazyRappers.wins + " Wins");
        console.log("added wins");
        }
    }
} //end handleUserWins

// Reset game, go to next round
function resetGame(userGuess) {
    for (var i = 0; i < lazyRappers.currentWord.length; i++) {
        if(lazyRappers.currentWord == lazyRappers.displayWord) {
            lazyRappers.displayWord = "";
            lazyRappers.currentWord = "";
        console.log("reset displayWord");
        }
    }
}

//Grabbing user input
document.onkeyup = function (event) {
    //Converts key pressed into string based on the char code for that key
    var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

    //Checks the way the key is converted in the console
    console.log("User guessed: ", userGuess);

    //Checks for only letters and numbers
    var onlyLettersNumbers = /[A-Z0-9]/;

    //Use expression test() function to check that it was letter or number pressed
    var isValid = onlyLettersNumbers.test(userGuess);
    console.log("Is a valid letter?", isValid);

    if(isValid) {
        handleUserInput(userGuess);
        } else {
            lazyRappers.incorrectLetters -= userGuess;
            alert ("Invalid character.");
        }

    handleUserInput(userGuess);
    handleUserWins(userGuess);
    handleUserLosses(userGuess);
    resetGame(userGuess);

}; //end user input

$(document).ready(function() {

    //Entry point for game
    startGame();

});






