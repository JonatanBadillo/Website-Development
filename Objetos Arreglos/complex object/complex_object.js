// Objetos complejos
// Un objeto puede contener otros objetos, arreglos, funciones, etc.
var my_record = {};
// agregando al objeto my_record la propiedad name con valor Jon
my_record.name = "Jon";
// creando un arreglo children dentro del objeto my_record
my_record.children = [];
// creando un objeto dentro del arreglo children
my_record.children[0] = {};
// agregando al objeto children[0] la propiedad name con valor Jim
my_record.children[0].name = "Jim";
// agregando al objeto children[0] la propiedad age con valor 11
my_record.children[0].age = 11;
// agregando al objeto children[0] la propiedad favorite_color con valor blue
my_record.children[0].favorite_color = "blue";

// creando un objeto dentro del arreglo children
my_record.children[1] = {};
my_record.children[1].name = "Jack";
my_record.children[1].age = 8;
my_record.children[1].favorite_color = "black";
// creando un objeto dentro del arreglo children
my_record.children[2] = {};
my_record.children[2].name = "Joel";
my_record.children[2].age = 7;
my_record.children[2].favorite_color = "orange";
