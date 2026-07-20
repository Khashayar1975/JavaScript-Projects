// ***********************************************
// Project7 Scope Time Function
// Student: Khashayar Rasaei
// ***********************************************

// Global variable
var x = 10;


// Function using a local variable
function Add_numbers_1() {

    var x = 99; // Local variable

    document.write(10 + x + "<br>");
}


// Function using the global variable
function Add_numbers_2() {

    document.write(x + 11);

    // Use console.log() to help debug
    console.log(x);
}


// Run both functions
Add_numbers_1();
Add_numbers_2();


// Function with an if statement
function get_Date() {

    if (new Date().getHours() < 18) {

        document.getElementById("Greeting").innerHTML =
            "It is currently before 6 PM.";
    }
}


// Function using if...else
function get_Reply() {

    var user_input =
        document.getElementById("userInput").value;

    var reply;

    if (user_input % 2 === 0) {

        reply = "You entered an even number!";
    }
    else {

        reply = "You entered an odd number!";
    }

    document.getElementById("feedback").innerHTML = reply;
}


// Function showing morning, afternoon, or evening
function Time_function() {

    var Time = new Date().getHours();

    var Reply;

    if (Time < 12 && Time > 0) {

        Reply = "It is morning time!";
    }
    else if (Time >= 12 && Time < 18) {

        Reply = "It is afternoon!";
    }
    else {

        Reply = "It is evening time!";
    }

    document.getElementById("Time_of_day").innerHTML = Reply;
}