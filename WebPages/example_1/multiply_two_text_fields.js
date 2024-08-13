var multiply_fields = function() {
	// Get the values from the text fields
	var fld1 = document.getElementById("field1");
	var fld2 = document.getElementById("field2");
	// Convert the values to integers
	var val1 = parseInt(fld1.value);
	var val2 = parseInt(fld2.value);
	// Multiply the values
	var result = val1 * val2;
	// Get the span element
	var results_span = document.getElementById("results");
	// Display the result
	results_span.textContent = result;

	console.log("multiply_fields() called");
};


