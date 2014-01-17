// functions.js
// contains basic functions for the Automata Game
// J. Hassler Thurston
// 17 January 2014 (Adapted from Mathematica code written in June 2013)
// Please see README.md for a description of the game

var row, rows, columns, rules, score, rows_left, reveal1, reveal2, current_row;

var initialize_vars = function(r, c) {
	row = 0; // the current row number
	rows = r; // the number of rows total
	columns = c; // the number of columns total
	current_row = initialize_row(c); // initialize the current row with half the chips for each player
	score = [0,0]; // initialize the score to be 0-0
	compute_score(current_row); // compute the score for the current (first) row
	rules = initialize_rules(); // initialize the automata rules
	rows_left = r-1; // the number of rows left to be revealed
	reveal1 = 3; // the number of turns until Player 1 must reveal a row
	reveal2 = 3; // the number of turns until Player 2 must reveal a row
}

// computes the score given the current row
var compute_score = function(current_row) {
	// reset the score
	score = [0,0];
	// count up the squares for each player
	for(var i = 0; i < current_row.length; i++) {
		score[current_row[i]]++;
	}
}

// initializes the first row of the board
var initialize_row = function(c) {
	// inspired by http://stackoverflow.com/questions/12987719/javascript-how-to-randomly-sample-items-without-replacement
	// we want to select the same number of 0s and 1s
	// initialize an array of positions
	var positions = []
	for(var i = 0; i < c; i++) {
		positions.push(i);
	}
	// now set half of these values to randomly be "0s"
	var array_0 = []
	for(var i = 0; i < c/2; i++) {
		// first pick a random position between 0 and (c-i)
		var random_index = Math.floor(Math.random()*(c-i));
		// now offset this position by the number of elements already in array_0 that are < the random number
		var offset = 0;
		for(var j = 0; j < array_0.length; j++) {
			if(array_0[i] <= random_index)
				offset++
		}
		array_0.push(random_index+offset);
	}
	// finally, make the array of equal numbers of 0s and 1s
	var return_array = [];
	for(var i = 0; i < c; i++) {
		if(array_0.indexOf(i) != -1)
			return_array[i] = 0;
		else return_array[i] = 1;
	}
	return return_array;
}

// initializes the four automata rules
var initialize_rules = function() {
	// call initialize_row with a parameter of 4
	var squares = initialize_row(4);
	return squares;
}






