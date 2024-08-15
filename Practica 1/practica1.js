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

