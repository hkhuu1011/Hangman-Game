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
    $('.displayWord').text(lazyRappers.displayWord);


    //Show message to "press any key to start"
    // $('.gameMessage').text("Press any key to start");

    //Show lives remaining
    $(".livesRemaining").text(lazyRappers.livesRemaining + " Lives Remaining");

    //Show incorrect letters
    $('.incorrectLetters').text("Incorrect Letters: " + lazyRappers.incorrectLetters);

    //Show wins and losses
    $('.wins').text(lazyRappers.wins + " Wins");

    $('.losses').text(lazyRappers.losses + " Losses");


}

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
            $('.displayWord').text(lazyRappers.displayWord);

        //Incorrect letter
        } else if (lazyRappers.incorrectLetters.indexOf(userGuess) == -1) {
            lazyRappers.incorrectLetters += userGuess;

            //Updating incorrect letters
            $('.incorrectLetters').text("Incorrect Letters: " + lazyRappers.incorrectLetters);
            console.log("incorrect letter");

            //Updating lives remaining
            lazyRappers.livesRemaining--;
            $('.livesRemaining').text(lazyRappers.livesRemaining + " Lives Remaining");
            console.log("you guessed wrong");

            }

    }

}

//Updating losses when lives are at 0
function handleUserLosses(userGuess) {
    console.log(userGuess);

    //If lives hits 0, updates losses
    if(lazyRappers.livesRemaining === 0) {
        lazyRappers.currentWord !== 1;
        console.log("end round");

        // lazyRappers.losses++;
        // $('losses').text(lazyRappers.losses + " losses");
        // console.log("added losses");
    }
    

}


//Updating wins when rapper is guessed right
function handleUserWins(userGuess) {
    console.log(userGuess);
    //If the rapper is guessed right, update wins
    for (var i = 0; i < lazyRappers.currentWord.length; i++) {
        if(lazyRappers.currentWord == lazyRappers.displayWord) {
            lazyRappers.currentWord -= 1;
            console.log("round finished");

        lazyRappers.wins++;
        $('.wins').text(lazyRappers.wins + " Wins");
        console.log("added wins");
        }
    }
}


//Go to next round
// function handleNextRound(userGuess) {    
//     // console.log(userGuess);
//     // lazyRappers.displayWord = "";
//     // // $("#displayWord").text("");

//     // startGame();

  

// }

//Grabbing user input
document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase();


    //handle only letters and numbers
    var onlyLettersNumbers = /[a-z][0-9]+/;

    // if valid, then all handleUserInput
    // if (lazyRappers.currentWord === onlyLettersNumbers) {
    //     lazyRappers.currentWord -= 1;
    // } else {
    //     alert("Incorrect character");       
    // }

    //else do nothing
    //regular expressions

    handleUserInput(userGuess);
    handleUserWins(userGuess);

}


    // handleNextRound(userGuess);



$(document).ready(function() {

    //Entry point for game
    startGame();

});






