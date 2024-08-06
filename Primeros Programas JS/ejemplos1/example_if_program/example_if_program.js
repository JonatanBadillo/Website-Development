var my_age;

// Prompt for an age and convert it into an integer
my_age = parseInt(prompt("What is your age?"));

// If the user is old enough to vote
if(my_age > 17) { 
	alert("You are old enough to vote!"); 
} 
// If the user is not old enough to vote
else { 
	// Calculate the number of years until the user can vote
	var years_to_vote; 
	// The number of years until the user can vote
	years_to_vote = 18 - my_age; 
	// Alert the user of the number of years until they can vote.
	alert("You have " + years_to_vote + 
		" years left before you can vote.");
} 
