document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("livestockTableBody");
    const downloadBtn = document.getElementById("downloadCSV");

    let livestockRecords = JSON.parse(localStorage.getItem("livestockRecords")) || [];

    function updateTable() {
        tableBody.innerHTML = "";

        if (window.innerWidth > 768) {
            // Standard Table Format for Larger Screens
            livestockRecords.forEach((record, index) => {
                let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${record.animalType}</td>
                    <td>${record.dob}</td>
                    <td>${record.healthStatus}</td>
                    <td>${record.vaccinationStatus}</td>
                    <td>${record.productionOutput}</td>
                    <td>${record.feedingSchedule}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        } else {
            // Stacked Format for Mobile Screens
            livestockRecords.forEach((record, index) => {
                let row = `
                <tr>
                    <th rowspan="7">Record ${index + 1}</th>
                </tr>
                <tr><th>Animal Type</th><td>${record.animalType}</td></tr>
                <tr><th>Date of Birth</th><td>${record.dob}</td></tr>
                <tr><th>Health Status</th><td>${record.healthStatus}</td></tr>
                <tr><th>Vaccination Status</th><td>${record.vaccinationStatus}</td></tr>
                <tr><th>Production Output</th><td>${record.productionOutput}</td></tr>
                <tr><th>Feeding Schedule</th><td>${record.feedingSchedule}</td></tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }

    function downloadCSV() {
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
    updateTable();

    // Listen for screen resize to update the table accordingly
    window.addEventListener("resize", updateTable);
});



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
