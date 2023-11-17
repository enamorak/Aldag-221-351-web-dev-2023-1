function priority(operation) { 
    return (operation === '+' || operation === '-') ? 1 : 2; 
} 
 
function isNumeric(str) { 
    return /^\d+(\.\d+)?$/.test(str); 
} 
 
function isDigit(str) { 
    return /^\d{1}$/.test(str); 
} 
 
function isOperation(str) { 
    return /^[\+\-\*\/]{1}$/.test(str); 
} 
 
function tokenize(str) { 
    let tokens = []; 
    let lastNumber = ''; 
    for (char of str) { 
        if (isDigit(char) || char === '.') { 
            lastNumber += char; 
        } else { 
            if (lastNumber.length > 0) { 
                tokens.push(lastNumber); 
                lastNumber = ''; 
            } 
        }  
        if (isOperation(char) || char === '(' || char === ')') { 
            tokens.push(char); 
        }  
    } 
    if (lastNumber.length > 0) { 
        tokens.push(lastNumber); 
    } 
    return tokens; 
} 
 
function compile(str) { 
    let out = []; 
    let stack = []; 
    for (token of tokenize(str)) { 
        if (isNumeric(token)) { 
            out.push(token); 
        } else if (isOperation(token)) { 
            while (stack.length > 0 &&  
                   isOperation(stack[stack.length - 1]) &&  
                   priority(stack[stack.length - 1]) >= priority(token)) { 
                out.push(stack.pop()); 
            } 
            stack.push(token); 
        } else if (token === '(') { 
            stack.push(token); 
        } else if (token === ')') { 
            while (stack.length > 0 && stack[stack.length - 1] !== '(') { 
                out.push(stack.pop()); 
            } 
            stack.pop(); 
        } 
    } 
    while (stack.length > 0) { 
        out.push(stack.pop()); 
    } 
    return out.join(' '); 
} 
 
function evaluate(str) { 
    console.log(str); 
    let stack = []; 
    for (element of str.split(" ")) { 
        if (!isOperation(element)) stack.push(Number(element)); 
        else { 
            let buffer = stack.pop(); 
            switch (element) { 
            case "+": 
                buffer = stack.pop() + buffer; 
                break; 
            case "-": 
                buffer = stack.pop() - buffer; 
                break; 
            case "/": 
                buffer = stack.pop() / buffer; 
                break; 
            case "*": 
                buffer = stack.pop() * buffer; 
                break; 
            default: 
                break; 
            } 
            stack.push(buffer); 
        } 
    } 
    return stack.pop().toString(); 
} 
 
function clickHandler(event) { 
    const textField = document.querySelector(".screen > span"); 
    switch (event.target.className) { 
    case "key digit": 
    case "key operation": 
    case "key bracket": 
        textField.textContent += event.target.textContent; 
        break; 
    case "key result": 
        textField.textContent = evaluate(compile(textField.textContent)); 
        break; 
    case "key clear": 
        textField.textContent = ""; 
        break; 
    } 
} 
 
window.onload = function () { 
    document.querySelector(".calc-container").onclick = clickHandler; 
}; 