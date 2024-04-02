import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  // Navegando até a página de login e aguardando todo javascript ser carregado
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  // Navegando até o label e preenchendo com o texto fill
  await page.getByLabel('Seu e-mail').fill('john.doe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  // Após o clique eu espero que na página tenha o seguinte texto
  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail.',
  )

  // E espero que esse texto esteja visível
  await expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais inválidas')

  await expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  await expect(page.url()).toContain('/sign-up')
})
