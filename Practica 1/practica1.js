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
