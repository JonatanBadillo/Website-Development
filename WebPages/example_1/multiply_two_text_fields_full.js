// This script multiplies two text fields and displays the result in a span element.
var multiply_fields = function () {
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

  var par = document.getElementById("another_paragraph");



  par.textContent= "" + val1 + " * " + val2 + " = " + result;

  // Create a new paragraph element
  var newParagraph = document.createElement('p');

  // Set the text for the new paragraph
  newParagraph.textContent = 'Este es un nuevo párrafo agregado con JavaScript.';

  // Add the new paragraph to the body of the document
  document.body.appendChild(newParagraph);

  console.log("multiply_fields() called");
};
// Get the button element
var btn = document.getElementById("my_button");
// Attach the function to the button
btn.onclick = multiply_fields;
