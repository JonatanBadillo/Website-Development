// Ejemplo de función con for
var sum_range = function(range_start, range_end) {
	var sum = 0;
	for(var num = range_start; num <= range_end; num = num + 1) {
		sum = sum + num;
	}
	return sum;
};

// The parseInt function is used to convert the string to an integer
var start_val = parseInt(prompt("Enter the first number"));
// The parseInt function is used to convert the string to an integer
var end_val = parseInt(prompt("Enter the last number"));

// Call the function sum_range
var result = sum_range(start_val, end_val);

// Display the result
alert("The sum of all of the numbers between " + start_val + " and " + end_val + " is " + result);
