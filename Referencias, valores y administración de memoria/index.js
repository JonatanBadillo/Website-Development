// JavaScript utiliza el montón para almacenar objetos y funciones. Para variables simples
// compuestas de números, cadenas y otros tipos primitivos, la pila se usa típicamente. La pila
// también almacena información sobre funciones que se llamarán.

// Pilas
// Cada vez que apuntas a un
// tipo primitivo (primitivo, aquí, es decir, cualquier cosa que no sea un objeto) en JavaScript,
// se agrega a la parte superior de la pila. En el siguiente código, definimos variables. Los datos
// de tipo no objeto se agregan inmediatamente a la parte superior de la pila. Una representación
// de esto se puede ver en la figura 1.
const SOME_CONSTANT = 5;
let myNumber = 10;
let myVariable = "Some Text";

// Si intentas reasignar una variable de tipo primitivo, también se agrega a la pila, incluso si las
// variables supuestamente apuntan al mismo valor.

// Las variables no apuntarán al mismo valor
// subyacente en la memoria, sino que aparecerán como nuevas copias de datos
let number = 5;
let newNumber = number;

// Los navegadores tienen algunas APIs incorporadas que se pueden llamar directamente desde
// tu código. Estos se conocen como API web, y generalmente ofrecen una interfaz entre el
// código en tu navegador y el sistema operativo en sí. Un ejemplo de una API web es la función
// global, SetTimeOut, que nos permite ejecutar código después de un cierto número de
// segundos:
myNumber = 5;
// SetTimeout acepta dos argumentos: una función de devolución de llamada y un tiempo en
// milisegundos, que son procesados por la API web. La mayoría de las APIs web aceptan una
// función de devolución de llamada, que se ejecuta en la pila de la API web. Esto significa que
// SetTimeout se elimina inmediatamente de la pila principal y solo vuelve a la pila principal
// una vez que se haya procesado.

// Esto significa que las APIs web se ejecutan en paralelo a la pila principal de JavaScript.
// Cuando se termina la devolución de llamada, el resultado se agrega nuevamente a la pila
// principal, y esto está mediado por algo llamado evento loop, que decide cuándo agregar tareas
// al hilo principal.
setTimeout(function () {
  console.log("Hello World");
}, 1000);




// El heap
// Si bien los tipos no objeto se almacenan solo en la pila, los objetos se arrojan al heap, que es
// una forma más dinámica de memoria sin límite. Esto significa que los objetos grandes nunca
// excederán el límite de la pila.
// Considera el siguiente objeto. Primero, definimos un nuevo objeto, y luego establecemos otra
// variable para apuntarlo:
// Aquí, el objeto se almacena en
// el heap, y la pila solo se refiere a la referencia del heap.
// En este caso, userOne y userTwo apuntan al mismo objeto en el heap. Si cambias una propiedad en userOne, también se reflejará en userTwo.
let userOne = { name: "John Schmidt" }
let userTwo = userOne
// Nota sobre los tipos de objetos: Dado que las funciones y los arreglos también son de tipo
// “objeto”, ¡ellos también se almacenan en el heap!


// Objeto y igualdad de referencia
// JavaScript en realidad tiene muchas dificultades
// para comparar los valores de dos objetos diferentes, y básicamente se reduce a pilas y heaps.
// Para entender por qué, considera el siguiente código:
myNumber = 5
newNumber = 5
let newObject = { name: "John Schmidt" }
let cloneObject = { name: "John Schmidt" }
let additionalObject = newObject
// Mientras que los no objetos se realizan en la pila de manera normal, un nuevo objeto
// crea una nueva referencia. Aunque tanto cloneObject como newObject tienen el mismo
// “valor” subyacente, sus referencias aún difieren.

// Entonces, newNumber y myNumber tienen el mismo valor y nos darán un valor “verdadero”
// si intentamos probar su igualdad con el signo de triple iguales:
myNumber = 5
newNumber = 5
console.log(myNumber === newNumber) // TRUE

// Del mismo modo, additionalObject y newObject se refieren a la misma referencia y también
// probarán true para igualdad:
console.log(newObject == additionalObject) // TRUE

// La complejidad aparece cuando comparamos cloneObject y newObject. Aunque cloneObject
// tiene el mismo valor subyacente que newobject, JavaScript comparará la igualdad de las dos
// referencias, no el valor subyacente en sí mismo:
newObject = { name: "John Schmidt" }
cloneObject = { name: "John Schmidt" }
console.log(newObject === cloneObject) // False
// Este es un punto de confusión común para la mayoría de las personas que aprenden JavaScript
// porque es contradictorio. Cuando entiendes heaps y pilas, comienza a tener sentido.
// newObject y cloneObject no son iguales, ya que ambos tienen diferentes referencias en la
// pila.