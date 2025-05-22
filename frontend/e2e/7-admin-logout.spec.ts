import { test, expect } from '@playwright/test';

test('Admin cierra sesión y redirige al login', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Correo"]', 'admin@secreto.com');
  await page.fill('input[placeholder="Contraseña"]', '123456');
  await page.click('button:has-text("Iniciar Sesión")');
  
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.locator('h2:has-text("Registro (Solo Admin)")')).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/login$/),
    page.click('button:has-text("Cerrar sesión")')
  ]);

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator('.login-box h2:has-text("Iniciar Sesión")')).toBeVisible();
});