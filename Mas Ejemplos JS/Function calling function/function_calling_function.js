// 2. Function calling function
var square_a_number = function(num) {
	// This function returns the square of a number
	var value = num * num;
	return value;
};


// This function returns the sum of squares of numbers between range_start and range_end
var sum_squares_for_range = function(range_start, range_end) { 
	var sum = 0;
	for(var num = range_start; num <= range_end; num = num + 1) {
		sum = sum + square_a_number(num);
	}
	return sum;
};

// Call the function sum_squares_for_range
alert("The sum of squares between 2 and 5 is " + sum_squares_for_range(2, 5));

