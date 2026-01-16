// test/buk_benefits.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { validUser } = require('../data/users.json');
 
test.describe('Busqueda de y Selección de Beneficio', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
        // Hacemos el login de una vez para entrar al modulo
        await loginPage.login(validUser.username, validUser.password);
    });

    test('Visualización del catalogo de beneficios', async ({ page }) => {
        console.log('Navegando al modulo de beneficios...');
        await loginPage.goToBenefits();

        // 1. Validación: Verificamos que la URL cambie a beneficios
        await expect(page).toHaveURL(/.*benefits/i);
 
        console.log('✅ Exito: Modulo de beneficios cargado.');

        // --- SCROLL visual
        // 2. Hacemos scroll hacia abajo para ver las tarjetas de beneficios
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(2000); // Pausa para ver el movimiento

        // 3. Selección de beneficio
        // las tarjetas de beneficios estan en el contenedor principal
        console.log('Eligiendo el primer beneficio disponible...');

        // 3. Buscamos el primer elemento que parezca una tarjeta de beneficio
        const benefitCard = page.locator('.benefit-container-card-panel, .card-panel').first();

        // Esperamos a que la tarjeta aparezca antes de interactuar
        await benefitCard.waitFor({ state: 'visible', timeout: 15000 });

        // Movemos la vista hacia la tarjeta
        await benefitCard.scrollIntoViewIfNeeded();
        // hacemos click en cualquier parte de la tarjeta
        await benefitCard.click();

        // 4. Verificación del Detalle
        // Esperamos que aparezca algo nuevo o que despligue la ventana modal
        console.log('✅ Beneficio seleccionado. Esperando visualización...');
        
        // Pausa visual para que usted vea que hay en la pantalla
        await page.waitForTimeout(5000);
    });
});