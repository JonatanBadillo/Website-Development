// Las funciones y clases
// son lo que usamos para envolver ciertas piezas de funcionalidad en
// bloques reutilizables. Al usar una función o clase, podemos repetir tareas específicas muchas
// veces sin tener que reescribir el código.

// En el siguiente ejemplo, creamos una función simple
// que devuelve "Hello World" al ejecutar:
function myFunction() {
  return "Hello World";
}
console.log(myFunction());

// Agregando argumentos a una función
function words(word1, word2) {
  return word1 + " " + word2;
}
console.log(words("Hello", "John")); // Hello John
console.log(words("Hello", "Jake")); // Hello Jake
console.log(words("Good bye", "Alice")); // Good bye Alice

// Nota: Las funciones son de tipo objeto, por lo que cuando las declaramos, sus datos se
// almacenan en el heap. Sin embargo, llamarlas las agregará a la pila de llamadas como
// variables.


// Ejecutar argumentos con los “tres puntos”
// Los argumentos también se pueden llamar en una función a través de un arreglo, utilizando
// la sintaxis de tres puntos, que cubrimos anteriormente cuando observamos cómo fusionar
// arreglos y objetos. Veamos cómo funciona eso usando nuestro ejemplo anterior:
function words(word1, word2) {
return word1 + " " + word2
}
let validWords = [ "Hello", "John" ]
console.log(words(...validWords)) // Hello John
// Esto es realmente útil en el mundo real, donde a menudo tenemos datos almacenados en
// arreglos y objetos, que luego queremos pasar a las funciones.