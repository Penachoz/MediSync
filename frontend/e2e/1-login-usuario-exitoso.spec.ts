import { test, expect } from '@playwright/test';

test('Login exitoso como usuario conocido', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Correo"]', 'caro.apache@gmail.com');
  await page.fill('input[placeholder="Contraseña"]', 'caro1234');
  await page.click('button:has-text("Iniciar Sesión")');
  
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.locator('h1')).toContainText('Bienvenido');
});