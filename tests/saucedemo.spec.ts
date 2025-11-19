import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../poms/login';
import { SwagLabs } from '../poms/swag-labs';
import { Cart } from '../poms/cart';

// Extend login test by providing a "loginPage" fixture.
const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  
    const currentPage = new SwagLabs(loginPage.page);
    // Assert successful login:
    await expect(currentPage.page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
    await use(loginPage);
  },
});

test('add_items_to_cart_and_checkout', async ({ loginPage }) => {

  const currentPage = new SwagLabs(loginPage.page);
  // Assert successful login:
  await expect(currentPage.page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
  const itemsAdded = await verifyItemsAddedMatchShoppingCartNumber(currentPage, 3);
  await currentPage.pageShoppingCart.clickShoppingCart();
  // Assert successful move to checkout page:
  await expect(currentPage.page).toHaveURL('https://www.saucedemo.com/cart.html'); 
  const checkoutPage = new Cart(currentPage.page);
  checkoutPage.verifyItemAddedToCart(itemsAdded);
  checkoutPage.clickCheckoutButton();
  await checkoutPage.page.waitForTimeout(5000); //explicit wait for this page since loading takes a little longer
  // Assert successful move to signin page:
  await expect(checkoutPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html'); 
});

async function verifyItemsAddedMatchShoppingCartNumber(currentPage: SwagLabs, items: number): Promise<Map<string, string>> {
  let itemsAdded: Map<string, string> = new Map<string, string>();
  //loop though each item added and verify name and price added
  for (let i = 0; i < items; i++) {
    const item = await currentPage.AddItem(i);
    itemsAdded.set(item[0], item[1]);
  }
  const shoppingCartCount = await currentPage.pageShoppingCart.getItemsAddedToCart();
  expect(itemsAdded.size).toEqual(shoppingCartCount);
  return itemsAdded;
}
