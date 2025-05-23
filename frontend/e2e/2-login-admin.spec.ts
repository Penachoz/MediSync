import { test, expect } from '@playwright/test';

test('Admin inicia sesión exitosamente', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Correo"]', 'admin@secreto.com');
  await page.fill('input[placeholder="Contraseña"]', '123456');
  await page.click('button:has-text("Iniciar Sesión")');
  
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.locator('h2')).toContainText('Registro');
});