console.log("script.js loaded successfully");

// 1. SCAN FUNCTION (Stays the same)
function scanQR() {
    const qrReader = new Html5Qrcode("qr-reader");
    qrReader.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            const location = decodedText.trim().toUpperCase();
            document.getElementById("currentLocation").innerText = location;
            qrReader.stop().then(() => alert("Location Detected: " + location));
        },
        (error) => { }
    );
}

// 2. DIRECTION LOGIC (Now uses the External Database)
async function getDirections() {
    const destination = document.getElementById("destination").value;
    const currentLoc = document.getElementById("currentLocation").innerText; 
    const result = document.getElementById("result");

    if (currentLoc === "Not detected" || !destination) {
        result.innerHTML = `<p style="text-align:center; color:#666;">Scan QR and select destination.</p>`;
        return;
    }

    try {
        // Fetch the external JSON database
        const response = await fetch('routes.json');
        const navigationMap = await response.json();

        const routeKey = `${currentLoc}-${destination}`;
        const routeData = navigationMap[routeKey];

        if (routeData) {
            // Keep the EXACT formatting with icons you liked
            result.innerHTML = `
                <strong>From:</strong> ${currentLoc}<br>
                <strong>To:</strong> ${destination}<br><br>
                <strong>🧭 Path:</strong> ${routeData.path}<br><br>
                <strong>🚶 Instructions:</strong> ${routeData.instructions}<br><br>
                <strong>📏 Distance:</strong> ${routeData.distance}<br>
                <strong>⏱️ Estimated Time:</strong> ${routeData.time}
            `;
        } else {
            result.innerHTML = `
                <strong>From:</strong> ${currentLoc}<br>
                <strong>To:</strong> ${destination}<br><br>
                <p>🧭 <strong>Path:</strong> ${currentLoc} → Main Path → ${destination}</p><br>
                <p style="color: #555;">Route details are currently being updated in the database.</p>
            `;
        }
    } catch (error) {
        console.error("Database Error:", error);
        result.innerHTML = "Error: Could not load navigation database.";
    }
}