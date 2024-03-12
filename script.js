/**
 * Internal variable that keeps track of the current possible display value.
 * @type {string}
 */
let displayValue = "";

/** @type {Array<string>} */
let displayHistory = [];

/** @type {string} */
let post = "";

/** @type {string} */
let prev = "";

/** @type {Array<string>} */
let prevLog = [];

/**
 * Complete interface of the calculator.
 * @type {HTMLElement}
 */
const main = document.querySelector("main");

/**
 * Display that shows current operation.
 * @type {HTMLElement}
 */
const display = document.querySelector("#display");

/**
 * Display that shows previous operations.
 * @type {HTMLElement}
 */
const history = document.querySelector("#history");

/**
 * Mouse support.
 */
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
		case "backspace":
			console.log("⌫");
			displayValue = display.textContent.slice(0, -1);
			display.innerText = displayValue;
			break;
		case "clear":
			console.log("C");
			displayValue = "";
			display.innerText = displayValue;
			break;
		case "equalsA":
		case "equalsB":
			console.log("=");
			displayHistory.push(displayValue);
			/** @type {string} */
			let result = solveOperation(displayValue);
			history.innerText = buildHistory(result, 3);
			display.innerText = result;
			displayValue = result;
			break;
	}
	display.scrollLeft = display.scrollWidth;
});

/**
 * Keyboard support.
 */
document.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "1":
			console.log("1");
			displayValue += "1";
			display.innerText = displayValue;
			break;
		case "2":
			console.log("2");
			displayValue += "2";
			display.innerText = displayValue;
			break;
		case "3":
			console.log("3");
			displayValue += "3";
			display.innerText = displayValue;
			break;
		case "4":
			console.log("4");
			displayValue += "4";
			display.innerText = displayValue;
			break;
		case "5":
			console.log("5");
			displayValue += "5";
			display.innerText = displayValue;
			break;
		case "6":
			console.log("6");
			displayValue += "6";
			display.innerText = displayValue;
			break;
		case "7":
			console.log("7");
			displayValue += "7";
			display.innerText = displayValue;
			break;
		case "8":
			console.log("8");
			displayValue += "8";
			display.innerText = displayValue;
			break;
		case "9":
			console.log("9");
			displayValue += "9";
			display.innerText = displayValue;
			break;
		case "0":
			console.log("0");
			displayValue += "0";
			display.innerText = displayValue;
			break;
		case ".":
			console.log(".");
			displayValue += ".";
			display.innerText = displayValue;
			break;
		case "+":
			console.log("+");
			displayValue += " + ";
			display.innerText = displayValue;
			break;
		case "/":
			e.preventDefault();
			console.log("/");
			displayValue += " / ";
			display.innerText = displayValue;
			break;
		case "*":
			console.log("*");
			displayValue += " * ";
			display.innerText = displayValue;
			break;
		case "-":
			console.log("-");
			displayValue += " - ";
			display.innerText = displayValue;
			break;
		case "Backspace":
			e.preventDefault();
			console.log("⌫");
			displayValue = display.textContent.slice(0, -1);
			display.innerText = displayValue;
			break;
		case "Escape":
			console.log("C");
			displayValue = "";
			display.innerText = displayValue;
			break;
		case "Enter":
			console.log("=");
			displayHistory.push(displayValue);
			/** @type {string} */
			let result = solveOperation(displayValue);
			history.innerText = buildHistory(result, 3);
			display.innerText = result;
			displayValue = result;
			break;
	}
	display.scrollLeft = display.scrollWidth;
});

/**
 * Build a log of the last operations completed from "old" to "new".
 * @param {string} result
 * @param {number} numOfHistoryElements
 * @returns {string} New history of completed operations.
 */
function buildHistory(result, numOfHistoryElements) {
	let length = displayHistory.length;

	if (!result) {
		displayHistory.pop();
		return displayHistory.join("\n");
	}

	displayHistory[length - 1] += ` = ${result}`;

	if (length > numOfHistoryElements) {
		displayHistory.shift();
	}

	return displayHistory.join("\n");
}

/**
 * Recursion counter.
 * @type {number}
 */
let i = 0;

/**
 * Solve operation and handle errors.
 * @param {string} operation
 * @returns {string} New operation or final result.
 */
function solveOperation(operation) {
	let parsed = parseOperation(operation);
	/*
	if parsed is:
		"" -> DONE => operation
		"number" -> DONE => operation
		"final result" -> DONE => operation
		"ERROR" -> DONE => "" (max num recursions)

		[operation] ->
			calculate([operation]) -> result
			(displayValue -> displayValue without [operation] -> displayValue)
			result + displayValue -> "operation" => solveOperation(operation) ||
				=> "ERROR" too many recursions/operations
	*/

	// Add round of recursion
	i++;
	if (i > 9) {
		console.log(`-------- ERROR: Unsupported operation: op1 OVER MAX OPERATIONS -----`);
		i = 0;
		return "ERROR"
	}

	if (parsed === "DONE") {
		console.log(`-------- Operation ${i} -----------------------------------------------`);
		console.log("solveOperation()\n\toperation =>", operation);
		console.log("\tdisplayValue =>", displayValue);
		console.log("\tparsed =>", parsed);
		console.log(`-------- DONE ------------------------------------------------------`);
		console.log("Result = ", operation);
		console.log(`====================================================================`);
		i = 0;
		return operation;
	}
	else if (parsed === "ERROR") {
		console.log(`-------- DONE ------------------------------------------------------`);
		console.log(`====================================================================`);
		return "";
	}
	console.log(`-------- Operation ${i} -----------------------------------------------`);
	console.log("solveOperation()\n\toperation =>", operation);
	console.log("\tdisplayValue =>", displayValue);
	console.log("\tparsed =>", parsed);
	prevLog[i - 1] = prev;
	if (i > 1 && prevLog[i - 1] === prevLog[i]) {
		console.log(`-------- ERROR: Unsupported operation: op2 NO CHANGE ---------------`);
		return "ERROR"
	}
	operation = calculate(parsed) + displayValue;
	return solveOperation(operation);
}


