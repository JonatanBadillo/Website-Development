// 1. ¿Cuál es la diferencia entre un conjunto y un arreglo? 
// Problema 
// ¿En qué situación utilizarías un objeto de conjunto en lugar de un arreglo? 
// Solución 
// Existen algunas similitudes entre los dos objetos. Ambos pueden contener datos de diferentes  tipos. Lo que diferencia a un conjunto es que todos los valores deben ser únicos. 

// La diferencia entre conjuntos y arreglos es que no los conjuntos no pueden tener elementos duplicados.
let mySet = new Set();
mySet.add(2);
mySet.add(3);
mySet.add(3);
mySet.add(4);
console.log(mySet);


// 2. ¿Cómo se agregan y eliminan elementos de un conjunto? 
// Problema 
// Debes administrar los elementos de un conjunto. 
// Solución 
// Un arreglo utiliza el método push para agregar elementos, mientras que los conjuntos utilizan  el método add. Para eliminar elementos, utiliza el método delete. 

// creando conjunto
let set = new Set();
// agregar elementos al conjunto
set.add(1)
set.add(2)
set.add(3)
set.add(4)
// eliminando elementos de mi conjunto
set.delete(3);
console.log(set); // Set { 0: 1, 1: 2, 2: 4 }
