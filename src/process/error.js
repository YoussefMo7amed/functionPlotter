import * as Validation from "./validation.js";

let errors = [];

function deleteErrors() {
    let error_div = document.getElementById("error");
    error_div.style.display = "none";

    let error_list = document.getElementById("error_list");
    error_list.innerHTML = "";
    errors = [];
}

function printErrors() {
    let error_div = document.getElementById("error");
    error_div.style.display = "block";

    let error_list = document.getElementById("error_list");
    errors.forEach((error) => {
        let li = document.createElement("li");
        li.textContent = error;
        error_list.appendChild(li);
    });
}

function findErrors(formula, min, max) {
    let found = false;
    if (!Validation.isValidInterval(min, max)) {
        errors.push(
            "Please enter (Minimum Value) that is less than or equal to (Maximum Value)."
        );
        found = true;
    }
    if (Validation.isStrangeElement(formula)) {
        errors.push(
            "Please remove any variable not (X) or any non-numeric symbol."
        );
        found = true;
    }
    if (Validation.shouldPutOperator(formula)) {
        errors.push(
            "Please put operator (+,-,*,/) between the (x) variable and the number (or other x)."
        );
        found = true;
    }
    if (Validation.isEmptyParenthesis(formula)) {
        errors.push("Please remove empty parentheses.");
        found = true;
    }
    if (!Validation.isCorrectFormula(formula)) {
        errors.push("Please enter valid formula.");
        found = true;
    }
    if (Validation.existingNonOperatorAlongsideWithX(formula)) {
        errors.push(
            'Please remove non-operator character along side with X \n\t(remove ".x", "x.", "x(", ")x" etc.)'
        );
        found = true;
    }
    if (Validation.isDividedByZero(formula)) {
        errors.push("You can't divide by zero!");
        found = true;
    }
    if (!Validation.isValidParentheses(formula)) {
        errors.push("Please enter valid parentheses.");
        found = true;
    }
    if (found) {
        console.log("Error Found!");
    } else {
        console.log("No Error Found!");
    }
    return found;
}

export { deleteErrors, printErrors, findErrors };
