import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test(`Verify Book Store login page`, { tag: '@Smoke' }, async ({ loginPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Book Store Application');
    await loginPage.clickOnLoginMainButton();

    await expect(loginPage.USERNAME_EDITBOX).toBeVisible();
    await expect(loginPage.PASSWORD_EDITBOX).toBeVisible();
    await expect(loginPage.LOGIN_BUTTON).toBeVisible();
});

test(`Verify Book Store Login`, { tag: '@Smoke' }, async ({ loginPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Book Store Application');
    await loginPage.clickOnLoginMainButton();
    await loginPage.loginToApplication();

    await expect(loginPage.BOOKS_SEARCH_BOX).toBeVisible();
});
