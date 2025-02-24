document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("cropTableBody");
    let cropRecords = JSON.parse(localStorage.getItem("cropRecords")) || [];

    console.log("Loaded crop records:", cropRecords);

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
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

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
