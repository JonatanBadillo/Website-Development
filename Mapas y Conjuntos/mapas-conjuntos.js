// Conjuntos
// Los conjuntos son listas mutables de valores, que son bastante similares a los arreglos. La
// diferencia entre conjuntos y arreglos es que los conjuntos no pueden contener duplicados.
// Esto los convierte en un rendimiento para las tareas donde necesitas tener una lista única. Si
// intentas agregar un elemento duplicado a un conjunto, se rechazará automáticamente sin
// lanzar un error.
// Crear un conjunto es relativamente simple. Todo lo que necesitas es el constructor, Set() y
// luego métodos especiales como agregar y eliminar para modificarlo:
let mySet = new Set();
mySet.add(5);
mySet.add(4);
mySet.add(4);
console.log(mySet); // Set(1) {4}

//agregar elementos a un array
let myArray = [];
myArray.push(4);
myArray.push(4);
console.log(myArray); // [4, 4]

// Nota: Si intentas agregar valores duplicados a un conjunto, solo se agregará uno. Los
// conjuntos rechazan automáticamente los valores duplicados.

// Los conjuntos solo admitirán la adición de valores únicos para primitivas, pero con los
// objetos, usan la referencia de un objeto en lugar de su valor. Eso significa que es posible
// agregar dos objetos que tienen el mismo valor pero que tienen diferentes referencias. Esto se
// muestra en el siguiente ejemplo:
mySet = new Set();
mySet.add({ name: "John" });
mySet.add({ name: "John" });
// Set(2) {{ "name" : "John" }, { "name" : "John" }}

console.log(mySet);

// • El algoritmo de igualdad de IsLooselyEqual se aplica cuando usamos doble iguales
// (==) y coincide con el valor.
// • El algoritmo de igualdad de IsStrictlyEqual se aplica cuando usamos triple iguales
// (===) y coincide con valor/tipo.
// • El SameValueZero es utilizado por conjuntos. Considera tanto el valor como el tipo
// de igualdad como IsStrictlyEqual, pero también considera que NAN es igual a NaN.

// Como tal, si intentamos agregar dos NaN a un conjunto, el resultado es que solo se agrega
// uno:
// let mySet = new Set()
mySet.add(NaN);
mySet.add(NaN);
// Set(1) {NaN}
console.log(mySet);

// Modificación de conjuntos
// Los conjuntos son mutables como otros objetos, y los mutamos a través de métodos de
// conjunto especiales. Los tres métodos principales para cambiar un conjunto son:
// • Set.add() – Para agregar un elemento a tu conjunto
// • Set.delete() – Para eliminar un elemento de tu conjunto
// • Set.clear() – Para borrar todos los elementos de tu conjunto

mySet = new Set();
mySet.add(4);
mySet.add(6);
mySet.add(8);
mySet.add(5);
mySet.delete(4);
console.log(mySet); // Set(1) {5}
mySet.clear();
console.log(mySet); // Set(0) {}

// Comprobación de membresía del conjunto
// se convierten en una
// herramienta poderosa para verificar si existe un cierto valor en un conjunto específico. Los
// conjuntos tienen un método incorporado llamado Set.has() para hacer esto:
mySet = new Set();
mySet.add(4);
mySet.add(5);
mySet.delete(4);
let checkSet = mySet.has(4);
console.log(checkSet); // false

// Comprobar tamaño de conjunto
// Puedes verificar el tamaño de un conjunto utilizando el método size:
console.log(mySet.size); // 1

// Mezcla de conjuntos
// Dado que los conjuntos son iterables e implementan el protocolo iterator, se pueden fusionar
// (mezclar) utilizando el operador de tres puntos (...), como se muestra en el siguiente ejemplo.
// Los duplicados se eliminarán automáticamente si existen. Puedes ver cómo se ve esto en la
// figura 1.
let mySetOne = new Set();
mySetOne.add(4);
mySetOne.add(5);

let mySetTwo = new Set();
mySetTwo.add(8);
mySetTwo.add(4);
let bigSet = new Set([...mySetOne, ...mySetTwo]);
console.log(bigSet); // Set {0:4 , 1:5 , 2:8}

// Iteración de conjunto y valores
// Dado que los conjuntos son iterables, lo que significa que pueden ser alimentados con ciclo
// for...de como lo harías para los arreglos. Sin embargo, usar ciclos for...en no funcionará ya
// que los conjuntos no tienen índices. Dado que los conjuntos no tienen índices, también
// significa que no puedes acceder a un elemento establecido con notación de paréntesis
// cuadrado, como mySet[2]:
mySet = new Set();
mySet.add(4);
mySet.add(5);
mySet.add(6);
for (let x of mySet) {
  console.log(x); // 4, 5, 6
}
for (let x in mySet) {
  console.log(x); // undefined
}

