import { test, expect } from '@playwright/test';

test.describe('TodoApp E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should show demo todos on load', async ({ page }) => {
    await expect(page.getByText('Learn TDD with Next.js')).toBeVisible();
    await expect(page.getByText('Write unit tests')).toBeVisible();
    await expect(page.getByText('Write integration tests')).toBeVisible();
    await expect(page.getByText('Write E2E tests')).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    await page.getByPlaceholder('Add a new todo').fill('My new task');
    await page.getByRole('button', { name: /add/i }).click();

    await expect(page.getByText('My new task')).toBeVisible();
  });

  test('should toggle a todo', async ({ page }) => {
    const todo = page.getByText('Learn TDD with Next.js');
    const toggleButton = todo.locator('..').getByTestId('todo-checkbox');

    await toggleButton.click();
    await expect(todo).toHaveClass(/line-through/);

    await toggleButton.click();
    await expect(todo).not.toHaveClass(/line-through/);
  });

  test('should delete a todo', async ({ page }) => {
    const todo = page.getByText('Write unit tests');
    const deleteButton = todo.locator('..').getByTestId('delete-button');

    await deleteButton.click();
    await expect(todo).not.toBeVisible();
  });

  test('should filter todos', async ({ page }) => {
    const todo = page.getByText('Learn TDD with Next.js');
    const toggleButton = todo.locator('..').getByTestId('todo-checkbox');

    await toggleButton.click();
    await page.getByRole('button', { name: /active/i }).click();
    await expect(page.getByText('Learn TDD with Next.js')).not.toBeVisible();

    await page.getByRole('button', { name: /completed/i }).click();
    await expect(page.getByText('Learn TDD with Next.js')).toBeVisible();

    await page.getByRole('button', { name: /all/i }).click();
    await expect(page.getByText('Learn TDD with Next.js')).toBeVisible();
  });
});
