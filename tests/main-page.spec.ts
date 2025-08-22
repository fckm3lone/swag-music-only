import { test, expect } from '@playwright/test';

const MAIN_URL = 'http://localhost:3000/';

test.describe('Main Page Responsive UI', () => {
  test('Desktop: filters and categories are visible, grid has 6 columns', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(MAIN_URL);
    // Категории и фильтры видимы
    await expect(page.getByText('Brands')).toBeVisible();
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    // Drawer-триггер скрыт
    await expect(page.getByRole('button', { name: /Фильтры и категории/i })).toBeHidden();
    // Сетка товаров: 6 колонок
    const grid = page.locator('div.grid');
    await expect(grid).toHaveClass(/grid-cols-6/);
  });

  test('Mobile: filters and categories hidden, accessible via Drawer, grid has 2 columns and centered', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.goto(MAIN_URL);
    // Категории и фильтры скрыты
    await expect(page.getByText('Brands')).toBeHidden();
    await expect(page.getByRole('button', { name: 'All' })).toBeHidden();
    // Drawer-триггер видим
    const drawerBtn = page.getByRole('button', { name: /Фильтры и категории/i });
    await expect(drawerBtn).toBeVisible();
    // Открыть Drawer
    await drawerBtn.click();
    // В Drawer видны фильтры и категории
    await expect(page.getByText('Brands')).toBeVisible();
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    // Сетка товаров: 2 колонки
    const grid = page.locator('div.grid');
    await expect(grid).toHaveClass(/grid-cols-2/);
    // Проверить, что грид центрирован (margin auto)
    const gridBox = await grid.boundingBox();
    expect(gridBox.x).toBeGreaterThan(0);
  });
}); 