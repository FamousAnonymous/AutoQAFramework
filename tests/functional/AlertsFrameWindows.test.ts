import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test(`Verify opening a new tab`, { tag: '@Smoke' }, async ({ loginPage, alertsFrameWindowsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Alerts, Frame & Windows');
    await webActions.clickByText('Browser Windows');

    const newTab = await alertsFrameWindowsPage.openNewTab();
    expect(newTab.url()).toBe(`https://demoqa.com/sample`);
    await expect(newTab.locator(`#sampleHeading`)).toContainText(`This is a sample page`);
    await newTab.close();
});

test(`Verify opening a new window`, { tag: '@Smoke' }, async ({ loginPage, alertsFrameWindowsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Alerts, Frame & Windows');
    await webActions.clickByText('Browser Windows');

    const newWindow = await alertsFrameWindowsPage.openNewWindow();
    expect(newWindow.url()).toBe(`https://demoqa.com/sample`);
    await newWindow.close();
});

test(`Verify accepting an alert prompt`, { tag: '@Smoke' }, async ({ loginPage, alertsFrameWindowsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Alerts, Frame & Windows');
    await webActions.clickByText('Alerts');

    await alertsFrameWindowsPage.enterTextAndAccept(`Hello`);
    await expect(alertsFrameWindowsPage.PROMPT_RESULT).toContainText(`You entered Hello`);
});

test(`Verify a frame`, { tag: '@Smoke' }, async ({ loginPage, alertsFrameWindowsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Alerts, Frame & Windows');
    await webActions.clickByText('Frames');

    await expect(alertsFrameWindowsPage.FRAME_LOCATOR).toHaveText(`This is a sample page`);
});

test(`Verify nested frames`, { tag: '@Smoke' }, async ({ loginPage, alertsFrameWindowsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Alerts, Frame & Windows');
    await webActions.clickByText('Nested Frames');

    await expect(alertsFrameWindowsPage.NESTED_CHILDFRAME_LOCATOR).toBeVisible();
});
