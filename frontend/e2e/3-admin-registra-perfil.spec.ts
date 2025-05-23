import { test, expect } from '@playwright/test';

test('Admin registra nuevo médico de prueba', async ({ page }) => {
  const randomId = Math.floor(Math.random() * 1000);
  const email = `medico.prueba${randomId}@gmail.com`;
  const password = `Medico${randomId}!`;

  await page.goto('/');
  await page.fill('input[placeholder="Correo"]', 'admin@secreto.com');
  await page.fill('input[placeholder="Contraseña"]', '123456');
  await page.click('button:has-text("Iniciar Sesión")');

  await page.fill('input[placeholder="Correo electrónico"]', email);
  await page.fill('input[placeholder="Contraseña"]', password);
  await page.selectOption('select[name="tipo_usuario"]', 'medico'); // 🩺 Cambio clave
  await page.click('button:has-text("Registrar")');

  await expect(page.locator('p.message')).toContainText('Registro exitoso');
});