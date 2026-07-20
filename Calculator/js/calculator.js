// This object stores the current calculator values and state.
const Calculator = {
    Display_Value: "0",
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null
};


// This function handles number-button input.
function Input_Digit(digit) {
    const {
        Display_Value,
        Wait_Second_Operand
    } = Calculator;

    // If an operator was just selected, begin a new display value.
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        // Replace the initial zero or append the new digit.
        Calculator.Display_Value =
            Display_Value === "0"
                ? digit
                : Display_Value + digit;
    }
}


// This function handles decimal-point input.
function Input_Decimal(dot) {
    // Start the next operand with zero when needed.
    if (Calculator.Wait_Second_Operand === true) {
        Calculator.Display_Value = "0.";
        Calculator.Wait_Second_Operand = false;
        return;
    }

    // Add only one decimal point to the current number.
    if (!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value += dot;
    }
}


// This function handles operator buttons.
function Handle_Operator(Next_Operator) {
    const {
        First_Operand,
        Display_Value,
        operator
    } = Calculator;

    const Value_of_Input = parseFloat(Display_Value);

    // Replace the pending operator when two operators are clicked in a row.
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }

    // Store the first operand.
    if (First_Operand === null && Number.isFinite(Value_of_Input)) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {
        const Value_Now = First_Operand || 0;

        // Perform the selected calculation.
        let result =
            Perform_Calculation[operator](
                Value_Now,
                Value_of_Input
            );

        // Limit floating-point artifacts while preserving useful precision.
        result = Number(result.toFixed(10));

        Calculator.Display_Value = String(result);
        Calculator.First_Operand = result;
    }

    // Prepare the calculator to receive the second operand.
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}


// These arrow functions perform the actual calculations.
const Perform_Calculation = {
    "/": (First_Operand, Second_Operand) =>
        Second_Operand === 0
            ? "Error"
            : First_Operand / Second_Operand,

    "*": (First_Operand, Second_Operand) =>
        First_Operand * Second_Operand,

    "+": (First_Operand, Second_Operand) =>
        First_Operand + Second_Operand,

    "-": (First_Operand, Second_Operand) =>
        First_Operand - Second_Operand,

    "=": (First_Operand, Second_Operand) =>
        Second_Operand
};


// This function resets the calculator when AC is clicked.
function Calculator_Reset() {
    Calculator.Display_Value = "0";
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}


// This function updates the calculator screen.
function Update_Display() {
    const display =
        document.querySelector(".calculator-screen");

    display.value = Calculator.Display_Value;
}


// Display the starting value.
Update_Display();


// This section listens for calculator-button clicks.
const keys = document.querySelector(".calculator-keys");

keys.addEventListener("click", function (event) {
    const target = event.target;

    // Ignore clicks that are not on buttons.
    if (!target.matches("button")) {
        return;
    }

    // Process operator buttons.
    if (target.classList.contains("operator")) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    // Process decimal input.
    if (target.classList.contains("decimal")) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    // Process the all-clear button.
    if (target.classList.contains("all-clear")) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    // Process number buttons.
    Input_Digit(target.value);
    Update_Display();
});


// This optional section allows keyboard input.
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        Input_Digit(key);
        Update_Display();
        return;
    }

    if (key === ".") {
        Input_Decimal(key);
        Update_Display();
        return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
        Handle_Operator(key);
        Update_Display();
        return;
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        Handle_Operator("=");
        Update_Display();
        return;
    }

    if (key === "Escape") {
        Calculator_Reset();
        Update_Display();
    }
});
