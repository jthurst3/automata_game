# functions.py
# Contains basic algorithms for the Automata Game
# J. Hassler Thurston
# 28 November 2013 (Adapted from Mathematica code written in June 2013)
# Please see README.md for a description of the game

import random

class AutomataGame:
	# initialization of the game.
	def __init__(self, rows, columns):
		self.rows = rows
		self.columns = columns
		self.initialize_first_row()
		self.initialize_rules()

	# initialization of the first row.
	# We need to have the same number of white and black squares in the first row.
	def initialize_first_row(self):
		num_white_squares = self.columns/2
		white_squares = [0 for i in range(num_white_squares)] # Define 0 as a white square, and 1 as a black square.
		black_squares = [1 for i in range(num_white_squares, self.columns)] # If there are an odd number of columns, we give black the extra square.
		# technique from http://stackoverflow.com/questions/952914/making-a-flat-list-out-of-list-of-lists-in-python
		all_squares = [item for sublist in [white_squares, black_squares] for item in sublist]
		random.shuffle(all_squares) # perform a random permutation of the squares
		self.current_row = all_squares # set this permutation equal to the current row

	# initialization of the automata rules
	def initialize_rules(self):
		self.rules = []
		all_squares = [0,0,1,1]
		random.shuffle(all_squares)
		for i in range(len(all_squares)):
			self.rules.append(AutomataRule(i/2,i%2,all_squares[i]))


	# prints the current row (as a list of 0s and 1s)
	def print_current_row(self):
		print self.current_row

	# calculates the next row (according to the first row and the replacement rules)
	def calculate_next_row(self):
		old_row = self.current_row
		pairs = generate_pairs(old_row)
		self.replace_pairs(pairs)

	# takes pairs of elements in the old row and computes the elements in the new row
	def replace_pairs(self, pairs):
		for i in range(self.columns):
			relevant_rule = self.which_rule(pairs[i])
			self.current_row[i] = relevant_rule.get_square()

	# takes a pair of numbers and returns the relevant automata rule with that pair of numbers as input
	def which_rule(self, pair):
		return self.rules[2*pair[0]+pair[1]]


# partitions ls into pairs of elements (with offset 1)
def generate_pairs(ls):
	result = []
	for i in range(len(ls)):
		result.append([ls[i], ls[(i+1)%len(ls)]])
	return result

class AutomataRule:
	# defines a rule for calculating the colors in the next row
	def __init__(self, first_square, second_square, replace_square):
		self.first_square = first_square
		self.second_square = second_square
		self.replace_square = replace_square

	# changes the replacement square to the opposite color
	def switch(self):
		self.replace_square = int(not(self.replace_square))

	# changes the replacement square to the specified color
	def set_square(self, new_value):
		self.replace_square = new_value

	# returns the current replacement square
	def get_square(self):
		return self.replace_square







