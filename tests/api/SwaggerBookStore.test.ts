import { test, expect } from '@playwright/test';

test(`Get all books from Swagger Book Store API`, { tag: '@Swagger' }, async ({ request }) => {
    const response = await request.get(`/BookStore/v1/Books`);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(Array.isArray(responseBody.books)).toBe(true);
    expect(responseBody.books.length).toBeGreaterThan(0);
    expect(responseBody.books[0]).toEqual(expect.objectContaining({
        isbn: expect.any(String),
        title: expect.any(String),
        author: expect.any(String),
    }));
});

test(`Get a book by ISBN from Swagger Book Store API`, { tag: '@Swagger' }, async ({ request }) => {
    const response = await request.get(
        `/BookStore/v1/Book?ISBN=9781449325862`
    );

    expect(response.status()).toBe(200);
    await expect(response).toBeOK();
    expect(response.headers()[`content-type`]).toMatch(/json/i);

    const responseBody = await response.json();
    expect(responseBody).toEqual(expect.objectContaining({
        isbn: `9781449325862`,
        title: `Git Pocket Guide`,
        author: `Richard E. Silverman`,
    }));
});

test(`Reject an invalid ISBN in Swagger Book Store API`, { tag: '@Swagger' }, async ({ request }) => {
    const response = await request.get(
        `/BookStore/v1/Book?ISBN=invalid-isbn`
    );

    expect(response.status()).toBe(400);
});

test(`Manage books for a temporary Swagger user`, { tag: '@Swagger' }, async ({ request }) => {
    const credentials = {
        userName: `autoqa_temp_${Date.now()}`,
        password: `AutoQA@2026!Temp`,
    };
    let userId: string | undefined;
    let token: string | undefined;
    let bookAdded = false;
    const isbn = `9781449325862`;

    try {
        const registerResponse = await request.post(
            `/Account/v1/User`,
            { data: credentials }
        );
        expect(registerResponse.status()).toBe(201);
        userId = (await registerResponse.json()).userID;
        expect(userId).toEqual(expect.any(String));

        const tokenResponse = await request.post(
            `/Account/v1/GenerateToken`,
            { data: credentials }
        );
        expect(tokenResponse.status()).toBe(200);
        const tokenBody = await tokenResponse.json();
        expect(tokenBody.status).toBe(`Success`);
        token = tokenBody.token;
        expect(token).toEqual(expect.any(String));

        const authorizationHeaders = { Authorization: `Bearer ${token}` };
        const authorizedResponse = await request.post(
            `/Account/v1/Authorized`,
            { data: credentials, headers: authorizationHeaders }
        );
        expect(authorizedResponse.status()).toBe(200);
        expect(await authorizedResponse.json()).toBe(true);

        const addBookResponse = await request.post(
            `/BookStore/v1/Books`,
            {
                data: {
                    userId,
                    collectionOfIsbns: [{ isbn }],
                },
                headers: authorizationHeaders,
            }
        );
        expect(addBookResponse.status()).toBe(201);
        bookAdded = true;

        const userResponse = await request.get(
            `/Account/v1/User/${userId}`,
            { headers: authorizationHeaders }
        );
        expect(userResponse.status()).toBe(200);
        const userBody = await userResponse.json();
        expect(userBody).toEqual(expect.objectContaining({
            userId,
            username: credentials.userName,
        }));
        expect(userBody.books).toEqual(
            expect.arrayContaining([expect.objectContaining({ isbn })])
        );
    } finally {
        if (userId && token) {
            const authorizationHeaders = { Authorization: `Bearer ${token}` };

            if (bookAdded) {
                const deleteBookResponse = await request.delete(
                    `/BookStore/v1/Book`,
                    {
                        data: { isbn, userId },
                        headers: authorizationHeaders,
                    }
                );
                await expect(deleteBookResponse).toBeOK();
            }

            const deleteUserResponse = await request.delete(
                `/Account/v1/User/${userId}`,
                { headers: authorizationHeaders }
            );
            await expect(deleteUserResponse).toBeOK();
        }
    }
});
