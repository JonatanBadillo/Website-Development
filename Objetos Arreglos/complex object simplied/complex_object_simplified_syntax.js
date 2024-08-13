// crecion de objeto my_record con propiedades y arreglos
var my_record = {
	name: "Jon",
	// creacion de arreglo children con objetos
	children: [
		// creacion de objeto con propiedades
		{
			name: "Jim",
			age: 11,
			favorite_color: "blue"
		},
		// creacion de objeto con propiedades
		{
			name: "Jack",
			age: 8,
			favorite_color: "black"
		},
		// creacion de objeto con propiedades
		{
			name: "Joel",
			age: 7,
			favorite_color: "orange"
		}
	]
};

console.log(my_record.children[1].name); // Jack
console.log(my_record.children[2].favorite_color); // orange
console.log(my_record.name); // Jon
