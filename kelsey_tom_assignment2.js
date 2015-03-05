var readline = require('readline');
var interface = readline.createInterface({	//create the interface
	input: process.stdin,						// determine input
	output: process.stdout					// determine output
});

function startProgram() {
	interface.question("Please enter a word to check: ",function(userInput){
		var input = cleanseInput(userInput);
		var inputArray = input.split("");
		var flippedInput = flipInput(inputArray);
		checkPalindrome(input, flippedInput, userInput);
		playAgain()
	});
}

function flipInput(inputArray) {
	return inputArray.reverse().join("");
}

function checkPalindrome(input, flippedInput, originalInput){
	if (input === flippedInput){
		console.log( originalInput + " is a palindrome!!")
	} else {
		console.log( originalInput + " is not a palindrome sorry!")
	}
}

function dropNonAlphabet (input) {
	var string = input;

	for (var counter = 0; counter < string.length; counter++){
		string = string.replace(/[^a-zA-z\d]/, "").replace(" ", "");
	}
	return string;
}

function clearScreen() {
	process.stdout.write('\033c');
}

function cleanseInput(word){
	return dropNonAlphabet(word.toString());
}

function playAgain(){
	interface.question("Would you like to play again? (y/n)", function(answer){
		if (answer === 'y'){
			startProgram();
		} else if (answer === 'n'){
			console.log("Thanks for playing!");
			interface.close();
		} else {
			console.log("Invalid try again!");
			playAgain();
		}
	})
}

clearScreen()
startProgram();