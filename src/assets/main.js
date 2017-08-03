let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') {
    	setHiddenFields();
    }
    if (!validateInput(input.value)) {
    	return false;
    } else {
    	attempt++;
    }

    if (getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    } else {
    	if (attempt >= 10) {
    		setMessage("You Lose! :(");
    		showAnswer(false);
    		showReplay();
    	} else {
    		setMessage("Incorrect, try again.");
    	}
    }
}

//implement new functions here

function setHiddenFields() {
	answer = Math.floor(Math.random() * 9999).toString();
	while (answer.length < 4) {
		answer = '0' + answer;
	}
	attempt = 0;
}

function setMessage (input) {
	document.getElementById('message').innerHTML = input;
}

function validateInput (input) {
	if (input.toString().length === 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults (input) {
	
	var output = '';
	var inputArray = input.toString().split('');
	var numCorrect = 0;
	for(var i = 0; i < 4; i++) {
		if (inputArray[i] === answer[i]) {
			output += '<span class="glyphicon glyphicon-ok"></span>';
			numCorrect++;
		} else {
			var exists = false;
			for (var j = 0; j < 4; j++) {
				if (inputArray[i] === answer[j]) {
					exists = true;
					break;
				}
			}
			if (exists) {
				output += '<span class="glyphicon glyphicon-transfer"></span>';
			} else {
				output += '<span class="glyphicon glyphicon-remove"></span>';
			}
		}
	}
	document.getElementById('results').innerHTML += ('<div class="row"><span class="col-md-6">' + input
												 + '</span><div class="col-md-6">' + output
												 + '</div></div>');
	if (numCorrect === 4) {
		return true;
	} else {
		return false;
	}
}

function showAnswer (input) {
	document.getElementById('code').innerHTML = answer;
	if (input) {
		document.getElementById('code').className = 'success';
	} else {
		document.getElementById('code').className = 'failure';
	}
}

function showReplay() {
	document.getElementById('guessing-div').style.display = 'none';
	document.getElementById('replay-div').style.display = 'block';
}