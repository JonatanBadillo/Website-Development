var person_age_string;
var person_age_number;
var age_in_twenty_years;

// Recibe la edad de la persona como String
person_age_string = prompt("What is your age?");
//  Convierte la edad de la persona a un número
person_age_number = parseInt(person_age_string);
// Calcula la edad de la persona en 20 años
age_in_twenty_years = person_age_number + 20;
// Muestra la edad de la persona en 20 años
alert("In 20 years you will be " + age_in_twenty_years + 
	" years old");