var readline = require('readline');
var interface = readline.createInterface({	//create the interface
	input: process.stdin,						// determine input
	output: process.stdout					// determine output
});

function clearScreen() {
	process.stdout.write('\033c');
}

function startCalculator() {
	console.log("Welcome to the calculator!");
	console.log("Please select an operation:");
	console.log("+ : addition");
	console.log("- : subtraction");
	console.log("* : multiplication");
	console.log("/ : division");
	console.log("sq : square root");
	console.log("exit: exit");

	interface.question('What is your input?:', function(answer) {
		calculatorControl(answer);
	});
}

function exit(){
	process.exit(0);
}

function calculatorControl(input) {
	switch (input) {
		case '+' :
		case '-' :
		case '*' :
		case '/' :
			getUserNumbers(2, [input]);
			break;
		case 'sq':
			getUserNumbers(1, [input]);
			break;
		case 'exit': exit();
			break;
		default	: startCalculator();
			break;
	}
};

function getUserNumbers(numberOfInputs, array)
{	
	interface.question('Please enter number: ', function(answer) {
		array.push(answer)
		checkNumberInput(numberOfInputs, array);
	});
}
function checkNumberInput(numberOfInputs, array) {
	if (isNaN(array[array.length - 1])){
		console.log("WORD! Use a number instead.");
		array.pop();
	} else {
		numberOfInputs = checkInputLoop(numberOfInputs, array);
	}
	getUserNumbers(numberOfInputs, array);
}

function checkInputLoop(numberOfInputs, array){
	if (numberOfInputs > 1){
		return numberOfInputs -=1;	
	} else {
		doMathStuff(array);
	} 
}

function doMathStuff(array) {
	switch (array[0]) {
		case '+' : 
			outputAnswer(Number(array[1]) + Number(array[2]));
			break;
		case '-' :
			outputAnswer(Number(array[1]) - Number(array[2]));
			break; 
		case '*' :
			outputAnswer(Number(array[1]) * Number(array[2]));
			break;
		case '/' :
			outputAnswer(Number(array[1]) / Number(array[2]));
			break;
		case 'sq':
			outputAnswer(Math.sqrt(array[1]));
			break;
		case 'exit': exit();
			break;
		default	: startCalculator();
			break;
	}
}

function outputAnswer(answer) {
	console.log("Your Result: " + answer);
	interface.question('Go again? (y/n)', function(exitAnswer) {
		if (exitAnswer === "y" || exitAnswer === "yes") {
			startCalculator();
		} else if (exitAnswer === "n" || exitAnswer === "no") {
			exit();
		} else {
			outputAnswer("I'm sorry I can't do that Robb!!!!");
		}
	});
}

clearScreen();
startCalculator();