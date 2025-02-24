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

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("livestockForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let livestockRecords = JSON.parse(localStorage.getItem("livestockRecords")) || [];

        let newRecord = {
            animalType: document.getElementById("animalType").value,
            dob: document.getElementById("dob").value,
            healthStatus: form.elements[2].value,
            vaccinationStatus: document.getElementById("vaccinationStatus").value,
            productionOutput: document.getElementById("productionOutput").value,
            feedingSchedule: document.getElementById("feedingSchedule").value,
        };

        livestockRecords.push(newRecord);
        localStorage.setItem("livestockRecords", JSON.stringify(livestockRecords));

        form.reset();
        window.location.href = "livestock_chart.html"; // Redirect to the records page
    });
});
