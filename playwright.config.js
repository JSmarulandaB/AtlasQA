// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    /* Tiempo máximo para que CADA test termine (60 segundos) */
    timeout: 60000, 
    
    /* Ejecución en paralelo */
    fullyParallel: true,
    
    /* Reporte detallado */
    reporter: 'html',

    /* Configuración global */
    use: {
        /* Base URL para simplificar los archivos .spec.js */
        baseURL: 'https://avattar.buk.cl',
        
        /* CLAVE: En CI (GitHub) siempre será true. 
           En tu PC (local) será false (se verá el navegador).
        */
        headless: process.env.CI ? true : false,

        /* Evidencia: Solo capturamos cuando falla para no saturar el servidor */
        trace: 'on-first-retry',
        screenshot: 'only-on-failure', 
        video: 'retain-on-failure', 

        /* Tiempos de espera optimizados */
        actionTimeout: 15000,
        navigationTimeout: 30000,
    },

    /* Navegador y Dispositivo */
    projects: [
        {
            name: 'chromium',
            use: { 
                ...devices['Desktop Chrome'],
                // ELIMINAMOS el headless: false de aquí para que herede el global dinámico
            },
        },
    ],
});