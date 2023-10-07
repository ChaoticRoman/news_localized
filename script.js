// script.js

// Sample data
const data = [
    { longitude: -0.127758, latitude: 51.507351, timeFrom: "01:00", timeTo: "04:00", label: "Point 1" },
    { longitude: -74.006, latitude: 40.7128, timeFrom: "03:00", timeTo: "08:00", label: "Point 2" },
    { longitude: -0.127758, latitude: 51.507351, timeFrom: "03:00", timeTo: "04:00", label: "Point 1" },
];

// Initialize map
let map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let currentMarkers = [];

let isPlaying = false;
const timelineSlider = document.getElementById('timelineSlider');
const currentTimeLabel = document.getElementById('currentTime');

timelineSlider.addEventListener('input', (e) => {
    const time = e.target.value;
    currentTimeLabel.textContent = `${time}:00`;
    updateMarkersForTime(time);
});

document.getElementById('playButton').addEventListener('click', () => {
    if (isPlaying) return; // Prevent overlapping intervals
    isPlaying = true;

    const interval = setInterval(() => {
        let time = parseInt(timelineSlider.value);

        if (time >= 24) {
            clearInterval(interval);
            isPlaying = false;
            return;
        }

        time++;
        timelineSlider.value = time;
        currentTimeLabel.textContent = `${time}:00`;

        updateMarkersForTime(time);

    }, 1000); // Adjust this interval for speed of "playback"});
});

function updateMarkersForTime(time) {
    // Clear previous markers
    currentMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    currentMarkers = [];

    // Get points for the current time
    const filteredData = data.filter(d => {
        const fromHour = parseInt(d.timeFrom.split(":")[0]);
        const toHour = parseInt(d.timeTo.split(":")[0]);
        return time >= fromHour && time < toHour;
    });
    
    // Add new markers
    filteredData.forEach(d => {
        let marker = L.marker([d.latitude, d.longitude]).addTo(map);
        marker.bindPopup(d.label).openPopup();
        currentMarkers.push(marker);
    });
}

