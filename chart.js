// Global functions for CRUD operations
function editRecord(index) {
    let livestockRecords = JSON.parse(localStorage.getItem("livestockRecords")) || [];
    let record = livestockRecords[index];
    let newAnimalType = prompt("Enter new Animal Type", record.animalType);
    let newDob = prompt("Enter new Date of Birth", record.dob);
    let newHealthStatus = prompt("Enter new Health Status", record.healthStatus);
    let newVaccinationStatus = prompt("Enter new Vaccination Status", record.vaccinationStatus);
    let newProductionOutput = prompt("Enter new Production Output", record.productionOutput);
    let newFeedingSchedule = prompt("Enter new Feeding Schedule", record.feedingSchedule);

    if (newAnimalType && newDob && newHealthStatus && newVaccinationStatus && newProductionOutput && newFeedingSchedule) {
        livestockRecords[index] = {
            animalType: newAnimalType,
            dob: newDob,
            healthStatus: newHealthStatus,
            vaccinationStatus: newVaccinationStatus,
            productionOutput: newProductionOutput,
            feedingSchedule: newFeedingSchedule
        };
        localStorage.setItem("livestockRecords", JSON.stringify(livestockRecords));
        updateTable();
    }
}

function deleteRecord(index) {
    let livestockRecords = JSON.parse(localStorage.getItem("livestockRecords")) || [];
    if (confirm("Are you sure you want to delete this record?")) {
        livestockRecords.splice(index, 1);
        localStorage.setItem("livestockRecords", JSON.stringify(livestockRecords));
        updateTable();
    }
}

// Function to update the table
function updateTable() {
    const tableBody = document.getElementById("livestockTableBody");
    let livestockRecords = JSON.parse(localStorage.getItem("livestockRecords")) || [];
    tableBody.innerHTML = "";

    livestockRecords.forEach((record, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${record.animalType}</td>
            <td>${record.dob}</td>
            <td>${record.healthStatus}</td>
            <td>${record.vaccinationStatus}</td>
            <td>${record.productionOutput}</td>
            <td>${record.feedingSchedule}</td>
            <td>
                <button class="edit-btn" onclick="editRecord(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRecord(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("downloadCSV");
    updateTable();

    // Download CSV 
    function downloadCSV() {
        let livestockRecords = JSON.parse(localStorage.getItem("livestockRecords")) || [];
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "S/N,Animal Type,Date of Birth,Health Status,Vaccination Status,Production Output,Feeding Schedule\n";

        livestockRecords.forEach((record, index) => {
            csvContent += `${index + 1},${record.animalType},${record.dob},${record.healthStatus},${record.vaccinationStatus},${record.productionOutput},${record.feedingSchedule}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "livestock_records.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadBtn.addEventListener("click", downloadCSV);
    window.addEventListener("resize", updateTable);
});

// Bar Chart
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("animalChart").getContext("2d");

    let storedData = JSON.parse(localStorage.getItem("productionData")) || {};
    let labels = Object.keys(storedData);
    let values = Object.values(storedData);

    if (labels.length === 0) {
        alert("No data available. Please add livestock first.");
        return;
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Production Count",
                data: values,
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(153, 102, 255, 0.6)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
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