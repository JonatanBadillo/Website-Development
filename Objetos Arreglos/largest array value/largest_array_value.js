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

