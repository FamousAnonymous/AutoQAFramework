import { Page, BrowserContext, Locator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly BOOKS_SEARCH_BOX: Locator;
    readonly LOGIN_ERROR_MESSAGE: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = page.getByPlaceholder('UserName');
        this.PASSWORD_EDITBOX = page.getByPlaceholder('Password');
        this.LOGIN_BUTTON = page.getByRole('button', { name: 'Login' });
        this.BOOKS_SEARCH_BOX = page.getByPlaceholder('Type to search');
        this.LOGIN_ERROR_MESSAGE = page.getByText('Invalid username or password!');
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    async navigateToPath(path: string): Promise<void> {
        await this.page.goto("/" + path);
    }l̥

    async clickOnLoginMainButton(): Promise<void> {
        await this.LOGIN_BUTTON.click();
    }

    async loginToApplication(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testConfig.username);
        await this.PASSWORD_EDITBOX.fill(decipherPassword);
        await this.LOGIN_BUTTON.click();
    }

    async loginWithCredentials(username: string, password: string): Promise<void> {
        await this.USERNAME_EDITBOX.fill(username);
        await this.PASSWORD_EDITBOX.fill(password);
        await this.LOGIN_BUTTON.click();
    }

    async validateEmptyUsername(): Promise<string> {
        await this.USERNAME_EDITBOX.fill('');
        await this.PASSWORD_EDITBOX.fill('');
        await this.LOGIN_BUTTON.click();

        return this.USERNAME_EDITBOX.evaluate((element) => (element as HTMLInputElement).validationMessage);
    }

}
