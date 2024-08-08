var myvar = 3; // Global variable

// This function has a local variable called myvar
var my_function = function() {
	var myvar = 5; // This version of myvar is now *local*
};
// Call the global variable
alert("myvar = " + myvar);

// Call the function my_function
my_function();

// Display the value of myvar
alert("After calling my_function, myvar = " + myvar); 

