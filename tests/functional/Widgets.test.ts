import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

test.beforeEach(async ({ loginPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Widgets');
});

test(`Verify Auto Complete`, { tag: '@Smoke' }, async ({ widgetsPage, webActions }) => {
    await webActions.clickByText('Auto Complete');
    await widgetsPage.enterAutocompleteEditbox('Bl');
    await expect(widgetsPage.BLUE_COLOUR_TEXT).toBeVisible();
});

test(`Verify Tool Tips`, { tag: '@Smoke' }, async ({ widgetsPage, webActions }) => {
    await webActions.clickByText('Tool Tips');
    await widgetsPage.hoverButtonForTooltip();
    await expect(widgetsPage.TOOL_TIP_TEXT).toContainText(`You hovered over the Button`);
});

test(`Verify Select Menu`, { tag: '@Smoke' }, async ({ widgetsPage, webActions }) => {
    await webActions.clickByText('Select Menu');
    await widgetsPage.oldStyleSelectColour('Aqua');
});
