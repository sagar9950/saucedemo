import { expect, type Locator, type Page } from '@playwright/test';
export class LoginPage {
    readonly page: Page;
    readonly usernameBox: Locator;
    readonly passwordBox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameBox = page.locator('[id=user-name]');
        this.passwordBox = page.locator('[id=password]');
        this.loginButton = page.locator('[id=login-button]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
        expect(this.page).toHaveURL('https://www.saucedemo.com/');
        await expect(this.page.getByText('Swag Labs')).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.usernameBox.fill(username);
        await this.passwordBox.fill(password);
        await this.loginButton.click();
    }
}