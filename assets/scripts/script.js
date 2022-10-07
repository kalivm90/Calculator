// TODO
document.addEventListener("DOMContentLoaded", () => {
    let buttonContainer = document.querySelector(".button-container");

    function makeNumbers() {
        let types = ["7", "8", "9", "/", "4", "5", "6", "x", "1", "2", "3", "-", ".", "0", "=", "+"]
        for (let i = 0; i < types.length; i++) {
            let button = document.createElement("button")
            button.setAttribute("class", "button")
            button.textContent = types[i]
            buttonContainer.appendChild(button)
        }
    }
    makeNumbers()
})