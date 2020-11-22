const elements = {
	input: {
		input: document.querySelector('input.number'),
		button: document.querySelector('button.submit')
	}
};

elements.input.input.addEventListener('input', checkInt);

function checkInt(e) {}

function isInt(text) {
	// convert the text into a number and check if its a NaN (Not a Number). Then reverse the result
	return !isNaN(Number(text));
}

function calculate() {
	// reference input element and make sure it is not empty
	let input = elements.input.input;
	// get the numbers split by a comma
	let StrNumbers = input.value.split(',');
	let numbers = [];
	for (let i = 0; i < StrNumbers.length; i++) {
		// convert every number and if it's number, push it into the numbers array
		let number = Number(StrNumbers[i]);
		if (!isNaN(number)) numbers.push(number);
	}
	console.log(numbers);
	console.log(StrNumbers);

	// grab all checkboxes
	let boxes = document.querySelectorAll('.checkbox-container input');
	let checked = [];
	for (let i = 0; i < boxes.length; i++) {
		// if box is checked, add its id to checked array
		if (boxes[i].checked) {
			let operator = boxes[i].id;
			// push to array
			checked.push(operator);
			// find resultant and add to output
			let result = Math[operator](...numbers);
			console.log(numbers, operator, result);
		}
	}

	// add result to output

	input.value = 0;
}

elements.input.input.addEventListener('keydown', (e) => {
	if (e.which == '13') calculate();
});
