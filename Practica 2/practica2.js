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


// 3. ¿Cómo se eliminan todos los elementos de un conjunto? 
// Problema 
// Debes eliminar todos los elementos de un objeto de conjunto. 
// Solución 
// El método clear elimina todos los elementos de un conjunto, mientras que delete solo  eliminará uno. 

// imprimiendo mi conjunto actual
console.log(set) // Set { 0: 1, 1: 2, 2: 4 }
// usando metodo clear() para eliminar todos los elementos de mi conjunto
set.clear();
console.log(set); // Set {}

// 4. ¿Cuál es la diferencia entre los métodos de llaves y valores? 
// Problema 
// Debes saber cuándo utilizar el método de llaves en lugar del método de valores.

// Solución 
// Ambos métodos devuelven un objeto iterador que contiene valores para cada elemento. El  método de llaves es un alias del método de valores. 

// Ejemplo
// El método keys() devuelve un array con todas las claves de un objeto. Por otro lado, el método values() devuelve un array con todos los valores de un objeto.'

const objeto = {
    clave1: 'valor1',
    clave2: 'valor2',
    clave3: 'valor3'
  };
  
  const claves = Object.keys(objeto);
  console.log(claves); // ['clave1', 'clave2', 'clave3']
  
  const valores = Object.values(objeto);
  console.log(valores); // ['valor1', 'valor2', 'valor3']



  // 5. ¿Cómo funciona un método forEach con un objeto de conjunto? 
// Problema 
// Debes saber si existe alguna diferencia al utilizar un método forEach en un conjunto en  comparación con un arreglo. 
// Solución 
// El método forEach funciona de la misma manera cuando se utiliza un conjunto que cuando  se utiliza un arreglo. El método se llama para cada valor del conjunto. 

// El método forEach se utiliza para iterar sobre los elementos de un objeto , 
// La función de devolución recibe como argumento cada elemento del conjunto y puede realizar alguna operación en él.
const miSet = new Set([1, 2, 3, 4, 5]);

miSet.forEach((elemento) => {
    // La función de devolución de llamada en este caso simplemente imprime cada elemento en la consola.
  console.log(elemento);
});


// 6. ¿Cuáles son las ventajas de utilizar un mapa en lugar de un objeto? 
// Problema 
// ¿Cuándo es mejor utilizar un mapa en lugar de un objeto? 
// Solución 
// Si bien existen similitudes entre los mapas y los objetos, los mapas pueden contener tanto  objetos primitivos como llaves o valores. 
// Solución

// la ventaja de usar mapa en lugar de un objeto es que los mapas pueden contener cualquier tipo de dato como calve y valor, mientras que los objetos solo pueden tener cadenas como claves.
const mapa = new Map();
// agregando elementos al mapa
mapa.set('clave1', 'valor1');
mapa.set(5, 'valor2');
mapa.set('clave3', 'valor3');
// obtener elementos del mapa
console.log(mapa.get('clave1')); // valor1
console.log(mapa.get(5)); // valor2
console.log(mapa.get('clave3')); // valor3

