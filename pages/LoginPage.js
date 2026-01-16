// pages/LoginPage.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input#user_email');
        this.nextButton = page.locator('input[value="Next"]'); 
        this.passwordInput = page.locator('input#user_password');
        this.submitButton = page.locator('input[type="submit"]');
        this.myProfileMenu = page.getByRole('link', { name: /My profile/i });
        this.payStubsTab = page.locator('#nav-link-liquidaciones');
        this.benefitsTab = page.getByRole('link', { name: /My benefits/i});
    }

    async navigate() {
        await this.page.goto('/users/sign_in');
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async clickNext() {
        await this.nextButton.click();
    }

    async login(username, password) {
        await this.fillEmail(username);
        await this.clickNext();
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.page.waitForURL(/.*portal/);
    }

    async goToPayStubs() {
        await this.myProfileMenu.click();
        await this.payStubsTab.waitFor({ state: 'visible' });
        await this.payStubsTab.click();
    }

    // --- MÉTODO CORREGIDO ---
    async downloadLastPayStub() {
        await this.page.waitForLoadState('networkidle');
        const payStubLink = this.page.locator('a[data-liquidacion-id]').first();
        await payStubLink.waitFor({ state: 'visible' });
        await payStubLink.dispatchEvent('click');

        const modal = this.page.locator('.modal-content').filter({ visible: true }).first();
        await modal.waitFor({ state: 'visible' });

        const printButton = modal.locator('#print_liquidacion');
        await printButton.waitFor({ state: 'attached' });
        
        // EXPLICACIÓN: En lugar de hacer page.goto (que rompe en CI/CD), 
        // simplemente hacemos click en el botón de impresión.
        // El test (.spec.js) se encargará de capturar la descarga con Promise.all
        await printButton.click();
    }

    async goToBenefits() {
        await this.myProfileMenu.click();
        await this.benefitsTab.waitFor({ state: 'visible'});
        await this.benefitsTab.click();
    }
}
module.exports = { LoginPage };