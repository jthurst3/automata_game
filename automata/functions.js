// functions.js
// contains basic functions for the Automata Game
// J. Hassler Thurston
// 17 January 2014 (Adapted from Mathematica code written in June 2013)
// Please see README.md for a description of the game

var row, rows, columns, rules, score, rows_left, reveal, current_row;

var initialize_vars = function(r, c) {
	row = 0; // the current row number
	rows = r; // the number of rows total
	columns = c; // the number of columns total
	current_row = initialize_row(c); // initialize the current row with half the chips for each player
	score = [0,0]; // initialize the score to be 0-0
	compute_score(current_row); // compute the score for the current (first) row
	rules = initialize_rules(); // initialize the automata rules
	rows_left = r-1; // the number of rows left to be revealed
	reveal = [2,2]; // the number of turns until each player must reveal a row
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

// calculates the next row of the board, based on the current state of the board (rules and current squares)
var calculate_next_row = function() {
	var next_row = [];
	// loop through the array of current squares, applying the correct automata rule to each pair
	for(var i = 0; i < columns; i++) {
		// get the relevant pair of squares (loops back around)
		var pair = [current_row[i], current_row[(i+1)%columns];
		// apply the correct automata rule to these squares
		next_row.push(compute_rule(pair));
	}
	// update global parameters
	current_row = next_row;
	row++;
	rows_left--;
	compute_score(current_row);
}

// computes the correct next square given a pair of current squares
var compute_rule = function(pair) {
	// first, compute the correct automata replacement rule
	var automata_rule = 2*pair[0] + pair[1]; // we use a variant of Stephen Wolfram's numbering system for automata rules
	// finally, return the corresponding replacement
	return rules[automata_rule];
}

// changes the given rule
var change_rule = function(rule_number) {
	rules[rule_number] = opposite(rules[rule_number]);
}

// returns the opposite binary value
var opposite = function(binary_value) {
	return 1 - binary_value;
	// also could have done
	// return (binary_value+1)%2
}

// changes a set of squares
var change_squares = function(squares) {
	for(var i = 0; i < min(squares.length, 5); i++) {
		current_row[squares[i]] = opposite(current_row[squares[i]]);
	}
}

// computes a player's turn
// player is the player number (0 or 1)
// turn_type is a string representing what the player wants to do (either "reveal", "squares", or "rule")
// parameter is an extra parameter for calculations, if needed
// returns True if the turn was successful, False if something went wrong
var compute_turn = function(player, turn_type, parameter) {
	if(turn_type == "reveal") {
		calculate_next_row();
		reveal[player] = 2;
		return true;
	}
	else {
		// check to see if the player must reveal a row
		if(reveal[player] == 0) {
			console.log("You must reveal the next row this turn.");
			return false;
		}
		// otherwise, continue
		if(turn_type == "squares") {
			// check if the player entered a valid number of squares to change
			if(parameter.length == 0 || parameter.length > 5) {
				console.log("Must change between 1 and 5 squares.");
				return false;
			}
			// check if the player entered valid square numbers to change
			if(!validNumbers(parameter)) {
				console.log("Some square numbers were invalid.");
				return false;
			}
			// if all this is good, change the given squares
			change_squares(parameter);
			reveal[player]--;
			return true;
		}
		else if(turn_type == "rule") {
			// check if the player entered a valid rule number
			if(parameter < 0 || parameter > 3) {
				console.log("Rule number must be between 0 and 3");
				return false;
			}
			// if this is valid, change the given rule
			change_rule(parameter);
			reveal[player]--;
			return true;
		}
		else {
			// player didn't enter a valid turn type
			console.log("Invalid turn type.");
			return false;
		}
	}
}

// checks to see if a player entered valid square positions
var validNumbers = function(squares) {
	for(var i = 0; i < squares.length; i++) {
		if(squares[i] < 0 || squares[i] >= columns)
			return false;
	}
	return true;
}






