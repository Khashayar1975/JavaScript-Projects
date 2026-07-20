// Addition function using the + operator
function addition() {
    var result = 1 + 42;

    document.getElementById("Add").innerHTML =
        "1 + 42 = " + result;
}


// Subtraction function using the - operator
function subtraction() {
    var result = 9 - 7;

    document.getElementById("Sub").innerHTML =
        "9 - 7 = " + result;
}


// Multiplication function using the * operator
function multiplication() {
    var result = 12 * 5;

    document.getElementById("Mult").innerHTML =
        "12 × 5 = " + result;
}


// Division function
// This is included in the model answer as an additional example
function division() {
    var result = 39 / 3;

    document.getElementById("Div").innerHTML =
        "39 ÷ 3 = " + result;
}


// Function using Math.random()
function randomNumber() {
    var result = Math.random() * 10;

    document.getElementById("Ran").innerHTML =
        "Random number: " + result;
}


// Modulus function using the % operator
function modulusOperator() {
    var result = 38 % 4;

    document.getElementById("Mod").innerHTML =
        "The remainder of 38 ÷ 4 is " + result;
}


// Increment function using the ++ operator
function incrementNumber() {
    var value =
        document.getElementById("IncrementText").innerHTML;

    value++;

    document.getElementById("IncrementText").innerHTML = value;
}


// Decrement function using the -- operator
function decrementNumber() {
    var value =
        document.getElementById("DecrementText").innerHTML;

    value--;

    document.getElementById("DecrementText").innerHTML = value;
}