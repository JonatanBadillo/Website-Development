// children_ages is an array of children's ages
var children_ages = new Array();

// Assigning values to the array
children_ages[0] = 11;
children_ages[1] = 8;
children_ages[2] = 7;

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

// function that receives an array of ages and returns the largest age
var largest = largest_age(children_ages);
// alert the largest age
alert("The oldest child is " + largest + " years old");