/**
 * @typedef Operation
 * @type {[a: number, b: number, operator: string]}
 */

/* jsdoc
 * Solve operation and handle errors.
 * @param {string} operation
 * @returns {(Array<number, string> | string)}
 * 	[a, b, operator] An array with the operands a and b, and their operator.
 * 	Or, a string with a number, the final result, or an ERROR.
 */

/**
 * Solve operation and handle errors.
 * @param {string} operation
 * @returns {(Operation | string)} Operation or a string with: a number, the final result, or an ERROR.
 */
function parseOperation(operation) {
	/*
	if operation is:
		"" -> DONE => "DONE"
		"number" -> DONE => "DONE"
		"final result" -> DONE => "DONE"
		"ERROR" => "ERROR"

	else parse operation:
	*/

	// isNaN()
	// - an operation string or any other string that cannot be converted to a number = true
	// - a numeric string or an empty string which converts to 0 = false
	if (!isNaN(operation)) {
		return "DONE";
	}
	else if (operation === "ERROR") {
		return "ERROR";
	}

	let a = "";
	let b = "";
	let operator = "";
	let operationLength = 0;

	operation = operation.replace(/\s/g, "")
	console.log(`-------- Parsing: -----------------------------------------------------`);
	prev = operation;
	console.log("\tprev parsing: ", prev);
	console.log("\tProcessing...");
	let numbers = operation.match(/[-\+]?\d+(\.\d+)?/g);
	console.log("\tnumbers:", numbers);
	a = numbers[0];
	b = numbers[1];
	operation = operation.replace(a, "n");
	console.log("\t" + operation);
	operation = operation.replace(b, "n");
	console.log("\t" + operation);

	if (!b) {
		displayValue = "";
		return [+a];
	}
	else {
		operationLength = operation.match(/.*n.*n/g)[0].length;
		console.log("\toperation lenght:", operationLength);
	}
	if (operationLength === 2) {
		console.log("\tabstract operation:", operation.match(/n(.*)n/))
		operation = operation.replaceAll("n", "");
		console.log("\tnext operation:", operation)
		operator = "+";
	}
	else if (operationLength > 3) {
		displayValue = "";
		console.log(`-------- ERROR: Unsupported operator: TOO MANY OPERATORS [ ${operation} ] --`);
		return "ERROR";
	}
	else {
		console.log("\tabstract operation:", operation.match(/n(.*)n/))
		operator = operation.match(/n(.*)n/)[1] // match the group
		console.log("\t1:", operation)
		operation = operation.replaceAll("n", "");
		console.log("\t2:", operation)
		operation = operation.replace(operator, "");
		console.log("\t3:", operation)
	}

	if (operation[0] === "*" || operation[0] === "/") {
		b = solveOperation(b + operation);
		operation = "";
	}

	if (b === "ERROR") {
		displayValue = "";
		return "ERROR";
	}

	displayValue = operation
	post = displayValue;
	console.log("\tParsed operation => a:", a, "b:", b, "operator:", operator);
	console.log("\tpost parsing: ", post);

	return [+a, +b, operator];
}

/* jsdoc
 * @param {Object[]} Operation
 * @param {number} Operation[].a First operand.
 * @param {number} Operation[].b Second operand.
 * @param {string} Operation[].operator Operator.
 */

/**
 * @param {Operation}
 * @returns {number} Result.
 */
function calculate([a, b, operator]) {
	console.log("calculate()\n\t[operation] => a:", a, "b:", b, "operator:", operator);

	if (!operator)
		return a;

	if (a === "E")
		return "ERROR";

	let result;
	switch (operator) {
		case "+":
			result = add(a, b);
			break;
		case "-":
			result = subtract(a, b);
			break;
		case "*":
			result = multiply(a, b);
			break;
		case "/":
			result = divide(a, b);
			break;
		default:
			console.log(`-------- ERROR: Unsupported operation: op3 UNSUPPORTED OPERATOR [ ${operator} ] -`);
			return "ERROR";
	}

	if (result === Infinity || result === -Infinity) {
		console.log("\tresult:", result);
		console.log(`-------- ERROR: Unsupported result: op4 Infinity or -Infinity ------`);
		return "ERROR";
	}
	else {
		console.log("\tresult:", result);
		return result;
	}
}

/**
 * Primitive Operations.
 * @param {number} a First operand.
 * @param {number} b Second operand.
 * @returns {number} Result.
 */
function add(a, b) {
	return a + b;
}
function subtract(a, b) {
	return a - b;
}
function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}
