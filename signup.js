document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("formTitle");
    const nameField = document.getElementById("nameField");
    const authForm = document.getElementById("authForm");
    const toggleText = document.getElementById("toggleText");
    const toggleForm = document.getElementById("toggleForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const fullNameInput = document.getElementById("fullName");
    const cropButton = document.querySelector(".btn:nth-child(1)");
    const livestockButton = document.querySelector(".btn:nth-child(2)");

    toggleForm.addEventListener("click", function (event) {
        event.preventDefault();
        if (formTitle.textContent === "Sign In") {
            formTitle.textContent = "Sign Up";
            nameField.style.display = "block";
            cropButton.textContent = "Sign Up for Crops";
            livestockButton.textContent = "Sign Up for Livestock";
            toggleText.innerHTML = "Already have an account? <a href='#' id='toggleForm'>Sign In</a>";
            document.getElementById("toggleForm").addEventListener("click", arguments.callee);
        } else {
            formTitle.textContent = "Sign In";
            nameField.style.display = "none";
            cropButton.textContent = "Sign In for Crops";
            livestockButton.textContent = "Sign In for Livestock";
            toggleText.innerHTML = "Don't have an account? <a href='#' id='toggleForm'>Sign Up</a>";
            document.getElementById("toggleForm").addEventListener("click", arguments.callee);
        }
    });

    cropButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "crop.html";
    });

    livestockButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "livestock.html";
    });
});
