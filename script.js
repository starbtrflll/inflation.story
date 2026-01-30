// --- 1. CONFIGURING THE MAP (Highcharts) ---
// Note: Using Highcharts because creating a choropleth map in Chart.js is complex.
// Data is based on the 2024 column from your CSV.

const mapData = [
    ['ar', 249.8], // Argentina
    ['kz', 8.7],   // Kazakhstan
    ['at', 3.9],   // Austria
    ['ir', 37.5],  // Iran
    ['us', 3.2],   // USA (Estimated for context)
    ['cn', 0.5],   // China (Estimated)
    ['tr', 64.0],  // Turkey (Estimated high inflation context)
    ['ru', 7.4],   // Russia
    ['de', 3.5]    // Germany
];

Highcharts.mapChart('container-map', {
    chart: {
        map: 'custom/world'
    },
    title: {
        text: ''
    },
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },
    colorAxis: {
        min: 0,
        max: 100, // Cap at 100 so Argentina doesn't skew all colors
        minColor: '#d4edda', // Light Green
        maxColor: '#721c24', // Dark Red
        stops: [
            [0, '#d4edda'],
            [0.1, '#fff3cd'], // Yellowish for moderate
            [0.5, '#f8d7da'], // Reddish
            [1, '#721c24']    // Deep Red
        ]
    },
    series: [{
        data: mapData,
        name: 'Inflation Rate 2024 (%)',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});


// --- 2. CONFIGURING THE BAR CHART (Chart.js) ---
// Comparing Argentina vs Others
const ctxBar = document.getElementById('barChart').getContext('2d');
new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Argentina', 'Iran', 'Kazakhstan', 'Austria'],
        datasets: [{
            label: 'Inflation Rate 2024 (%)',
            data: [249.8, 37.5, 8.7, 3.9], // Data from your CSV
            backgroundColor: [
                '#ff4a4a', // Red for high
                '#ff9f43', 
                '#54a0ff', 
                '#1dd1a1'  // Green for low
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Inflation %'
                }
            }
        }
    }
});


// --- 3. CONFIGURING THE LINE CHART (Chart.js) ---
// Kazakhstan Trend 2020-2024
const ctxLine = document.getElementById('lineChart').getContext('2d');
new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'Kazakhstan Inflation',
            data: [6.8, 8.0, 15.0, 14.6, 8.7], // Data from your CSV
            borderColor: '#2e86de',
            backgroundColor: 'rgba(46, 134, 222, 0.2)',
            borderWidth: 3,
            fill: true,
            tension: 0.3 // Makes the line slightly curved (smooth)
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Rate %' }
            }
        }
    }
});
