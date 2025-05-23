import { test, expect } from '@playwright/test';

test('Login con perfil recién creado', async ({ page }) => {
  const randomId = Math.floor(Math.random() * 1000);
  const email = `perfil.prueba${randomId}@gmail.com`;
  const password = `Test${randomId}!`;

  await page.goto('/');
  
  await page.fill('input[placeholder="Correo"]', 'admin@secreto.com');
  await page.fill('input[placeholder="Contraseña"]', '123456');
  await page.click('button:has-text("Iniciar Sesión")');
  await expect(page).toHaveURL(/\/register$/); // ✅ Confirmar redirección
  
  await page.fill('input[placeholder="Correo electrónico"]', email);
  await page.fill('input[placeholder="Contraseña"]', password);
  await page.selectOption('select[name="tipo_usuario"]', 'paciente');
  await page.click('button:has-text("Registrar")');
  
  await expect(page.locator('p.message')).toContainText('Registro exitoso', { timeout: 10000 });
  
  await page.click('button:has-text("Cerrar sesión")');
  await expect(page).toHaveURL(/\/login$/); 

  await page.fill('input[placeholder="Correo"]', email);
  await page.fill('input[placeholder="Contraseña"]', password);
  
  await Promise.all([
    page.waitForNavigation({ url: '**/home' }),
    page.click('button:has-text("Iniciar Sesión")')
  ]);

  await expect(page).toHaveURL(/\/home$/);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Bienvenido');
});