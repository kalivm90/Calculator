// TODO
document.addEventListener("DOMContentLoaded", () => {
    let types = ["7", "8", "9", "/", "4", "5", "6", "x", "1", "2", "3", "-", ".", "0", "=", "+"]
    let operations = types.filter(i => (isNaN(i) && i != ".") ? true : false)

    // SCREEN VALUES
    let screen = document.querySelector(".screen")
    let bottomValue = screen.querySelector(".bottom-value");
    let topValue = screen.querySelector(".top-value");
    // TOP BUTTONS
    let clr = document.querySelector(".clear")
    let dlt = document.querySelector(".delete")
    // NUMBER AND OPERATOR BUTTONS
    let buttonContainer = document.querySelector(".button-container");
    let buttons = makeNumbers()
    // FOOTER
    let footerIcon = document.querySelector("#footer-link")

    // Events
    buttons.forEach(but => but.onclick = e => updateCalc(but.textContent))
    clr.onclick = e => clear(e);
    dlt.onclick = e => del(e);
    footerIcon.onclick = e => window.location = "https://github.com/kalivm90";

    const calc = {
        "+" : (a, b) => a + b,
        "/" : (a, b) => a / b,
        "x" : (a, b) => a * b,
        "-" : (a, b) => a - b
    };

    let fNum = ""
    let sNum = ""
    let currentOp = ""
    let canDel = true;

    function setAttributes(elem, obj) {
        for (item in obj) {
            elem.setAttribute(item, obj[item])
        }
    }

    function makeNumbers() {
        for (let i = 0; i < types.length; i++) {
            let button = document.createElement("button")
            setAttributes(button, {"class": "numButton", "id" : `${String(types[i])}`})
            button.textContent = types[i]
            buttonContainer.appendChild(button)
        }
        return document.querySelectorAll(".numButton")
    }  

    function updateCalc(e) {
        // tries to find if e is in list of operations
        const isAOperator = operations.find(i => i === e);
        // if it is run pressedOperator else run pressedNumber
        (isAOperator) ? pressedOperator(e) : pressedNumber(e);
    }

    function pressedOperator(e) {
        if (bottomValue.textContent === "0") {
            return
        // if its the first operator pressed set current operator and update top value of calculator
        } else if (currentOp === "") {
            currentOp = e
            setValue(topValue, fNum, currentOp)
        // if equals is pressed 
        } else if (e === "=") {
            setValue(topValue, fNum, currentOp, sNum, e)
            setValue(bottomValue, operate(currentOp, fNum, sNum))
            canDel = false
        // if its the second make calculation with old operator and set currentOperator with e
        } else {
            let calcNum = operate(currentOp, fNum, sNum)
            currentOp = e 
            fNum = calcNum
            sNum = ""
            setValue(topValue, calcNum, currentOp)
            setValue(bottomValue, fNum)
            canDel = false
        }
    }

    function pressedNumber(e) {
        // if first number add to bottom
        if (topValue.textContent === "") {
            fNum += e
            setValue(bottomValue, fNum)
        // if operator has been pressed write second num on bottom
        } else if (currentOp != "") {
            sNum += e
            setValue(bottomValue, sNum)
            canDel = true
        }
    }

    function setValue(name) {
        let str = ""
        const args = Array.from(arguments).slice(1, arguments.length)
        let makeStr = args.forEach(i => str += `${i} `)
        return name.textContent = str
    }
    
    function operate(operator, first, second) {
        return String(calc[operator](Number(first), Number(second)).toFixed(13))
    }

    function clear(e) {
        // resets all variables and updates both displays
        fNum = sNum = currentOp = "";
        canDel = true;
        // setValue breaks the calculator if used here, and I am not sure why. So in the meantime I am setting them manually
        topValue.textContent = ""
        bottomValue.textContent = "0"
    }

    function del(e) {
        // if no numbers are selected and operator is pressed or the answer is currently displayed on the screen
        if (bottomValue.textContent === "0" && fNum === "" || !canDel) {
            e.target.textContent = "Enter Number"
            setTimeout(() => e.target.textContent = "Delete", 900)
            return 
        } else if (sNum === "") {
            fNum = fNum.slice(0, -1)
            bottomValue.textContent = fNum
        } else if (fNum != "" && currentOp != "" && sNum === ""){
            return
        } else {
            sNum = sNum.slice(0, -1)
            bottomValue.textContent = sNum
        } 
    }
})