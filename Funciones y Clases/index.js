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
