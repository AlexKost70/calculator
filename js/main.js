'use strict';

let buttons = document.querySelectorAll('.button');
let display = document.querySelector('.display');

function operate(operator, firstNumber, secondNumber) {
    switch(operator) {
        case '+':
            return parseFloat(firstNumber) + parseFloat(secondNumber);
        case '-':
            return (firstNumber) - (secondNumber);
        case '/':
            return (firstNumber) / (secondNumber);
        case '*':
            return (firstNumber) * (secondNumber);
    }
}

function detectButton(event) {
    let pushedButton = event.target.textContent;
    switch (pushedButton) {
        case '=':
            display.textContent = calculate(display.textContent);
            break;
        case 'C':
            display.textContent = 0;
            break;
        case '<-x':
            if (display.textContent.length == 1) {
                display.textContent = 0;
            } else {
                display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            }
            break;
        default:
            if (display.textContent == 0 && display.textContent != '0.' && pushedButton != '.') {
                display.textContent = pushedButton;
            } else {
                if (display.textContent.length < 23) {
                    display.textContent = display.textContent + '' + pushedButton;
                }
            }
            break;
            
    }
}

buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        detectButton(event);
    });
});

function calculate(expression) {
    let copy = expression;

    expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
    let numbers = copy.split(/[^0-9\.]+/);
    let operators = expression.split("#").filter(function(n){return n});
    let result = [];

    for(let i = 0; i < numbers.length; i++){
        result.push(numbers[i]);
        if (i < operators.length) result.push(operators[i]);
    }

    while (result.includes('*') || result.includes('/')) {
        for (let i = 0; i < result.length; i++) {
            switch (result[i]) {
                case '*':
                    result[i - 1] = operate('*', result[i-1], result[i+1]);
                    result.splice(i, 2);
                    break;  
                case '/':
                    result[i - 1] = operate('/', result[i-1], result[i+1]);
                    result.splice(i, 2);
                    break; 
            }
        }
    }
    while (result.includes('+') || result.includes('-')) {
        for (let i = 0; i < result.length; i++) {
            switch (result[i]) {
                case '+':
                    result[i - 1] = operate('+', result[i-1], result[i+1]);
                    result.splice(i, 2);
                    break; 
                case '-':
                    result[i - 1] = operate('-', result[i-1], result[i+1]);
                    result.splice(i, 2);
                    break; 
            }
        }
    } 
    return result[0];
}
