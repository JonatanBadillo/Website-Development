var myvar = 3; // Global variable

// This function rewrite the global variable myvar
var my_function = function() {
	myvar = 5; // Writing to a global variable
};

// Call the global variable
alert("myvar = " + myvar); // 3
// Call the function my_function
my_function();
// Display the value of myvar
alert("After calling my_function, myvar = " + myvar);  // 5

