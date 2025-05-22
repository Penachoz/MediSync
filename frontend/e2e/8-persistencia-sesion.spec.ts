import { test, expect } from '@playwright/test';

test('La sesión de admin persiste al refrescar la página', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Correo"]', 'admin@secreto.com');
  await page.fill('input[placeholder="Contraseña"]', '123456');
  await page.click('button:has-text("Iniciar Sesión")');
  
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.locator('h2:has-text("Registro (Solo Admin)")')).toBeVisible();

  await page.reload();

  await expect(page).toHaveURL(/\/register$/, { timeout: 10000 }); // ✅ URL correcta
  await expect(page.locator('button:has-text("Cerrar sesión")')).toBeVisible(); // ✅ Botón de logout
});