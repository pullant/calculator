//TODO -3 + 1 breaks
let displayValue = "";
const main	=	document.querySelector("main");
const display	=	document.querySelector("#display");

main.addEventListener("click", (e) => {
	switch (e.target.id) {
		case "one":
			console.log("1");
			displayValue += "1";
			display.innerText = displayValue;
			break;
		case "two":
			console.log("2");
			displayValue += "2";
			display.innerText = displayValue;
			break;
		case "three":
			console.log("3");
			displayValue += "3";
			display.innerText = displayValue;
			break;
		case "four":
			console.log("4");
			displayValue += "4";
			display.innerText = displayValue;
			break;
		case "five":
			console.log("5");
			displayValue += "5";
			display.innerText = displayValue;
			break;
		case "six":
			console.log("6");
			displayValue += "6";
			display.innerText = displayValue;
			break;
		case "seven":
			console.log("7");
			displayValue += "7";
			display.innerText = displayValue;
			break;
		case "eight":
			console.log("8");
			displayValue += "8";
			display.innerText = displayValue;
			break;
		case "nine":
			console.log("9");
			displayValue += "9";
			display.innerText = displayValue;
			break;
		case "zero":
			console.log("0");
			displayValue += "0";
			display.innerText = displayValue;
			break;
		case "dot":
			console.log(".");
			displayValue += ".";
			display.innerText = displayValue;
			break;
		case "add":
			console.log("+");
			displayValue += " + ";
			display.innerText = displayValue;
			break;
		case "divide":
			console.log("/");
			displayValue += " / ";
			display.innerText = displayValue;
			break;
		case "multiply":
			console.log("*");
			displayValue += " * ";
			display.innerText = displayValue;
			break;
		case "subtract":
			console.log("-");
			displayValue += " - ";
			display.innerText = displayValue;
			break;
		case "clearA":
		case "clearB":
			console.log("⌫");
			displayValue = "";
			display.innerText = displayValue;
			break;
		case "equalsA":
		case "equalsB":
			console.log("=");
			displayValue = resolveOperation(displayValue);
			display.innerText = displayValue;
			break;
	}
});

function resolveOperation(display) {
	for (let i = 0; i < 10; i++) {
		if (display !== "" && displayValue !== "") {
			display = calculate(parseOperation(display)) + displayValue;
		}
		else
			return display;
	}
	return "ERROR: Too many operations at once."
}

function parseOperation(operation) {
	let a = "";
	let b = "";
	let operator = "";

	console.log("prev: ", displayValue);//////////////////////

	operation = operation.replace(/\s/g, "").split("")

	let done = false; // capturing operators
	for(let i of operation) {
		if (!done && isNumber(i)) {
			a += i;
		}
		else if (done && isNumber(i)) {
			b += i;
		}
		else if (!done) {
			done = true;
			switch (i) {
				case "+":
				case "-":
					operator = i;
					break;
				case "/":
				case "*":
				default:
					display.innerText = "ERROR: Unsupported operation.";
			}
		}
		else if (done) {
			break;
		}
	}



	// cut the display value to the rest of the operation
	displayValue = operation.slice((a + b + operator).length).join("");
	console.log("after: ", displayValue);//////////////////////
	console.log(`a: ${a} b: ${b} operator: ${operator}`);//////////////////////

	// in case press equals with no operation
	if (b === "")
		return [a];

	return [+a, +b, operator];
}

function isNumber(character) {
	return !isNaN(character) ;
}

function calculate(operation) {
	let a = operation[0];
	// in case press equals with no operation
	if (!operation[1]) {
		return operation[0];
	}
	let b = operation[1];
	let operator = operation[2];

	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return divide(a, b);
		default:
			alert( "Unsupported operation." );
	}
}

function add(a, b) {
	console.log(`${a} + ${b} =`, a + b);
	return a + b;
}


function subtract(a, b) {
	console.log(`${a} - ${b} =`, a - b);
	return a - b;
}


function multiply(a, b) {
	console.log(`${a} * ${b} =`, a * b);
	return a * b;
}


function divide(a, b) {
	console.log(`${a} / ${b} =`, a / b);
	return a / b;
}
