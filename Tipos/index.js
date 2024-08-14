// El tipo de cualquier cosa se puede encontrar utilizando la palabra clave typeof:
console.log(typeof 5) // 'number'
console.log(typeof "name") // 'string'

// Tipos primitivos
// Los tipos primitivos son tipos que no tienen métodos ni propiedades de forma
// predeterminada, y no son objetos. Estos tipos de datos no se pueden cambiar una vez que se
// definen, y en los términos de memoria se almacenan en la pila.

console.log(String.prototype) // 'number'

// Los métodos de llamada desde un envoltorio en un tipo primitivo se pueden hacer
// directamente en la primitiva o en una variable que apunta a la primitiva. En el siguiente
// ejemplo, usamos uno de esos métodos, .at(), en una cadena y en una variable de cadena de
// tipo:
let someVariable = 'string'
someVariable.at(1) // 't'
console.log(someVariable.at(1)) // 't'




// También puedes llamar a los number methods en un número utilizando dos puntos, donde el
// primer punto es el decimal, y el segundo se refiere al método. Esto se puede ver en el siguiente
// ejemplo:
(5).toString() // '5'

5..toString() // '5

// Los métodos number también se pueden llamar a través de Number.toString ().
Number.toString(5) // '5'