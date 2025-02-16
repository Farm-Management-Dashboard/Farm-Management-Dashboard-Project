
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let cropType = document.querySelector("select").value;
    if (cropType) {
        let storedData = JSON.parse(localStorage.getItem("cropData")) || {};
        
        storedData[cropType] = (storedData[cropType] || 0) + 1;
        localStorage.setItem("cropData", JSON.stringify(storedData));
        // Redirect to chart page
        window.location.href = "crop_chart.html";
    }
});