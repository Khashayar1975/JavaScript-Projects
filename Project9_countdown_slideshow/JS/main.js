// ***********************************************
// Project9 Countdown and Slideshow Assignment
// Student: Khashayar Rasaei
// ***********************************************


// Countdown timer function
function countdown() {

    // Get the number of seconds entered by the user
    var seconds = Number(
        document.getElementById("seconds").value
    );

    // Check that the user entered a valid positive number
    if (!Number.isFinite(seconds) || seconds <= 0) {
        document.getElementById("timer").innerHTML =
            "Please enter a number greater than zero.";

        return;
    }

    // Round the value down to a whole number
    seconds = Math.floor(seconds);

    // Display the starting number
    document.getElementById("timer").innerHTML =
        seconds + " seconds remaining";

    // Nested function that performs the countdown
    function tick() {

        // Subtract one second
        seconds = seconds - 1;

        // Display the remaining time
        document.getElementById("timer").innerHTML =
            seconds + " seconds remaining";

        // Continue counting while seconds remain
        if (seconds > 0) {
            setTimeout(tick, 1000);
        }
        else {
            // Display a message when the timer reaches zero
            document.getElementById("timer").innerHTML =
                "Time's up!";

            window.alert("Time's up!");
        }
    }

    // Start the countdown after one second
    setTimeout(tick, 1000);
}


// Store the currently displayed slide number
let slideIndex = 1;

// Display the first slide when the page loads
showSlides(slideIndex);


// Move forward or backward through the slideshow
function plusSlides(number) {
    showSlides(slideIndex += number);
}


// Display a specific slide when its dot is clicked
function currentSlide(number) {
    showSlides(slideIndex = number);
}


// Show the selected slide and hide the others
function showSlides(number) {

    let index;

    // Get all slide elements
    let slides =
        document.getElementsByClassName("mySlides");

    // Get all navigation-dot elements
    let dots =
        document.getElementsByClassName("dot");

    // Return to the first slide after the final slide
    if (number > slides.length) {
        slideIndex = 1;
    }

    // Move to the final slide when going backward from slide one
    if (number < 1) {
        slideIndex = slides.length;
    }

    // Hide every slide
    for (index = 0; index < slides.length; index++) {
        slides[index].style.display = "none";
    }

    // Remove the active class from every dot
    for (index = 0; index < dots.length; index++) {
        dots[index].className =
            dots[index].className.replace(" active", "");
    }

    // Display the selected slide
    slides[slideIndex - 1].style.display = "block";

    // Mark the selected dot as active
    dots[slideIndex - 1].className += " active";
}