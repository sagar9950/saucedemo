import { expect, type Locator, type Page } from '@playwright/test';
import { ShoppingCart } from '../shared/shopping-cart';
export class SwagLabs {
    item: Locator;
    readonly page: Page;
    readonly pageShoppingCart : ShoppingCart;
    constructor(page: Page) {
        this.page = page;
        this.pageShoppingCart = new ShoppingCart(page);
    }

    async AddItem(item: number): Promise<string[]> {
        this.item = this.page.locator('[data-test="inventory-list"]').nth(item);
        const itemName = this.page.locator('[data-test=inventory-item-name]').nth(item);
        const name = await itemName.allInnerTexts();
        const nameArr = name[0].split(' ');
        let buttonName : string = '';
        nameArr.forEach((value, index) => {
            buttonName += value.toLowerCase() + '-';
        });
        buttonName = buttonName.substring(0, buttonName.length - 1);
        const currPrice = this.page.locator('[data-test=inventory-item-price]').nth(item);
        const price: string[] = await currPrice.allInnerTexts();
        const currButton = this.page.locator('[id=add-to-cart-' + buttonName + ']');
        await currButton.click();
        return [name[0], price[0]];
    }
}