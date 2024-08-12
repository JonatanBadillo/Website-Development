// JavaScript utiliza el montón para almacenar objetos y funciones. Para variables simples
// compuestas de números, cadenas y otros tipos primitivos, la pila se usa típicamente. La pila
// también almacena información sobre funciones que se llamarán.


// Pilas
// Cada vez que apuntas a un
// tipo primitivo (primitivo, aquí, es decir, cualquier cosa que no sea un objeto) en JavaScript,
// se agrega a la parte superior de la pila. En el siguiente código, definimos variables. Los datos
// de tipo no objeto se agregan inmediatamente a la parte superior de la pila. Una representación
// de esto se puede ver en la figura 1.
const SOME_CONSTANT = 5
let myNumber = 10
let myVariable = "Some Text"


// Si intentas reasignar una variable de tipo primitivo, también se agrega a la pila, incluso si las
// variables supuestamente apuntan al mismo valor.

// Las variables no apuntarán al mismo valor
// subyacente en la memoria, sino que aparecerán como nuevas copias de datos
let number = 5
let newNumber = number