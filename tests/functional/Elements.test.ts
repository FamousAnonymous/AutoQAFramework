import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test.beforeEach(async ({ loginPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Elements');
});

test(`Verify Text Box`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Text Box');
    await elementsPage.enterFullName(`AutoTest`);
    await elementsPage.clickSubmit();
    await expect(elementsPage.SUBMITTED_TEXT).toBeVisible();
});

test(`Verify Check Box`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Check Box');
    await elementsPage.clickHomeCheckBox();
    await expect(elementsPage.HOME_SELECTED_TEXT).toContainText(`home`);
});

test(`Verify Radio Button`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Radio Button');
    await expect(elementsPage.NO_RADIO_BUTTON).toBeDisabled();
});

test(`Verify Web Tables`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Web Tables');
    await expect(elementsPage.WEB_TABLES_HEADER.first()).toHaveText(`First Name`);
    await elementsPage.editCierraEntry();
    await expect(elementsPage.REGISTRATION_FORM_HEADER).toBeVisible();
    await elementsPage.registrationFormClose();
});

test(`Verify Buttons`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Buttons');
    await elementsPage.doubleClickButton();
    await expect(elementsPage.DOUBLE_CLICK_TEXT).toBeVisible();
    await elementsPage.rightClickButton();
    await expect(elementsPage.RIGHT_CLICK_TEXT).toBeVisible();
});

test(`Verify file download`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Upload and Download');
    await elementsPage.downloadFile();
});

test(`Verify file upload`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Upload and Download');
    await elementsPage.uploadFile();
    await expect(elementsPage.UPLOADED_FILE_TEXT).toBeVisible();
});

test(`Verify Home link opens in a new tab`, { tag: '@Smoke' }, async ({ elementsPage, webActions }) => {
    await webActions.clickByText('Links');
    const homePage = await elementsPage.openHomeLinkInNewTab();
    expect(homePage.url()).toBe(`https://demoqa.com/`);
    await homePage.close();
});
