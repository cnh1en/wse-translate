import { test, expect } from './fixtures';
import { ROOT_CONTAINER_ID } from '../../src/lib/constants';

test('popup page', async ({ page }) => {
  await page.goto(`https://www.google.com`);
  await expect(page.locator(`#${ROOT_CONTAINER_ID}`)).toBeDefined();

  const imageBlocks = page.locator('.ext-safe-image');
  for (const imageBlock of await imageBlocks.all()) {
    await expect(imageBlock).toBeVisible();
  }
});
