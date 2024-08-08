console.log("¡Hola mundo!");
console.log("¡Adiós Mundo!");

console.log(5 + 6);

let myVariable = 5;
if (myVariable === 5) {
  console.log("The variable is 5!");
}

myVariable = 10;
console.log(myVariable);

let myVariable2 = 5;
{
  let myVariable2 = 10;
  console.log(myVariable2);
}
console.log(myVariable2);

var myVariableA = 5;
var myVariableA = 10;
console.log(myVariableA);

// Mutación de variables const
const myArray = ["some", "set", "of", "content"];
console.log(myArray);

// Mutate the array
myArray.push("new data!");
console.log(myArray);

// Definición de variables sin valores
let myVariableTwo;
console.log(myVariableTwo);

// Operadores de asignacion
let x = 5;
x *= 5;
console.log(x);

x += 5;
console.log(x); // Console logs 30 (25 plus 5 = 30)
x /= 5;
console.log(x); // Console logs 6 (30 divided by 5 = 6)
x -= 1;
console.log(x); // Console logs 5 (6 minus 1 = 5)
x %= 4;
console.log(x); /*
Console logs 1 (if you divide 5 by 4, the remainder is 1.
% is the remainder operator
*/

// Concatenación variable
myVariable = "hello";
let myOtherVariable = "world";
let combine = myVariable + myOtherVariable; // "helloworld"
combine = myVariable + " " + myOtherVariable;
console.log(combine);

myVariable = 5;
myOtherVariable = 10;
combine = myVariable + myOtherVariable;
console.log(combine);

myVariable = "5";
myOtherVariable = 5;
combine = myVariable + myOtherVariable;
console.log(combine);

// Literales de plantilla
myVariable = `hello world
!!
how are you?`;
console.log(myVariable);

let someWord = "world";
myVariable = `hello ${someWord}!`;
console.log(myVariable);

// Declaraciones Logicas
// Declaraciones if/else
// We have set myVariable to 5
myVariable = 5;
if (myVariable === 5) {
  console.log("The variable is 5!");
} else {
  console.log("The variable is not 5.");
}

// Declaraciones switch
// Let's set x to 5
x = 5;
switch (x) {
  case 5:
    console.log("hello");
    break;
  case 6:
    console.log("goodbye");
    break;
}

x = "Apples";
switch (x) {
  case "Apples":
  case "Strawberries":
    console.log("Apples and Strawberries can be red.");
    break;
  case "Bananas":
    console.log("Bananas are yellow.");
}
