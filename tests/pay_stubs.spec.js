// tests/pay_stubs.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Manejo robusto de credenciales (Local vs CI/CD)
let localUser;
try { 
    localUser = require('../data/users.json').validUser; 
} catch (e) { 
    localUser = {}; 
}

const USERNAME = process.env.BUK_USER || localUser.username;
const PASSWORD = process.env.BUK_PASSWORD || localUser.password;

test.describe('Flujo de Nómina Buk', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Descarga y verificación de última liquidación', async ({ page }) => {
        // 1. Validación de seguridad inicial
        if (!USERNAME || !PASSWORD) {
            test.skip(!process.env.CI, 'Saltando test: No hay credenciales configuradas');
        }

        // 2. Login y navegación
        await loginPage.login(USERNAME, PASSWORD);
        await loginPage.goToPayStubs();
        
        // 3. Capturar la descarga profesionalmente
        // Aumentamos el timeout a 60s solo para este evento por si el servidor de Buk está lento
        const [ download ] = await Promise.all([
            page.waitForEvent('download', { timeout: 60000 }), 
            loginPage.downloadLastPayStub() 
        ]);

        // 4. Verificación de archivo
        const fileName = download.suggestedFilename();
        console.log(`✅ Archivo detectado en GitHub: ${fileName}`);
        
        // Validamos extensión PDF
        expect(fileName.toLowerCase()).toContain('.pdf');

        // 5. Opcional: Guardar el archivo para que sea parte de las evidencias del reporte
        const downloadPath = `./test-results/downloads/${fileName}`;
        await download.saveAs(downloadPath);
        console.log(`📂 Archivo guardado físicamente en: ${downloadPath}`);
    });
});