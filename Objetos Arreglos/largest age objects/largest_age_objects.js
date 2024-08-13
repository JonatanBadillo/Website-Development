// funcion que recibe un arreglo de objetos y regresa el objeto con el mayor edad
var largest_age = function(child_array) {
	// variable que guarda la edad mas grande
	var the_largest = 0;
	// recorriendo el arreglo de objetos
	for(var i = 0; i < child_array.length; i++) {
		// variable que guarda el objeto actual
		var child = child_array[i];
		// si la edad del objeto actual es mayor a la edad mas grande
		if(child.age > the_largest) {
			// la edad mas grande es igual a la edad del objeto actual
			the_largest = child.age;
		}
	}
	// regresando la edad mas grande
	return the_largest; 
};

