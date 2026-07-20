// ***********************************************
// Project6 Ternary Operators and Constructors
// Student: Khashayar Rasaei
// ***********************************************


// Function using a ternary operator with browser input
function Ride_Function() {

    // Get the height entered by the user
    var Height = document.getElementById("Height").value;

    // Use a ternary operator to decide which message to display
    var Can_ride = Height < 52
        ? "You are too short"
        : "You are tall enough";

    // Display the result in the HTML paragraph
    document.getElementById("Ride").innerHTML =
        Can_ride + " to ride.";
}


// Constructor function using the "this" keyword
function Vehicle(Make, Model, Year, Color) {
    this.Vehicle_Make = Make;
    this.Vehicle_Model = Model;
    this.Vehicle_Year = Year;
    this.Vehicle_Color = Color;
}


// Create objects using the "new" keyword
var Jack = new Vehicle("Dodge", "Viper", 2020, "Red");

var Emily = new Vehicle(
    "Jeep",
    "Trail Hawk",
    2019,
    "White and Black"
);

var Erik = new Vehicle(
    "Ford",
    "Pinto",
    1971,
    "Mustard"
);


// Function that displays one constructor object
function myFunction() {

    document.getElementById(
        "Keywords_and_Constructors"
    ).innerHTML =
        "Erik drives a " +
        Erik.Vehicle_Color +
        "-colored " +
        Erik.Vehicle_Model +
        " manufactured in " +
        Erik.Vehicle_Year +
        ".";
}


// Outer function
function add_Strings() {

    // Variable belonging to the outer function
    var start_string = "Hello";

    // Nested function
    function Adding(str) {
        start_string = start_string + " " + str;
    }

    // Call the nested function
    Adding("World");

    // Display the completed string
    document.getElementById(
        "Nested_Function"
    ).innerHTML = start_string;
}