import { elements } from "./base";

export const showToast = (message, buttonText) => {
    const element = document.createElement("div");
    element.classList.add("toast");
    element.innerHTML = `
    <div class="toast__message">${message}</div> 
    <div class="toast__btn">${buttonText}</div>
    <div  class="toast__close">X</div>
    `
    document.body.appendChild(element);
    const button = document.getElementById("toastbtn")
    const closeButton = document.getElementById("toastbtn")

    return new Promise((resolve, reject) => {

        document.querySelector(".toast")
            .addEventListener("click", (event) => {
                if (event.target.classList.contains("toast__btn")) {
                    console.log("here")
                    resolve(true);
                    return element.remove();
                }
                if (event.target.classList.contains("toast__close")) {
                    reject(false);
                    element.style.display = "none";
                    return element.remove();
                }

            })
    });

}

