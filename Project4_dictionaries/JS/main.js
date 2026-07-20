// ***********************************************
// Project4_dictionaries Assignment
// Student: Khashayar Rasaei
// ***********************************************

// Function that creates a dictionary and displays one value
function my_Dictionary() {

    // Create a JavaScript object (dictionary)
    var movie = {
        Title: "The Avengers",
        Genre: "Action",
        Director: "Joss Whedon",
        Rating: "PG-13"
    };

    // Remove the Genre key-value pair before displaying it
    delete movie.Genre;

    // Display the value (it will show "undefined")
    document.getElementById("Dictionary").innerHTML = movie.Genre;
}