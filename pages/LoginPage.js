// pages/LoginPage.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#user_email');
        
        // Selector exacto basado en su imagen de inspección
        this.nextButton = page.locator('input[name="commit"][value="Next"]'); 
        
        this.passwordInput = page.locator('#user_password');
        this.loginBtn = page.locator('input[type="submit"]');
    }

    async navigate() { 
        await this.page.goto('https://avattar.buk.cl/users/sign_in');
        await this.emailInput.waitFor({ state: 'visible' });
    }

    async login(user, pass) {
        // 1. Ingresar Email
        await this.emailInput.fill(user);
        
        // 2. Clic en el botón Next (ahora con el selector de su imagen)
        await this.nextButton.click();

        // 3. Esperar a que el campo de password aparezca
        // Agregamos una pequeña espera extra porque Buk tiene una animación de transición
        await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.passwordInput.fill(pass);
        
        // 4. Clic final para entrar
        await this.loginBtn.click();
    }
}
module.exports = { LoginPage };