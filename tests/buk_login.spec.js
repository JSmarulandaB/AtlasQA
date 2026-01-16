// tests/buk_login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Intentamos cargar los datos locales, pero si no existen (en GitHub), no romperá el código
let localUser;
try {
    localUser = require('../data/users.json').validUser;
} catch (e) {
    localUser = {};
}

test.describe('Tests Iniciales de Acceso', () => {
    let loginPage;

    // Priorizamos las Variables de Entorno (GitHub Secrets) sobre el archivo local
    const USERNAME = process.env.BUK_USER || localUser.username;
    const PASSWORD = process.env.BUK_PASSWORD || localUser.password;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Test 1: Ingreso de Email y botón Next', async ({ page }) => {
        await loginPage.fillEmail(USERNAME);
        await loginPage.clickNext();
        
        // Espera inteligente en lugar de timeout fijo
        await expect(loginPage.passwordInput).toBeVisible({ timeout: 5000 });
    });

    test('Test 2: Login exitoso hasta el Portal', async ({ page }) => {
        // Validación de seguridad para asegurar que tenemos credenciales
        if (!USERNAME || !PASSWORD) {
            throw new Error("❌ Error: No se encontraron credenciales en Secrets ni en users.json");
        }

        await loginPage.login(USERNAME, PASSWORD);
        
        // Verificación profesional de la URL
        await expect(page).toHaveURL(/.*portal/);
        console.log(`✅ Login exitoso para el usuario: ${USERNAME}`);
    });
});