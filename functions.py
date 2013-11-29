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

	# prints the current row (as a list of 0s and 1s)
	def print_current_row(self):
		print self.current_row