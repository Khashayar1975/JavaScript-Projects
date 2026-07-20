// This function gathers the selected pizza size and toppings,
// calculates the final price, and displays a receipt.
function getReceipt() {

    // This string grows into the complete receipt.
    let receiptText = "<h2>Order Receipt</h2>";

    // This variable stores the running order total.
    let runningTotal = 0;

    // This variable stores the price of the selected pizza size.
    let sizeTotal = 0;

    // Get all size radio buttons.
    const sizeArray = document.getElementsByClassName("size");

    // Store the selected size.
    let selectedSize = "";

    // Find the checked pizza size.
    for (let i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            selectedSize = sizeArray[i].value;
            receiptText += selectedSize + "<br>";
            break;
        }
    }

    // Set the base price according to pizza size.
    if (selectedSize === "Personal Pizza") {
        sizeTotal = 6;
    } else if (selectedSize === "Small Pizza") {
        sizeTotal = 8;
    } else if (selectedSize === "Medium Pizza") {
        sizeTotal = 10;
    } else if (selectedSize === "Large Pizza") {
        sizeTotal = 14;
    } else if (selectedSize === "Extra Large Pizza") {
        sizeTotal = 16;
    }

    // Start the running total with the pizza-size price.
    runningTotal = sizeTotal;

    // Add selected toppings and display the final receipt.
    getTopping(runningTotal, receiptText);
}


// This function calculates topping charges.
// The first selected topping is free; each additional topping costs $1.
function getTopping(runningTotal, receiptText) {

    // This variable stores the topping charge.
    let toppingTotal = 0;

    // This array stores every selected topping.
    const selectedTopping = [];

    // Get all topping checkboxes.
    const toppingArray =
        document.getElementsByClassName("toppings");

    // Add checked toppings to the receipt and array.
    for (let i = 0; i < toppingArray.length; i++) {
        if (toppingArray[i].checked) {
            selectedTopping.push(toppingArray[i].value);
            receiptText += toppingArray[i].value + "<br>";
        }
    }

    // Count the selected toppings.
    const toppingCount = selectedTopping.length;

    // The first topping is free.
    if (toppingCount > 1) {
        toppingTotal = toppingCount - 1;
    } else {
        toppingTotal = 0;
    }

    // Add the topping cost to the running total.
    runningTotal += toppingTotal;

    // Display the receipt items.
    document.getElementById("showText").innerHTML =
        receiptText;

    // Display the final total.
    document.getElementById("totalPrice").innerHTML =
        "<h2>Total: <strong>$" +
        runningTotal.toFixed(2) +
        "</strong></h2>";
}
