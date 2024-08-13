// Create an empty array 
var empty_array = [];


// funcion que recibe un arreglo de edades y regresa la edad mas grande
var largest_age = function(age_array) {
	// variable que guarda la edad mas grande
	var the_largest = 0;
	// recorriendo el arreglo de edades
	for(var i = 0; i < age_array.length; i++) {
		// si la edad actual es mayor a la edad mas grande
		if(age_array[i] > the_largest) {
			// la edad mas grande es igual a la edad actual
			the_largest = age_array[i];
		}
	}
	// regresando la edad mas grande
	return the_largest; 
};


// Creates the array we had before 
var children_ages = [11, 8, 7]; 


// imprimo el valor mas grande de children_ages
console.log(largest_age(children_ages)); // 11

// Gets the largest value in children_ages
var largest = largest_age(children_ages);

// imprimo el valor mas grande de children_ages
console.log(largest); // 11

// Skip the variable, pass in the array directly 
var largest_inline = largest_age([11, 15, 7]); 

// imprimo el valor mas grande de largest_age
console.log(largest_inline); // 15

