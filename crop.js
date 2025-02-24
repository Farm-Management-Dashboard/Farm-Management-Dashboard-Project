document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cropForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload
        let cropRecords = JSON.parse(localStorage.getItem("cropRecords")) || [];

        // Create a new record object from the form data
        let newRecord = {
            cropName: document.getElementById("cropName").value.trim(),
            cropType: document.getElementById("cropType").value.trim() || "N/A",
            plantedDate: document.getElementById("plantedDate").value || "N/A",
            fertilizer: document.getElementById("fertilizer").value.trim() || "N/A",
            wateringSchedule: document.getElementById("wateringSchedule").value.trim() || "N/A",
            pesticideTreatment: document.getElementById("pesticideTreatment").value.trim() || "N/A",
            harvestDate: document.getElementById("harvestDate").value || "N/A",
            plantingStage: document.getElementById("plantingStage").value.trim() || "N/A",
        };

        console.log("Saving record:", newRecord);

        // Save the new record to cropRecords
        cropRecords.push(newRecord);
        localStorage.setItem("cropRecords", JSON.stringify(cropRecords));

        // Update cropData for the chart
        let storedData = JSON.parse(localStorage.getItem("cropData")) || {};
        let cropType = newRecord.cropType;
        if (cropType) {
            storedData[cropType] = (storedData[cropType] || 0) + 1;
            localStorage.setItem("cropData", JSON.stringify(storedData));
        }
        form.reset();
        window.location.href = "crop_chart.html";
    });
});