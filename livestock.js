document.getElementById("livestockForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let productionOutput = document.getElementById("productionOutput").value;
    if (productionOutput) {
        // Get existing data from localStorage or initialize an empty object
        let storedData = JSON.parse(localStorage.getItem("productionData")) || {};

        // Update count for the selected production output
        storedData[productionOutput] = (storedData[productionOutput] || 0) + 1;

        // Store updated data back in localStorage
        localStorage.setItem("productionData", JSON.stringify(storedData));

        // Redirect to chart page
        window.location.href = "livestock_chart.html";
    } else {
        alert("Please select a production output.");
    }
});
