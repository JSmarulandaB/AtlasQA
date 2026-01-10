//tests/buk_login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Flujo de Autenticación - Buk Avattar', () =>{
    test('Debe mostrar error de credenciales invalidas', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('jeinner.marulanda@avattar.com', 'Password123!');

        //verificación: El sistema debe permanecer en la pagina de login o mostrar alerta
        // En Buk, si falla, suele aparecer un mensaje de "Email o password invalidos"
        const alert = page.locator('.alert');
        await expect(page).toHaveURL(/sign_in/);
    });
});