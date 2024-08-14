// Conjuntos
// Los conjuntos son listas mutables de valores, que son bastante similares a los arreglos. La
// diferencia entre conjuntos y arreglos es que los conjuntos no pueden contener duplicados.
// Esto los convierte en un rendimiento para las tareas donde necesitas tener una lista única. Si
// intentas agregar un elemento duplicado a un conjunto, se rechazará automáticamente sin
// lanzar un error.
// Crear un conjunto es relativamente simple. Todo lo que necesitas es el constructor, Set() y
// luego métodos especiales como agregar y eliminar para modificarlo:
let mySet = new Set()
mySet.add(5)
mySet.add(4)
mySet.add(4)
console.log(mySet) // Set(1) {4}

//agregar elementos a un array
let myArray = []
myArray.push(4)
myArray.push(4)
console.log(myArray) // [4, 4]

// Nota: Si intentas agregar valores duplicados a un conjunto, solo se agregará uno. Los
// conjuntos rechazan automáticamente los valores duplicados.