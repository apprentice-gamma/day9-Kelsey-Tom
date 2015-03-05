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
	this.guessedWord = new Array(toGuessArray.length);
	this.generateHint = function() {
		var hint = " ";
		if (this.hintsLeft > 0) { 
			hint = this.toGuessArray[getRandomInt(0, this.toGuessArray.length)];
			this.hintsLeft -= 1;
			console.log("Your Hint is: " + hint);
		
		} else {	
			console.log("Sorry! You have no hints left!");
		
		}
	}

	this.checkIfGuessIsUsed = function(guess) {
		var guessIndex = this.totalGuesses.indexOf(guess);
		if (guessIndex === -1) {
			//Guess is not used
			this.checkIfGuessCorrect(guess);
		} else {
			console.log("You've already guessed " + guess + " please try again.");
		}
	} 

	this.checkIfGuessCorrect = function(guess) {
		var guessIndex = this.toGuessArray.indexOf(guess);
		if (guessIndex === -1) {
			this.guessWasWrong(guess);
		} else {
			this.guessWasGood(guess, guessIndex);
		}
	}
	this.guessWasGood = function(guess) {
				
	}
	this.guessWasWrong = function(guess, guessIndex) {

	}

}

var newGame = new Game(wordList[getRandomInt(0, wordList.length)]);

function startGame() {
	

	displayGreeting();

}

function displayGreeting() {
	console.log("Welcome to Hangman!");
	console.log("A Random word has been generated");
	console.log("You have a fixed amount of guesses, use them wisely");
	console.log("Guess one letter at a time.");
	console.log("Type !HINT for a hint, or !GUESSED to display guessed letters");
	console.log("Type !Exit to exit the program");
}

function displayAllGuessedLetters(guesses) {
	console.log("Letters Used:");
	console.log("-------------");
	console.log(guesses.join());
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
