/**
 * DATA STORY: GLOBAL INFLATION (2020-2024)
 * Professional Script for Milestone 4
 */

// 1. DATA PREPARATION (Based on your CSV file)
const globalInflation2024 = [
    ['ar', 249.79], // Argentina
    ['kz', 8.67],   // Kazakhstan
    ['at', 3.92],   // Austria
    ['au', 3.53],   // Australia
    ['az', 3.54],   // Azerbaijan
    ['ir', 37.50],  // Iran
    ['es', 2.67],   // Spain
    ['it', 1.67],   // Italy
    ['ca', 2.50],   // Canada
    ['us', 3.20],   // USA (Approx)
    ['cn', 0.50]    // China
];

const kzTrend = {
    years: ['2020', '2021', '2022', '2023', '2024'],
    rates: [6.79, 8.00, 14.95, 14.55, 8.67]
};

// 2. INITIALIZE CHARTS ON LOAD
window.onload = function() {
    initMap();
    initBarChart();
    initLineChart();
};

// --- MAP FUNCTION (Highcharts) ---
function initMap() {
    if (typeof Highcharts !== 'undefined' && Highcharts.maps['custom/world']) {
        Highcharts.mapChart('container-map', {
            chart: {
                map: 'custom/world',
                backgroundColor: 'transparent',
                style: { fontFamily: 'Arial' }
            },
            title: { text: '' },
            credits: { enabled: false },
            mapNavigation: {
                enabled: true,
                buttonOptions: { verticalAlign: 'bottom' }
            },
            colorAxis: {
                min: 0,
                max: 40, // Cap color intensity at 40% so Argentina doesn't wash out others
                stops: [
                    [0, '#d4edda'],   // Stable (Green)
                    [0.2, '#fff3cd'], // Moderate (Yellow)
                    [0.5, '#f8d7da'], // High (Orange)
                    [1, '#721c24']    // Critical (Dark Red)
                ]
            },
            series: [{
                data: globalInflation2024,
                name: 'Inflation Rate 2024',
                states: {
                    hover: { color: '#ff4a4a' }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    } else {
        console.error("Highcharts Map Data not found.");
        document.getElementById('container-map').innerHTML = 
            "<p style='padding:20px; color:red;'>Map display error: Make sure you have an active internet connection to load the World Map scripts.</p>";
    }
}

// --- BAR CHART FUNCTION (Chart.js) ---
function initBarChart() {
    const ctx = document.getElementById('barChart');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Argentina', 'Iran', 'Kazakhstan', 'Austria'],
            datasets: [{
                label: 'Inflation Rate 2024 (%)',
                data: [249.79, 37.5, 8.67, 3.92],
                backgroundColor: ['#721c24', '#e67e22', '#3498db', '#2ecc71'],
                borderRadius: 5
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
                    title: { display: true, text: 'Percent (%)' }
                }
            }
        }
    });
}

// --- LINE CHART FUNCTION (Chart.js) ---
function initLineChart() {
    const ctx = document.getElementById('lineChart');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: kzTrend.years,
            datasets: [{
                label: 'Kazakhstan Inflation',
                data: kzTrend.rates,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#2980b9'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    title: { display: true, text: 'Inflation Rate (%)' }
                }
            }
        }
    });
}
