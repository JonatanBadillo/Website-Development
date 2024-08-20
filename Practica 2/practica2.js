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