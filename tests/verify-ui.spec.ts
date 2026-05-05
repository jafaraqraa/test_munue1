import { test, expect } from '@playwright/test';

test('verify restaurant menu landing page and cart drawer', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173');

  // Check header
  await expect(page.getByText('Gourmet Hub')).toBeVisible();

  // Test adding to cart
  const plusButtons = page.locator('button').filter({ has: page.locator('svg.lucide-plus') });
  await plusButtons.first().click();

  // Check floating cart button
  const floatingCart = page.locator('button').filter({ has: page.locator('svg.lucide-shopping-cart') }).last();
  await expect(floatingCart).toBeVisible();

  // Open cart drawer
  await floatingCart.click();
  await expect(page.getByText('Your Order')).toBeVisible();
  await expect(page.getByText('Truffle Glazed Burger').first()).toBeVisible();

  // Close drawer
  await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).click();
  await page.waitForTimeout(500);

  // Switch language to Arabic (now that drawer is closed and overlay is gone)
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.getByText('جورميه هاب')).toBeVisible();

  // Open cart drawer again in Arabic
  await floatingCart.click();
  await expect(page.getByText('طلباتك')).toBeVisible();
  await expect(page.getByText('برجر ترافل جليزد').first()).toBeVisible();

  // Take screenshot for final verification
  await page.screenshot({ path: 'final_screenshot.png', fullPage: true });
});
