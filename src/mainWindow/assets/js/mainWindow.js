const elements = {
	input: {
		input: document.querySelector('input.number'),
		button: document.querySelector('button.submit')
	},
	output: {
		parameters: document.querySelector('.parameters#output-parameters'),
		output: document.querySelector('.output')
	}
};

function initalize() {
	// add parameters
	addParameter(elements.output.parameters, { text: 'Preserve Log', on: true }, 'switch', 'log', 'toggleLog()', config.parameters.log);
	addElement('button', { id: 'clear-log', onclick: 'clearLog()' }, 'Clear Log', elements.output.parameters);
}
initalize();

function loadData() {
	// load input value
	elements.input.input.value = config.input.input;

  // load parameters
  let parameters = config.input.parameters;
  for(let parameter in parameters) {
    if(parameters[parameter]) document.querySelector('input#' + parameter).checked = true;
	}
	
	// load data
	for(let row in data) {
		addRow(data[row].operator, data[row].result);
	}

}

loadData();



elements.input.input.addEventListener('input', checkInt);

function checkInt(e) {
	config.input.input = e.target.value;
}

function isInt(text) {
	// convert the text into a number and check if its a NaN (Not a Number). Then reverse the result
	return !isNaN(Number(text));
}

function calculate() {
	// clear log if switch is on
	if(!config.parameters.log) clearLog();

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
			let result = String(Math[operator](...numbers));
			addRow(operator, result);
			data['row_' + config.index] = {
				operator: operator,
				index: config.index,
				result: result
			}
			config.index++;
		}
	}

	// add result to output

	input.value = '';
}


elements.input.input.addEventListener('keydown', (e) => {
	if (e.which == '13') calculate();
});



function addRow(operator, result) {
	// add row
	let row = addElement('div', { class: 'row', id: operator, onclick: 'copy(this)' }, undefined, elements.output.output);
	row.addEventListener('contextmenu', highlight);
	let cell = addElement('div', {class: 'cell', id: operator }, undefined, row);
	addElement('div', { class: 'cell-child prefix', id: operator }, operator + ' 🡒 ', cell);
	addElement('div', { class: 'cell-child result', id: operator }, result, cell);
}



function copy(e) {
	// get row
	let row = document.querySelector('.row#' + e.id);
	let cell = document.querySelector('.cell#' + e.id);
	// get the result
	let result = document.querySelector('#' + e.id + ' .result').textContent;

	// make an invisible input element and set the result as its value
	let input = addElement('input', { style: 'opacity: 0; height: 0; padding: 0; margin: 0;' }, result, document.body);

	// select input and copy value
	input.select();
	document.execCommand('copy');
	// copied animation
	toast(e.id, 'Copied!');
	
	row.classList.add('highlight');
	cell.classList.add('highlight');
	
	
	
	// delete elements
	document.body.removeChild(input);
	setTimeout(() => {
		row.classList.remove('highlight');
		cell.classList.remove('highlight');
	}, 1275);

}


function clearLog() {
	elements.output.output.innerHTML = '';
	data = {};
}

function toggleLog() {
	config.parameters.log = !config.parameters.log;
}


function toast(id, message) {
	let toast = addElement('span', { class: 'toast', id: id + '-toast' }, message, document.body);
	setTimeout(() => { document.body.removeChild(toast) }, 1500);
}




function highlight(e) {
	let id = e.target.id;
	console.log(e.target);
	let rows = document.querySelectorAll('.row');
	let cells = document.querySelectorAll('.row .cell');
	for (let i = 0; i < rows.length; i++) {
		rows[i].classList.remove('highlight');
		cells[i].classList.remove('highlight');
	}
	document.querySelector('.row#' + id).classList.add('highlight');
	document.querySelector('.cell#' + id).classList.add('highlight');
}


function parameterEdit(e) {
	config.input.parameters[e.id] = !config.input.parameters[e.id];
}