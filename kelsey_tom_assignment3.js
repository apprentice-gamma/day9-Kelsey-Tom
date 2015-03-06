var sget = require('sget');

/* -------------- HANGMAN
	1)give the user a word's length
	2)give the user a limited number of guesses
	3)keep track of used letters
	3b) display used letters upon request
	4)offer up to 2 1-letter hints upon request
	-------------------------------------------- */

/* Things:
	- Word to guess
		-- Array of words, pick one at random?
	- All the letters guessed
		- Missed guesses (?)
		- Correct guesses (needed)
	- Remaining attempts to guess
	- Hints taken randomly from remaining letters
		- hint counter
												*/

/* IDEAS:
	- word to guess as an array to check letters against
	- array to be filled in, same size as TBG (to be guessed)
		-fill in letter by letter
	- check 2 things for win:
		- array matches array
		- countdown > 0
	- maybe push/splice letters from TBG into guessed?
		- not necessarily push + pop/slice, but could replace with emptystrings
		- might make it easier to generate hints
	- do we need to use regex again?
	- cleanse the input, of course

	- menu system:
		"ENTER A LETTER TO GUESS: (!GUESSED, !HINT to display each)"

	- ASCII Hangman?
												*/
var wordList = ["apple", "taco", "nyancat", "moon", "rocket", "boat"];

function Game(word) {
	this.wordToGuess = word;
	this.toGuessArray = this.wordToGuess.split("")
	this.attempts =  6;
	this.hintsLeft = 2;
	this.totalGuesses = [];
	this.guessedWord = new Array(this.toGuessArray.length);
	this.generateHint = function() {
		var hint = " ";
		if (this.hintsLeft > 0) { 
			var letter = false;
			while (letter === false) {
				hint = this.toGuessArray[getRandomInt(0, this.toGuessArray.length)];
				if (hint.match(/[a-z]/)){
					letter = true;
				}	
			}
			this.hintsLeft -= 1;
			console.log("Your Hint is: " + hint);
			displayDuringGame();
		} else {	
			console.log("Sorry! You have no hints left!");
			displayDuringGame();
		}
	}

	this.checkIfGuessIsUsed = function(guess) {
		var guessIndex = this.totalGuesses.indexOf(guess);
		if (guessIndex === -1) {
			//Guess is not used
			this.checkIfGuessCorrect(guess);
		} else {
			console.log("You've already guessed " + guess + " please try again.");
			displayDuringGame();
		}
	} 

	this.checkIfGuessCorrect = function(guess) {
		var guessIndex = this.toGuessArray.indexOf(guess);
		this.totalGuesses.push(guess);
		if (guessIndex === -1) {
			this.guessWasWrong(guess);
		} else {
			this.guessWasGood(guess);
		}
	}
	this.guessWasGood = function(guess) {
		for (var i =0; i< this.toGuessArray.length; i++) {
			if (this.toGuessArray[i] === guess){
				this.guessedWord[i] = guess;
				this.toGuessArray[i] = '_';
			}
		}
		console.log("Your current board is: "+ this.guessedWord.join(""));
		if (this.checkEndGame()){
			endGameHappy();
		} else {
			displayDuringGame();
		}
	}
	this.guessWasWrong = function() {
		this.attempts -= 1;
		console.log("Sorry not part of this word. you have " + this.attempts + " left. Good Luck!");
		if (this.attempts <=0) {
			endGameSad();
		} else {
			displayDuringGame();
		}
	}
	this.checkEndGame = function() {
		return this.guessedWord.join("") === this.wordToGuess;
	}

}

function endGameHappy() {
	console.log("CONGRATS!!! YOU WON!!");
	var answer = sget("Would you like to start a new game? (y/n)").trim();
	if (answer === 'y') {
		newGame = new Game(wordList[getRandomInt(0, wordList.length)]);
		startGame();
	} else {
		exitProgram();
	}
}

function endGameSad() {
	console.log("BOOOO You didn't guess: " + newGame.wordToGuess);
	console.log("ALL YOUR LETTERS ARE BELONG TO US!!!!")
	var answer = sget("Would you like to start a new game? (y/n)").trim();
	if (answer === 'y') {
		newGame = new Game(wordList[getRandomInt(0, wordList.length)]);
		startGame();
	} else {
		exitProgram();
	}
}

var newGame = new Game(wordList[getRandomInt(0, wordList.length)]);

function startGame() {
	
	displayGreeting();
	directInput(getUserInput());

}

function displayDuringGame() {
	console.log("Guess one letter at a time.");
	console.log("Type !HINT, !GUESSED, or !Exit");
	console.log("Your current board is: " + newGame.guessedWord);
	directInput(getUserInput());
}

startGame();
function getUserInput() {
	var userInput = sget("What letter would you like to guess?").trim();
	return userInput;
}

function directInput(userInput) {
	switch(userInput){
		case "!HINT":
			newGame.generateHint();
			break;
		case "!EXIT":
			exitProgram();
			break;
		case "!GUESSED":
			displayAllGuessedLetters(newGame.totalGuesses);
			break;
		default:
			clenseGuess(userInput);
			break;
	}
}

function exitProgram(){
	console.log("Thanks for Playing! Sorry to see you leave!");
}

function clenseGuess(userInput) {
	if (userInput.toLowerCase().match(/[a-z]/) && userInput.length === 1){
		newGame.checkIfGuessIsUsed(userInput);
	} else {
		directInput(getUserInput());
	}
}

function displayGreeting() {
	console.log("Welcome to Hangman!");
	console.log("A Random word has been generated it is " + newGame.wordToGuess.length + "character's long!");
	console.log("You have a fixed amount of guesses, use them wisely");
	console.log("Guess one letter at a time.");
	console.log("Type !HINT for a hint, or !GUESSED to display guessed letters");
	console.log("Type !Exit to exit the program");
}

function displayAllGuessedLetters(guesses) {
	console.log("Letters Used:");
	console.log(guesses.join(''));
	displayDuringGame();
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
