// 1. ¿Cómo se accede a los elementos de un arreglo?
// Problema

// Debes acceder a los elementos de un arreglo y obtener sus valores. 
// Para ello:
// 1. myArray que contiene los siguientes elementos: 5, 4, 7.
// 2. Imprimir en consola el segundo elemento del arreglo.
// 3. Imprimir en consola el último elemento del arreglo.
let myArray = [5, 4, 7];
console.log(myArray[1]);
console.log(myArray[myArray.length - 1]);

for(i=0;i<myArray.length;i++){
    console.log(myArray[i]);
}


// 2. ¿Cómo se crea un arreglo multidimensional? 
// Problema 
// Deseas realizar un seguimiento del contenido de una tabla, en la que una dimensión  representa las filas y la otra las columnas. 
// Solución 
// No existe ninguna sintaxis especial para crear un arreglo multidimensional. Para ello, debes agregar un nuevo arreglo dentro de un elemento de otro arreglo. También puedes crear un arreglo multidimensional con literales de arreglo. 
// creacion de un arreglo multidimensional
let myArray2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// imprimir en consola el primer elemento de la primera fila
console.log(myArray2[0][0]);
// imprimir en consola el segundo elemento de la segunda fila
console.log(myArray2[1][1]);


// 3. ¿Cómo se invierte el orden de los elementos de un arreglo?
// Problema
// Deseas invertir el orden de los elementos de tu arreglo.
// Solución
// Usa el método reverse() para combinar un arreglo con el final del otro.

// definimos array con elementos del 1-5
myArray = [1, 2, 3, 4, 5];
// invertir el orden de los elementos del arreglo
myArray.reverse();
// impresion del arreglo con el orden invertido
console.log(myArray);


// 4. ¿Cómo se cambia el contenido de un arreglo agregando o eliminando elementos? 
// Problema 
// Necesitas una forma rápida de cambiar los elementos del arreglo agregando o eliminando  elementos. 
// Solución
// Usa el método splice() para cambiar el contenido de un arreglo. 

// array de frutas
let array = ["banana", "apple", "orange"];
// agregar elementos al arreglo, desde la posicion 2, no eliminar elementos, y agrega "pear" y "pineapple"
array.splice(2, 0, "pear", "pineapple");
console.log(array); // ["banana", "apple", "pear", "pineapple", "orange"]
// eliminar elementos del arreglo , desde la posicion 3, elimina 2 elementos
array.splice(3, 2);
console.log(array); // ["banana", "apple", "pear" ]


// 5. ¿Cómo se puede simular el comportamiento de primero en entrar, primero en salir? 
// Problema 
// Deseas tratar tu arreglo como una pila y obtener el primer elemento del mismo. ¿Cómo se puede simular el comportamiento de último en entrar, primero en salir? 
// Solución
// Deseas tratar tu arreglo como una pila y obtener el último elemento de la matriz. 
let myArray3 = [1, 2, 3, 4, 5];
// obtener el último elemento del arreglo
let lastElement = myArray3.pop(); // sacamos el ultimo valor del arreglo, 5
console.log(lastElement); // 5
// obtener el primer elemento del arreglo
let firstElement = myArray3.shift(); // sacamos el primer valor del arreglo 
console.log(firstElement); // 1
console.log(myArray3); // [2, 3, 4]




