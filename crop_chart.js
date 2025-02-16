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
