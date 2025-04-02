import { test, expect } from '@playwright/test';

const generateRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `user_${randomString}@test.com`;
};

const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$_';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

test('Inscription sur Ztrain', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');
  
  await page.click('span[role="img"][aria-label="user"]');

  await page.waitForSelector('button[role="tab"]:has-text("Inscription")');
  await page.click('button[role="tab"]:has-text("Inscription")');

  const email = generateRandomEmail();
  const password = generateRandomPassword();

  console.log(`📧 Email généré : ${email}`);
  console.log(`🔑 Mot de passe généré : ${password}`);

  await page.fill('#email_register', email);
  await page.fill('#password_register', password);
  await page.fill('#confirm_password_register', password);

  expect(await page.inputValue('#email_register')).toBe(email);
  expect(await page.inputValue('#password_register')).toBe(password);
  expect(await page.inputValue('#confirm_password_register')).toBe(password);

  await page.waitForSelector('#btn_register');
  await page.click('#btn_register');

  await page.waitForTimeout(2000);

  console.log('✅ Inscription complétée avec succès !');

  
});
