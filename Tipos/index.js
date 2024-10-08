// El tipo de cualquier cosa se puede encontrar utilizando la palabra clave typeof:
console.log(typeof 5); // 'number'
console.log(typeof "name"); // 'string'

// Tipos primitivos
// Los tipos primitivos son tipos que no tienen métodos ni propiedades de forma
// predeterminada, y no son objetos. Estos tipos de datos no se pueden cambiar una vez que se
// definen, y en los términos de memoria se almacenan en la pila.

console.log(String.prototype); // 'number'

// Los métodos de llamada desde un envoltorio en un tipo primitivo se pueden hacer
// directamente en la primitiva o en una variable que apunta a la primitiva. En el siguiente
// ejemplo, usamos uno de esos métodos, .at(), en una cadena y en una variable de cadena de
// tipo:
let someVariable = "string";
someVariable.at(1); // 't'

let str = "Hello, World!";
console.log(str.at(0)); // H
console.log(str.at(-1)); // !

// También puedes llamar a los number methods en un número utilizando dos puntos, donde el
// primer punto es el decimal, y el segundo se refiere al método. Esto se puede ver en el siguiente
// ejemplo:
(5).toString(); // '5'

(5).toString(); // '5

// Los métodos number también se pueden llamar a través de Number.toString ().
Number.toString(5); // '5'

// el método estático keys() se pueden encontrar en el envoltorio de objetos
// y se puede llamar para obtener las llaves de cualquier objeto:
Object.keys({ hello: "world", goodbye: "world" });
// [ "hello", "goodbye" ]

// Para resumir lo que hemos discutido hasta ahora:
// 1. Existen varios tipos primitivos en JavaScript que no tienen métodos ni propiedades
// de forma predeterminada. También son inmutables. Estas son cosas como cadena,
// número y booleano.

// 2. Todos los tipos en JavaScript, incluidas primitivas y objetos, heredan métodos de
// objetos de envoltura. Entonces, todos los datos del tipo cadena heredarán todos los
// métodos que se encuentran en String.prototype.

// 3. Si necesitas averiguar qué métodos puedes usar en cualquier tipo de datos en
// JavaScript, puedes buscarlo en Google... o puedes usar en console.log el prototipo de
// envoltura para verlos a todos como console.log (String.prototype).

// 4. Los métodos encontrados en el nivel superior del prototipo de un objeto de envoltorio
// (es decir, String.prototype.at()) pueden llamarse directamente en cualquier cosa de
// ese tipo, por ejemplo, 'string'.at (2).

// 5. Existen métodos estáticos en la mayoría de los objetos de envoltura. Por lo general,
// se encuentran en una función de constructor de ese envoltorio, es decir,
// Number.constructor.MAX_SAFE_INTEGER, y deben llamarse a través del objeto
// de envoltorio, como Object.keys() o Object.values().

// Uso de envoltorios para crear tipos
// Los envoltorios se pueden usar para crear nuevos datos de cierto tipo. Por ejemplo, se puede
// crear una nueva cadena de tal manera, con el beneficio adicional de también coaccionar otros
// tipos a las cadenas:
newString = String("hello"); // "hello"
let objString = String({ some: "object" }); // "[object
console.log(objString); // "[object Object]"

newString = String(5); // "5"

// El mismo trabajo para números, que coaccionan las cadenas numéricas en números:
let newNumber = String("5"); // 5
console.log(typeof newNumber); // 5

newString = new String("hello"); // String { "hello" }
newNumber = new Number(5); // Number { 5 }
// El comportamiento de usar estos envoltorios primitivos como constructores es bastante poco
// confiable, por lo que generalmente se recomienda que evites esto.

// El tipo número y nan
// Not a number”.
// NaN, también puede aparecer en tu código si intentas crear
// un número a partir de algo que claramente no es un número. Un ejemplo de cómo lograrías
// esto es envolviéndolo en Number(), como lo hicimos anteriormente, o utilizando un método
// para obligarlo a un objeto como parseFloat() o parseInt():
parseInt("5"); // the Number 5
parseInt({ key: "value" }); // NaN

// Como no podemos verificar si algo es NaN haciendo
// NaN===NaN, tenemos una función llamada isNaN para hacer el trabajo en su lugar:
isNaN(5); // false
isNaN(NaN); // true
isNaN(" "); // false
isNaN(NaN); // true
isNaN(false); // false
isNaN([5]); // false

// Tipo de número matemáticas
// Estas constantes matemáticas se pueden usar en cualquier ecuación matemática, utilizando
// notación matemática estándar. Por ejemplo:
let x = 5 * Math.PI; // 5 times Pi
console.log(x);
let y = 10 * Math.E; // 10 times e

// El tipo fecha (Date)
let currentDate = new Date(); // Date Object
console.log(currentDate); // Gives current date and time

let newDate = new Date();
newDate.setFullYear("1993");
newDate.setDate("5");
newDate.setMonth("5");
console.log(newDate); // 5th June 1993

// El tipo de símbolo
// Los símbolos son un tipo de datos primitivo que se introdujo en ES6. Se utilizan para
// crear identificadores únicos para objetos. Los símbolos se crean utilizando la función
// Symbol():
let myArray = ["apple", "squid", "speaker"];
let getIterator = myArray[Symbol.iterator]();
console.log(getIterator);

let idSymbol1 = Symbol("id");
let idSymbol2 = Symbol("id");
let myObject = { [idSymbol1]: "some-id", [idSymbol2]: "some-other-id" };
console.log(myObject[idSymbol1]); // "some-id"
console.log(myObject[idSymbol2]); // "some-other-id"

// Opcionalidad
// En JavaScript, los argumentos de una función son opcionales. Si no se proporciona un
// argumento, el valor de ese argumento será undefined.

let userObject = {
  name: "John", // Propiedad 'name' con valor "John"
  age: "42", // Propiedad 'age' con valor "42"
  address: {
    // Propiedad 'address' que es otro objeto
    houseNumber: "5", // Propiedad 'houseNumber' con valor "5"
    streetName: "Highway Avenue", // Propiedad 'streetName' con valor "Highway Avenue"
    locale: {
      // Propiedad 'locale' que es otro objeto anidado dentro de 'address'
      state: "AZ", // Propiedad 'state' con valor "AZ"
      city: "Cityopolis", // Propiedad 'city' con valor "Cityopolis"
    },
  },
};

let cityString = `John is from ${userObject.address.locale.city}`;
console.log(cityString);

if (
  userObject &&
  userObject.address &&
  userObject.address.locale &&
  userObject.address.locale.city
) {
  let cityString = `John is from ${userObject.address.locale.city}`;
  console.log(cityString);
}

// Sin embargo, con la opcionalidad, podemos simplificar enormemente esta declaración. La
// declaración anterior, por ejemplo, podría escribirse así:
if (userObject?.address?.locale?.city) {
  let cityString = `John is from ${userObject.address.locale.city}`;
  console.log(cityString);
}

// podemos eliminar la instrucción if por completo:
cityString = `John is from ${userObject?.address?.locale?.city ?? "an unknown city"}`
console.log(cityString);
