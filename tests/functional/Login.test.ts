import test from '@lib/BaseTest';
import { expect } from '@playwright/test';



test('Verify the login page loads', { tag: '@Smoke'}, async ({ page, loginPage, webActions }) => {
  await loginPage.navigateToPath('login');

  await expect(page).toHaveURL(/\/login/);
  await expect(loginPage.USERNAME_EDITBOX).toBeVisible();
  await expect(loginPage.PASSWORD_EDITBOX).toBeVisible();
  await expect(loginPage.LOGIN_BUTTON).toBeVisible();
  await expect(page).toHaveTitle('demosite');
});

// We can use Steps like in Cucmber format as shown below

test(`Verify Book Store Login`, { tag: '@Smoke'}, async ({ loginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
    await test.step(`Click on Book Store Application Icon`, async () => {
        await webActions.clickByText('Book Store Application');
    });
    await test.step(`Click on Login button in Main page`, async () => {
        await loginPage.clickOnLoginMainButton();
    });
    await test.step(`Login to Book Store application`, async () => {
        await loginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Profile page`, async () => {
        await expect(loginPage.BOOKS_SEARCH_BOX).toBeVisible();
    });
}); 

test('Verify the login functionality with invalid credentials', async ({ loginPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Book Store Application');
    await loginPage.clickOnLoginMainButton();
    await loginPage.loginWithCredentials('invalid-user@example.com', 'invalid-password');

    await expect(loginPage.LOGIN_ERROR_MESSAGE).toBeVisible();
});

test('Verify the login functionality with empty credentials', async ({ loginPage, webActions, browserName }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Book Store Application');
    await loginPage.clickOnLoginMainButton();

    const validationMessage = await loginPage.validateEmptyUsername();

    if (browserName === 'webkit') {
        expect(validationMessage).toContain('Fill out this field');
    } else {
        expect(validationMessage).toBe('Please fill out this field.');
    }
});
