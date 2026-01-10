//playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests', // Indica donde estan sus pruebas
    fullyParallel: true,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        screenshot: 'on',
        video: 'on', // para tener evidencia de lo que haga en Buk
    },
    projects: [
        {
            name: 'chromium', // Navegador que se utilizara
            use: { ...devices['Desktop Chrome']}, // dispositivo a usar
        },
    ],
});