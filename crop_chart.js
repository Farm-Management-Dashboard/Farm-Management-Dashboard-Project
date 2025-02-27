document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("cropTableBody");
    let cropRecords = JSON.parse(localStorage.getItem("cropRecords")) || [];

    function updateTable() {
        tableBody.innerHTML = "";

        if (cropRecords.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="10">No crop records found.</td></tr>`;
            return;
        }

        cropRecords.forEach((record, index) => {
            let row = `<tr>
                <td>${index + 1}</td>
                <td>${record.cropName || "N/A"}</td>
                <td>${record.cropType || "N/A"}</td>
                <td>${record.plantedDate || "N/A"}</td>
                <td>${record.fertilizer || "N/A"}</td>
                <td>${record.wateringSchedule || "N/A"}</td>
                <td>${record.pesticideTreatment || "N/A"}</td>
                <td>${record.harvestDate || "N/A"}</td>
                <td>${record.plantingStage || "N/A"}</td>
                <td>
                    <button class="edit-btn" onclick="editCropRecord(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteCropRecord(${index})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    window.editCropRecord = function (index) {
        let record = cropRecords[index];
        let newCropName = prompt("Enter new Crop Name", record.cropName);
        let newCropType = prompt("Enter new Crop Type", record.cropType);
        let newPlantedDate = prompt("Enter new Planted Date", record.plantedDate);
        let newFertilizer = prompt("Enter new Fertilizer Used", record.fertilizer);
        let newWateringSchedule = prompt("Enter new Watering Schedule", record.wateringSchedule);
        let newPesticideTreatment = prompt("Enter new Pesticide Treatment", record.pesticideTreatment);
        let newHarvestDate = prompt("Enter new Expected Harvest Date", record.harvestDate);
        let newPlantingStage = prompt("Enter new Planting Stage", record.plantingStage);

        if (newCropName && newCropType && newPlantedDate && newFertilizer && newWateringSchedule && newPesticideTreatment && newHarvestDate && newPlantingStage) {
            cropRecords[index] = {
                cropName: newCropName,
                cropType: newCropType,
                plantedDate: newPlantedDate,
                fertilizer: newFertilizer,
                wateringSchedule: newWateringSchedule,
                pesticideTreatment: newPesticideTreatment,
                harvestDate: newHarvestDate,
                plantingStage: newPlantingStage
            };
            localStorage.setItem("cropRecords", JSON.stringify(cropRecords));
            updateTable();
        }
    };

    window.deleteCropRecord = function (index) {
        if (confirm("Are you sure you want to delete this crop record?")) {
            cropRecords.splice(index, 1);
            localStorage.setItem("cropRecords", JSON.stringify(cropRecords));
            updateTable();
        }
    };

    updateTable();
});


document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("downloadCSV");

    if (downloadButton) {
        downloadButton.addEventListener("click", function () {
            let cropRecords = JSON.parse(localStorage.getItem("cropRecords")) || [];

            if (cropRecords.length === 0) {
                alert("No crop records available to download.");
                return;
            }

            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "S/N,Crop Name,Crop Type,Planted Date,Fertilizer Used,Watering Schedule,Pesticide Treatment,Expected Harvest Date,Planting Stage\n";

            cropRecords.forEach((record, index) => {
                let row = [
                    index + 1,
                    record.cropName || "N/A",
                    record.cropType || "N/A",
                    record.plantedDate || "N/A",
                    record.fertilizer || "N/A",
                    record.wateringSchedule || "N/A",
                    record.pesticideTreatment || "N/A",
                    record.harvestDate || "N/A",
                    record.plantingStage || "N/A"
                ].join(",");
                csvContent += row + "\n";
            });

            let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "crop_records.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("cropChart").getContext("2d");

    let storedData = JSON.parse(localStorage.getItem("cropData")) || {};
    let labels = Object.keys(storedData);
    let values = Object.values(storedData);

    if (labels.length === 0) {
        alert("No crop data available. Please add crops first.");
        return;
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Crop Count",
                data: values,
                backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(153, 102, 255, 0.6)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
