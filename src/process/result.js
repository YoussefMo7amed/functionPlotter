const OPERATORS = ["-", "*", "/", "+", "^"];

function correctFormula(formula) {
    formula = formula.replaceAll("^", "**");

    formula = formula.replaceAll("[", "(");
    formula = formula.replaceAll("]", ")");

    formula = formula.replaceAll("{", "(");
    formula = formula.replaceAll("}", ")");
    return formula;
}

function applyFunction(formula, xValue) {
    formula = formula.toLowerCase();
    formula = formula.replaceAll("x", xValue);
    let y = Function("return " + formula)();
    return Number(y);
}

function result(formula, minimum, maximum) {
    let y = [];
    formula = correctFormula(formula);
    for (let i = minimum; i <= maximum; i++) {
        let x = "(" + i + ")";
        y.push(applyFunction(formula, x));
    }
    return y;
}

export { result };
