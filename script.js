// script.js

// Sample data
const data = [
    { longitude: -0.127758, latitude: 51.507351, timeFrom: "00:00", timeTo: "01:00", label: "Point 1" },
    { longitude: -74.006, latitude: 40.7128, timeFrom: "01:00", timeTo: "02:00", label: "Point 2" }
];

// Initialize map
let map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let currentMarkers = [];

document.getElementById('playButton').addEventListener('click', () => {
    let currentTime = 0;
    const interval = setInterval(() => {
        // Clear previous markers
        currentMarkers.forEach(marker => {
            map.removeLayer(marker);
        });
        currentMarkers = [];

        const filteredData = data.filter(d => parseInt(d.timeFrom.split(":")[0]) === currentTime);
        
        // Add new markers
        filteredData.forEach(d => {
            let marker = L.marker([d.latitude, d.longitude]).addTo(map);
            marker.bindPopup(d.label).openPopup();
            currentMarkers.push(marker);
        });
        
        currentTime++;
        if (currentTime > 24) {
            clearInterval(interval);
        }
    }, 1000); // Adjust this interval for speed of "playback"
});
