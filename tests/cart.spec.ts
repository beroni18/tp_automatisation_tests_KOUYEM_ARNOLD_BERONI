import { test, expect } from '@playwright/test';

test('Ajouter un article aléatoire au panier ', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');

  const products = await page.$$('img.style_card_body_img__mkV1D');

  expect(products.length).toBeGreaterThan(0);

  const randomProduct = products[Math.floor(Math.random() * products.length)];

  await randomProduct.click();

  await page.waitForLoadState('networkidle');

 
  await page.waitForSelector('button:has-text("Ajouter au panier")');
  await page.click('button:has-text("Ajouter au panier")');

  await page.waitForTimeout(1000);

  await page.waitForSelector('#style_content_cart_wrapper__mqNbf');
  await page.click('#style_content_cart_wrapper__mqNbf');

  await page.waitForSelector('.ant-drawer-body');

  await page.waitForSelector('#style_btn_cart__zrT9Q');
  await page.click('#style_btn_cart__zrT9Q');
  const popupConnexion = await page.locator('.ant-modal-content').isVisible();

  if (popupConnexion) {
    await page.waitForSelector('#email_login');
    const email = 'loicfranceb@gmail.com'; 
    await page.fill('#email_login', email);

    expect(await page.inputValue('#email_login')).toBe(email);

    await page.waitForSelector('#password_login');
    const password = 'Balo14723'; 
    await page.fill('#password_login', password);
    expect(await page.inputValue('#password_login')).toBe(password);

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle');
    console.log('Connexion réussie !');
    console.log('🔒 Pop-up de connexion détectée !');
  }

});
