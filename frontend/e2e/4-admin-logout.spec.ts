import { test, expect } from '@playwright/test';

test('Admin cierra sesión', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Correo"]', 'admin@secreto.com');
  await page.fill('input[placeholder="Contraseña"]', '123456');
  await page.click('button:has-text("Iniciar Sesión")');

  await page.click('button:has-text("Cerrar sesión")');
  await expect(page).toHaveURL(/\/login$/);
});