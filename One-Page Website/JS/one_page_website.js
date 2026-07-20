// This variable stores the currently displayed slide number.
let slideIndex = 1;


// This function opens the lightbox modal.
function openModal() {
    const modal = document.getElementById("myModal");

    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    // Prevent the page behind the modal from scrolling.
    document.body.style.overflow = "hidden";
}


// This function closes the lightbox modal.
function closeModal() {
    const modal = document.getElementById("myModal");

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    // Restore normal page scrolling.
    document.body.style.overflow = "";
}


// This function moves forward or backward through the slides.
function plusSlides(number) {
    showSlides(slideIndex += number);
}


// This function displays a specific slide.
function currentSlide(number) {
    showSlides(slideIndex = number);
}


// This function hides all slides and then displays the selected one.
function showSlides(number) {
    let index;

    const slides =
        document.getElementsByClassName("mySlides");

    const thumbnailImages =
        document.getElementsByClassName("demo");

    const captionText =
        document.getElementById("caption");

    // Return to the first slide after the final slide.
    if (number > slides.length) {
        slideIndex = 1;
    }

    // Move to the final slide when going backward from slide one.
    if (number < 1) {
        slideIndex = slides.length;
    }

    // Hide every large image.
    for (index = 0; index < slides.length; index++) {
        slides[index].style.display = "none";
    }

    // Remove the active class from every modal thumbnail.
    for (index = 0; index < thumbnailImages.length; index++) {
        thumbnailImages[index].className =
            thumbnailImages[index].className.replace(" active", "");
    }

    // Display the selected image.
    slides[slideIndex - 1].style.display = "block";

    // Highlight the selected thumbnail.
    thumbnailImages[slideIndex - 1].className += " active";

    // Display the selected image caption.
    captionText.innerHTML =
        thumbnailImages[slideIndex - 1].alt;
}


// Close the lightbox when the Escape key is pressed.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }

    // Allow keyboard navigation while the modal is open.
    if (
        document.getElementById("myModal").style.display === "block"
    ) {
        if (event.key === "ArrowRight") {
            plusSlides(1);
        }

        if (event.key === "ArrowLeft") {
            plusSlides(-1);
        }
    }
});


// Close the lightbox when the dark area outside the content is clicked.
document.getElementById("myModal").addEventListener(
    "click",
    function (event) {
        if (event.target === this) {
            closeModal();
        }
    }
);
