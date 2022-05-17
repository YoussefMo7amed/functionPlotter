function extractFormula() {
    let formula = document.getElementById("formula").value;
    console.log("formula extracted.");
    return formula;
}

function removeWhiteSpace(formula) {
    return formula.replace(/\s/g, "");
}

function extractIntervals() {
    let min = -100;
    let max = 100;
    min = document.getElementById("min").value;
    max = document.getElementById("max").value;

    console.log("Intervals extracted.");
    return [Number(min), Number(max)];
}

function extract() {
    let formula = extractFormula();
    // remove white space
    formula = removeWhiteSpace(formula);
    formula = formula.toLowerCase();
    let [min, max] = extractIntervals();
    return [formula, min, max];
}

export { extract };
