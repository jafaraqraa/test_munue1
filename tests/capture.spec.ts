import { test, devices } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 13 size
  await page.goto('http://localhost:5173');
  await page.screenshot({ path: 'en_mobile_top.png' });
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.screenshot({ path: 'en_mobile_middle.png' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: 'en_mobile_bottom.png' });
});
