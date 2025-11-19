import { type Locator, type Page } from '@playwright/test';
export class ShoppingCart {
    readonly shoppingCart: Locator;
    readonly shoppingCartCount: Locator;
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('[id=shopping_cart_container]');
        this.shoppingCartCount = page.locator('[data-test=shopping-cart-badge]');
    }

    async getItemsAddedToCart(): Promise<number> {
        const count = await this.shoppingCartCount.allInnerTexts();
        return Number.parseInt(count[0]);
    }

    async clickShoppingCart() {
        await this.shoppingCart.click();
    }
}