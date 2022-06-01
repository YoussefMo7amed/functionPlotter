const PATH = "./../../process"
import { result } from "./../process/result.js";
import { plot, removePlot } from "./../process/plot.js";
import { deleteErrors, printErrors, findErrors } from "./../process/error.js";
import { extract } from "./../process/extract.js";

function createX(min, max) {
    let x = [];
    for (let i = min; i <= max; i++) {
        x.push(i);
    }
    return x;
}

function data(Formula = "x^2", min = -100, max = 100) {
    let x = createX(min, max);
    let y = result(Formula, min, max);
    return [x, y];
}

function process(event) {
    event.preventDefault();
    deleteErrors();
    let [formula, min, max] = extract();
    if (findErrors(formula, min, max)) {
        printErrors();
        removePlot();
    } else {
        console.log("Plotting the function.");
        plot(...data(formula, min, max));
        console.log("function plotted.");
    }
}

const form = document.getElementById("form");
form.addEventListener("submit", process);
