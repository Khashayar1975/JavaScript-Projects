// ***********************************************
// Project5_comparisons_type_coercion Assignment
// Student: Khashayar Rasaei
// ***********************************************

// Variable with a Boolean data type
var x = true;

// Display the data type of the variable
document.write(typeof x);
document.write("<br>");

// Expression combining a string and a number
document.write("10" + 10);
document.write("<br>");

// Using the == operator
document.write(5 == 5);
document.write("<br>");

// Using the === operator
x = 1;
y = 1;
document.write(x === y);
document.write("<br>");

// Using the > operator
document.write(10 > 5);
document.write("<br>");

// Using the < operator
document.write(10 < 5);
document.write("<br>");

// Using the && operator
document.write(10 > 5 && 11 > 6);
document.write("<br>");

// Using the || operator
document.write(10 < 5 || 11 < 6);
document.write("<br>");

// Function using the ! operator
function not_Function() {
    document.getElementById("Not").innerHTML = !(1 > 2);
}