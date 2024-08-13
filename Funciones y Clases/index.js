// Las funciones y clases
// son lo que usamos para envolver ciertas piezas de funcionalidad en
// bloques reutilizables. Al usar una función o clase, podemos repetir tareas específicas muchas
// veces sin tener que reescribir el código.

// En el siguiente ejemplo, creamos una función simple
// que devuelve "Hello World" al ejecutar:
function myFunction() {
  return "Hello World";
}
console.log(myFunction());

// Agregando argumentos a una función
function words(word1, word2) {
  return word1 + " " + word2;
}
console.log(words("Hello", "John")); // Hello John
console.log(words("Hello", "Jake")); // Hello Jake
console.log(words("Good bye", "Alice")); // Good bye Alice

// Nota: Las funciones son de tipo objeto, por lo que cuando las declaramos, sus datos se
// almacenan en el heap. Sin embargo, llamarlas las agregará a la pila de llamadas como
// variables.

// Ejecutar argumentos con los “tres puntos”
// Los argumentos también se pueden llamar en una función a través de un arreglo, utilizando
// la sintaxis de tres puntos, que cubrimos anteriormente cuando observamos cómo fusionar
// arreglos y objetos. Veamos cómo funciona eso usando nuestro ejemplo anterior:
function words(word1, word2) {
  return word1 + " " + word2;
}
let validWords = ["Hello", "John"];
console.log(words(...validWords)); // Hello John
// Esto es realmente útil en el mundo real, donde a menudo tenemos datos almacenados en
// arreglos y objetos, que luego queremos pasar a las funciones.

// Formas alternativas de llamar a las funciones
// JavaScript tiene una tendencia a tener muchas formas de hacer lo mismo, y las funciones no
// son la excepción. Hay tres formas de declarar y llamar a las funciones.

// Expresiones de funciones sin nombre
// Aquí está nuestro ejemplo anterior, usando variables en su lugar:
console.log(words("Hello", "World"));
// También podemos poner funciones como está dentro de los objetos, lo que nos permite
// agrupar las funciones o agregar métodos a un prototipo:
let wordFunctions = {
  words: function (word1, word2) {
    return word1 + " " + word2;
  },
};
console.log(wordFunctions.words("Hello", "World"));
// En el ejemplo anterior, llamar a wordFunctions.words() nos permitiría ejecutar esta función.

// Funciones anónimas
// Las funciones anónimas son funciones que en
// realidad no tienen nombre y se llaman de inmediato. Para que se ejecuten de inmediato, lo
// envolvemos en los paréntesis redondos y lo llamamos con doble () como antes:
(function (word1, word2) {
  return word1 + " " + word2;
})("Hello", "World");
// Los argumentos se colocan en el segundo conjunto de paréntesis para que puedan pasar a la
// función. El uso de funciones anónimas está decayendo, pero a veces todavía se usan para
// crear un alcance separado para trabajar dentro.

// Funciones con notación de flecha
// La notación de la flecha se llama como tal porque usa => para indicar dónde
// comienza el cuerpo de la función.
// Así es como se ve nuestra función anterior con la notación de flecha. Cuando intentas
// llamarla, funciona igual que nuestras otras expresiones de funciones:
let words2 = (word1, word2) => {
  return word1 + " " + word2;
};
console.log(words2("Hello", "John")); // Hello John

// Funciones y la palabra clave “this”
// El objetivo principal de la palabra clave es
// contener información sobre su contexto actual.
// En el nivel superior de tu código, fuera de cualquier función, el contexto es “global”. Cuando
// usamos la palabra clave “this” en el contexto global en los navegadores, se refiere a un objeto
// llamado ventana. El objeto de la ventana contiene mucha información útil sobre tu contexto
// actual.
// Como tal, los dos registros de consola en el siguiente ejemplo muestran lo mismo:
console.log(this); // Console logs window object
console.log(window); // Console logs window object
// Dado lo que hemos dicho hasta ahora, cuando llamamos a esta palabra clave dentro de una
// función, puedes esperar que esta palabra clave se refiera al contexto de la función, pero
// encontrarás que todavía muestra el global this del objeto:
console.log(this); // Window { }
let words3 = function (word1, word2) {
  console.log(this); // Window { }
  return word1 + " " + word2;
};
console.log(words3("Hello", "John")); // Hello John

// Modo descuidado (sloppy)

// Para salir del modo descuidado, tenemos que cambiar a algo llamado modo “estricto (strict)”.
// El modo estricto aporta muchas ventajas a tu código, el principal está separando los contextos
// de funciones del contexto global. Tanto los archivos como las funciones se pueden hacer
// estrictas agregando el texto “use strict” en la parte superior. Al poner nuestro código en modo
// estricto, podemos dar a cada función su propio contexto y, por lo tanto, la palabra clave this
// devolverá indefinido dentro de una función. En el siguiente ejemplo, el modo estricto está
// habilitado. Para habilitar el modo estricto, solo debes agregar "usar estricto" en la parte
// superior de tu archivo:
("use strict");
console.log(this); // Window { }
let words4 = function (word1, word2) {
  console.log(this); // undefined
  return word1 + " " + word2;
};

// Funcionalidad de notación de flecha con this
// Ahora que hemos analizado cómo funcionan diferentes contextos con funciones, volvamos a
// las funciones de notación de flecha. Las funciones de flecha son un poco diferentes de otras
// funciones en que no tienen su propio contexto.
// Eso significa que incluso en modo estricto, lo heredan de sus padres. Esta funcionalidad solo
// tiene sentido en modo estricto:
("use strict");
console.log(this); // Window { }
let words5 = () => {
  console.log(this);
};
words5(); // console logs Window { }


// Si tu función de flecha está dentro de otra función, que no está utilizando la notación de
// flecha, hereda el contexto de esa función principal. Esto se puede ver en el siguiente ejemplo:
("use strict");

let contextualFunction = function () {
  let words5 = () => {
    console.log(this); // console logs undefined
  };
  words5();
};
contextualFunction(); // console logs undefined

// En general, el modo estricto es una forma más confiable de escribir código. Además de eso,
// es una práctica bastante mala exponer variables globales, sin saberlo, a los scripts posteriores,
// que tal vez no deberían tener acceso a ellas.
// Hasta ahora, mientras trabajas en modo estricto, this ha sido indefinido dentro de las
// funciones. Para que esta palabra clave sea más valiosa, querremos darle algún tipo de valor.
