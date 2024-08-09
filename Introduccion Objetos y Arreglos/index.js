// Arreglos
// Un arreglo es una estructura de datos que nos permite almacenar varios valores en una sola variable. Estos valores pueden ser de cualquier tipo y cada uno de ellos se almacena en una posición o índice.

let myArr = [ "one", 2, "three", { "value": "four" } ]


// El ejemplo anterior se puede reescribir de esta manera utilizando el constructor de Array:
myArr = new Array("one", 2, "three", { "value": "four" })

// Para acceder a un elemento de un arreglo, se utiliza el nombre del arreglo seguido de corchetes que contienen el índice del elemento que se desea acceder. Por ejemplo, para acceder al segundo elemento del arreglo anterior, se utiliza la siguiente sintaxis:

myArr = [ "banana", "apple", "squid", "cake", "pear" ]
console.log(myArr[0]) // shows "banana"
console.log(myArr[2]) // shows "apple"
console.log(myArr[3]) // shows "squid"