console.log(mySet[2]); // undefined

// con metodo for each
mySet.forEach((x) => {
  console.log(x); // 4, 5, 6
});

mySet = new Set();
mySet.add(4);
mySet.add(5);
mySet.add(6);

// puedes convertir fácilmente un conjunto en un arreglo en su lugar utilizando
// Array.from(). Esto es útil si necesitas trabajar con un conjunto como un arreglo:
let arrayFromSet = Array.from(mySet); // [ 4, 5, 6 ]

// Llaves de conjuntos y valores
// Al igual que los objetos, los conjuntos heredan los métodos keys(), values() y entries(). En
// conjuntos, tanto keys() como los values() hacen lo mismo y simplemente devolverán una lista
// de todos los miembros en el conjunto como un objeto especial conocido como setIterator:
mySet = new Set();
mySet.add(5);
mySet.add(10);
let getKeys = mySet.keys(); // SetIterator{5, 10}

// Los SetIterators son diferentes de los conjuntos, y solo tienen un método, que es el método
// next(). El método next() te permite iterar a través de los conjuntos de un elemento a la vez.
// Cada vez que lo haces, se devuelve un objeto que consiste en el valor del elemento
// establecido y si la iteración está completa.
// Puedes ver cómo se ve eso en el siguiente ejemplo:
mySet = new Set();
mySet.add(5);
mySet.add(10);
getKeys = mySet.keys(); // SetIterator{5, 10}
console.log(getKeys.next()); // { value: 5, done: false }
console.log(getKeys.next()); // { value: 10, done: false }
console.log(getKeys.next()); // { value: undefined, done: false }

// Mientras que keys() y values() proporcionan una forma abreviada de generar SetIterators,
// también se pueden crear refiriéndose a la propiedad del iterador sets para lograr el mismo
// resultado:
mySet = new Set();
mySet.add(5);
mySet.add(10);
getKeys = mySet[Symbol.iterator](); // SetIterator{5, 10}
console.log(getKeys.next()); // { value: 5, done: false }
console.log(getKeys.next()); // { value: 10, done: false }
console.log(getKeys.next()); // { value: undefined, done: false }

// El método entries() también está disponible para todos los conjuntos. En los objetos, el
// método de entradas devuelve arreglos en la forma [llave, valor]. Dado que los conjuntos no
// tienen llaves, el valor se devuelve como la llave y el valor.
// La razón principal por la cual este método está disponible en conjuntos es garantizar la
// consistencia con los mapas, que tienen llaves y valores. Set.entries() todavía devuelve un
// setIterator, al igual que keys() y values():
mySet = new Set();
mySet.add(5);
mySet.add(10);
let setEntries = mySet.entries();
for (let x of setEntries) {
  console.log(x);
  // Returns [ 5, 5 ], [ 10, 10 ]
}


// Mapas
// Si bien los conjuntos son estructuras similares al arreglo que también proporcionan la
// eliminación duplicada automática, los mapas son estructuras similares a objetos con algunas
// mejoras adicionales. 


// • Los mapas no tienen un prototipo: Los mapas no buscan en el
// prototipo, lo que significa que sabemos que los mapas solo tendrán lo que les
// ponemos explícitamente en ellos y no heredará otras propiedades.

// • Los mapas garantizan orden por cronología:  el orden de las entradas corresponde cronológicamente a cuando se usó set().

// • Los mapas permiten que cualquier cosa se confiera como llave: Las llaves de un mapa
// pueden ser cualquier cosa, incluida una función o incluso un objeto. En los objetos,
// debe ser una cadena o símbolo.

// • Los mapas tienen beneficios de rendimiento: Tienen un mejor rendimiento que los
// objetos en tareas que requieren eliminación/adición rápida o frecuente de datos.

// • Los mapas son iterables de forma predeterminada, a diferencia de los objetos.

// Y al igual que los conjuntos, los mapas vienen con métodos add(), delete() y clear(). La
// diferencia clave aquí es que, para agregar elementos de mapa, debes especificar una llave y
// un valor y eliminar un elemento de mapa, debes especificar el nombre de llave que deseas
// eliminar.

let myMap = new Map()
myMap.set("key", "value")
myMap.set("secondKey", "value")
myMap.delete("key")
console.log(myMap) // Map(1) {'secondKey' => 'value'}
myMap.clear()
console.log(myMap) // Map(0) {}