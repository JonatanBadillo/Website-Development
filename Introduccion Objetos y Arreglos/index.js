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


// Obtener la longitud de un arreglo
// Para obtener el tamaño de un arreglo determinado, usamos el método .length directamente en ese arreglo.
// Intentemos poner la longitud de MyArray en una nueva variable llamada arrayLength.
// Cuando usamos la console log, mostrará 4:
myArr = [ "one", 2, "three", { "value": "four" } ]
let arrayLength = myArr.length
console.log(arrayLength) // shows 4


// Obtener el último elemento de un arreglo
myArr = [ "one", 2, "three", "four" ]
arrayLength = myArr.length
console.log(myArr[myArr.length - 1])


// Push y unshift
// Cuando queremos agregar un elemento a un arreglo, push y unshift, hagamos eso al final y
// al inicio del arreglo, respectivamente. Agregar elementos al final de un arreglo siempre es
// más rápido. 

// En el siguiente ejemplo, push se usa para agregar un elemento al final de cualquier arreglo:


myArr = [ "banana", "apple", "squid", "cake", "pear" ]
myArr.push("pear2")
console.log(myArr) // [ "banana", "apple", "squid", "cake", "pear" ]


// En el siguiente ejemplo, unshift se usa para agregar algo al principio:
myArr = [ "banana", "apple", "squid", "cake", "pear" ]
myArr.unshift("pear1")
console.log(myArr) // [ "pear", "banana", "apple", "squid", "cake", pear" ]


// Pop y shift
// Si queremos eliminar el valor "pear" que agregamos al final
// de nuestro arreglo, simplemente necesitamos ejecutar pop() en él:
myArr = [ "banana", "apple", "squid", "cake", "pear" ]
myArr.pop()
console.log(myArr) // [ "banana", "apple", "squid", "cake" ]
// Del mismo modo, si queremos eliminar el "banana" desde el comienzo del arreglo, podemos
// usar shift():
myArr = [ "banana", "apple", "squid", "cake" ]
myArr.shift()
console.log(myArr) // [ "apple", "squid", "cake" ]




