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
