const OPERATORS = ["-", "*", "/", "+", "^"];
const SEPARATORS = [".", ","];
const OpenedParentheses = ["(", "{", "["];
const ClosedParentheses = [")", "}", "]"];

function existingNonOperatorAlongsideWithX(formula) {
    let exists = false;
    exists = formula.includes(".x") || formula.includes("x.");
    // "x("
    OpenedParentheses.forEach((p) => {
        exists = exists || formula.includes(`x${p}`);
    });
    // ")x"
    ClosedParentheses.forEach((p) => {
        exists = exists || formula.includes(`${p}x`);
    });
    return exists;
}

function isSeparator(c) {
    return SEPARATORS.includes(c);
}

function isOpenedParenthesis(c) {
    return OpenedParentheses.includes(c);
}

function isClosedParenthesis(c) {
    return ClosedParentheses.includes(c);
}

function isParenthesis(c) {
    return isOpenedParenthesis(c) || isClosedParenthesis(c);
}

function isEmptyParenthesis(formula) {
    return (
        formula.includes("()") ||
        formula.includes("[]") ||
        formula.includes("{}")
    );
}

function oppositeParenthesis(c, opened) {
    let index;
    if (opened) {
        index = OpenedParentheses.indexOf(c);
        return ClosedParentheses[index];
    } else {
        index = ClosedParentheses.indexOf(c);
        return OpenedParentheses[index];
    }
}

function isValidParentheses(formula) {
    let pars = [];
    for (let i = 0; i < formula.length; i++) {
        let c = formula[i];
        if (isOpenedParenthesis(c)) {
            pars.push(c);
        } else if (isClosedParenthesis(c)) {
            if (pars.length === 0) return false;
            if (pars.pop() === oppositeParenthesis(c)) {
                continue;
            } else {
                return false;
            }
        }
    }
    return pars.length === 0;
}

function isDigit(c) {
    return c >= "0" && c <= "9";
}

function isOperator(c) {
    return OPERATORS.includes(c);
}

function isDividedByZero(formula) {
    return formula.includes("/0") || formula.includes("%0");
}

//UNUSED
// number of numbers (or variables) should be less than number of operators by 1 (e.g. 1 + 5)
// or equals if the first number is negative (e.g. -1 + 5)
// Problem: 13+ (correct but in reality it is not.)
function isCorrectFormula_(formula) {
    let digits = 0;
    let operators = 0;
    for (let i = 0; i < formula.length; i++) {
        if (isOperator(formula[i])) {
            operators += 1;
        } else {
            digits += 1;
        }
    }
    // e.g. "-5 + x"
    if (operators === digits) {
        return formula[0] == "-";
    }
    return digits - operators === 1;
}

function isCorrectFormula(formula) {
    let operators = [];
    let digits = 0;
    let valid = true;

    for (let i = 0; i < formula.length; i++) {
        let c = formula[i];

        if (isOperator(c)) {
            if (i === 0) {
                if (c != "-") {
                    valid = false;
                    break;
                }
            }
            if (i === formula.length - 1) {
                if (!isDigit(c) || c != "x") {
                    valid = false;
                }
            }
            operators.push(i);
        } else {
            if (!isSeparator(c)) {
                digits += 1;
            }
        }
    }
    if (digits === 0) {
        return false;
    }
    if (valid) {
        for (let i = 1; i < operators.length; i++) {
            if (operators[i] - operators[i - 1] === 1) {
                valid = false;
                break;
            }
        }
    }
    return valid;
}

function isStrangeElement(formula) {
    formula = formula.toLowerCase();
    for (let i = 0; i < formula.length; i++) {
        let c = formula[i];
        if (
            !(
                isOperator(c) ||
                isDigit(c) ||
                c == "x" ||
                isParenthesis(c) ||
                isSeparator(c)
            )
        ) {
            return true;
        }
    }
    return false;
}

function isValidInterval(min, max) {
    return min <= max;
}

function shouldPutOperator(formula) {
    // \d+x|x+\d
    // (2x) or (x2) are not allowed, should be (2 * x ) or (x * 2)
    return /\d+x|x+\d$/.test(formula) || isConsecutiveX(formula);
}

function isConsecutiveX(formula) {
    formula = formula.toLowerCase();
    return formula.includes("xx");
}

function isValid(formula, min, max) {
    let valid =
        isValidInterval(formula, min, max) &&
        isCorrectFormula(formula, min, max) &&
        !isStrangeElement(formula, min, max) &&
        !isEmptyParenthesis(formula, min, max) &&
        !isDividedByZero(formula) &&
        !shouldPutOperator(formula, min, max) &&
        !existingNonOperatorAlongsideWithX(formula, min, max) &&
        isValidParentheses(formula);
    return valid;
}

// main();

export {
    isValid,
    isValidInterval,
    isDividedByZero,
    isValidParentheses,
    shouldPutOperator,
    isStrangeElement,
    isEmptyParenthesis,
    isCorrectFormula,
    existingNonOperatorAlongsideWithX,
};
