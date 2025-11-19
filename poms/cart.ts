import { expect, type Locator, type Page } from '@playwright/test';
import { ShoppingCart } from '../shared/shopping-cart';
export class Cart {
    readonly pageShoppingCart: ShoppingCart;
    readonly page: Page;
    readonly checkoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.pageShoppingCart = new ShoppingCart(page);
        this.checkoutButton = page.locator('[id=checkout]');
    }

    async verifyItemAddedToCart(itemsAdded: Map<string, string>): Promise<boolean> {
        let count = 0;
        for (const [name, price] of itemsAdded.entries()) {
            console.log(name + ' : ' + price);
        }
        for (const [name, price] of itemsAdded.entries()) {
            const item = this.page.locator('[data-test="inventory-item-name"]').nth(count);
            const itemName = await item.allInnerTexts();
            expect(itemName[0]).toBe(name);
            const priceArray = this.page.locator('[data-test=inventory-item-price]').nth(count++);
            const currentPrice: string[] = await priceArray.allInnerTexts();
            expect(currentPrice[0]).toBe(price);
        }

        return true;
    }

    async clickCheckoutButton() {
        this.checkoutButton.click();
    }
}