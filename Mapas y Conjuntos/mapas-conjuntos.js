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


// Los conjuntos solo admitirán la adición de valores únicos para primitivas, pero con los
// objetos, usan la referencia de un objeto en lugar de su valor. Eso significa que es posible
// agregar dos objetos que tienen el mismo valor pero que tienen diferentes referencias. Esto se
// muestra en el siguiente ejemplo:
mySet = new Set()
mySet.add({ "name" : "John" })
mySet.add({ "name" : "John" })
// Set(2) {{ "name" : "John" }, { "name" : "John" }}

console.log(mySet)

// • El algoritmo de igualdad de IsLooselyEqual se aplica cuando usamos doble iguales
// (==) y coincide con el valor.
// • El algoritmo de igualdad de IsStrictlyEqual se aplica cuando usamos triple iguales
// (===) y coincide con valor/tipo.
// • El SameValueZero es utilizado por conjuntos. Considera tanto el valor como el tipo
// de igualdad como IsStrictlyEqual, pero también considera que NAN es igual a NaN.

// Como tal, si intentamos agregar dos NaN a un conjunto, el resultado es que solo se agrega
// uno:
// let mySet = new Set()
mySet.add(NaN)
mySet.add(NaN)
// Set(1) {NaN}
console.log(mySet)

// Modificación de conjuntos
// Los conjuntos son mutables como otros objetos, y los mutamos a través de métodos de
// conjunto especiales. Los tres métodos principales para cambiar un conjunto son:
// • Set.add() – Para agregar un elemento a tu conjunto
// • Set.delete() – Para eliminar un elemento de tu conjunto
// • Set.clear() – Para borrar todos los elementos de tu conjunto

mySet = new Set()
mySet.add(4)
mySet.add(6)
mySet.add(8)
mySet.add(5)
mySet.delete(4)
console.log(mySet) // Set(1) {5}
mySet.clear()
console.log(mySet) // Set(0) {}


// Comprobación de membresía del conjunto
// se convierten en una
// herramienta poderosa para verificar si existe un cierto valor en un conjunto específico. Los
// conjuntos tienen un método incorporado llamado Set.has() para hacer esto:
mySet = new Set()
mySet.add(4)
mySet.add(5)
mySet.delete(4)
let checkSet = mySet.has(4)
console.log(checkSet) // false