import { test, expect } from '@playwright/test';

test('Muestra error al iniciar sesión con credenciales inválidas', async ({ page }) => {
  const randomEmail = `test${Math.floor(Math.random() * 10000)}@fake.com`;
  const randomPassword = `invalid${Math.floor(Math.random() * 1000)}`;

  await page.goto('/');
  
  await page.fill('input[placeholder="Correo"]', randomEmail);
  await page.fill('input[placeholder="Contraseña"]', randomPassword);
  
  await page.click('button:has-text("Iniciar Sesión")');

  const errorMessage = page.locator('text=Correo o contraseña incorrectos.');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toHaveCSS('color', 'rgb(255, 0, 0)'); // Opcional: verificar estilo
});