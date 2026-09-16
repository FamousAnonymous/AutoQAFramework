import { test, expect } from '@playwright/test';
import { APIActions } from '@lib/APIActions';
import mockApiData from '../../utils/api/mockApiData.json';

const apiActions = new APIActions();

test(`Get all employees`, { tag: '@API' }, async ({ request }) => {
    const response = await request.get(`/employees`, {
        headers: apiActions.getReqResHeaders(),
    });

    expect(response.status()).toBe(200);
    const employees = await response.json();
    expect(Array.isArray(employees)).toBe(true);
    expect(employees).toHaveLength(5);
    expect(employees[0]).toEqual(expect.objectContaining({
        id: 1,
        firstName: `John`,
        lastName: `Doe`,
        department: `Engineering`,
    }));
});

test(`Get an employee`, { tag: '@API' }, async ({ request }) => {
    const response = await request.get(`/employees/${mockApiData.employeeIdForGet}`, {
        headers: apiActions.getReqResHeaders(),
    });

    expect(response.status()).toBe(200);
    const employee = await response.json();
    expect(employee).toEqual(expect.objectContaining({
        id: mockApiData.employeeIdForGet,
        firstName: `John`,
        lastName: `Doe`,
        department: `Engineering`,
    }));
});

test(`Create an employee`, { tag: '@API' }, async ({ request }) => {
    let employeeId: number | undefined;

    try {
        const response = await request.post(`/employees`, {
            data: mockApiData.newEmployee,
            headers: apiActions.getReqResHeaders(),
        });

        expect(response.status()).toBe(201);
        const employee = await response.json();
        employeeId = employee.id;
        expect(employee).toEqual(expect.objectContaining(mockApiData.newEmployee));
    } finally {
        if (employeeId !== undefined) {
            await request.delete(`/employees/${employeeId}`, {
                headers: apiActions.getReqResHeaders(),
            });
        }
    }
});

test(`Replace an employee`, { tag: '@API' }, async ({ request }) => {
    let employeeId: number | undefined;

    try {
        const createResponse = await request.post(`/employees`, {
            data: mockApiData.newEmployee,
            headers: apiActions.getReqResHeaders(),
        });
        expect(createResponse.status()).toBe(201);
        employeeId = (await createResponse.json()).id;

        const response = await request.put(`/employees/${employeeId}`, {
            data: mockApiData.putEmployee,
            headers: apiActions.getReqResHeaders(),
        });

        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(expect.objectContaining(mockApiData.putEmployee));
    } finally {
        if (employeeId !== undefined) {
            await request.delete(`/employees/${employeeId}`, {
                headers: apiActions.getReqResHeaders(),
            });
        }
    }
});

test(`Partially update an employee`, { tag: '@API' }, async ({ request }) => {
    let employeeId: number | undefined;

    try {
        const createResponse = await request.post(`/employees`, {
            data: mockApiData.newEmployee,
            headers: apiActions.getReqResHeaders(),
        });
        expect(createResponse.status()).toBe(201);
        employeeId = (await createResponse.json()).id;

        const response = await request.patch(`/employees/${employeeId}`, {
            data: mockApiData.patchEmployee,
            headers: apiActions.getReqResHeaders(),
        });

        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(expect.objectContaining({
            ...mockApiData.newEmployee,
            ...mockApiData.patchEmployee,
        }));
    } finally {
        if (employeeId !== undefined) {
            await request.delete(`/employees/${employeeId}`, {
                headers: apiActions.getReqResHeaders(),
            });
        }
    }
});

test(`Delete an employee`, { tag: '@API' }, async ({ request }) => {
    const createResponse = await request.post(`/employees`, {
        data: mockApiData.newEmployee,
        headers: apiActions.getReqResHeaders(),
    });
    expect(createResponse.status()).toBe(201);
    const employeeId = (await createResponse.json()).id;

    const response = await request.delete(`/employees/${employeeId}`, {
        headers: apiActions.getReqResHeaders(),
    });
    expect([200, 204]).toContain(response.status());

    const getResponse = await request.get(`/employees/${employeeId}`, {
        headers: apiActions.getReqResHeaders(),
    });
    expect(getResponse.status()).toBe(404);
});

test(`Get all departments`, { tag: '@API' }, async ({ request }) => {
    const response = await request.get(`/departments`, {
        headers: apiActions.getReqResHeaders(),
    });

    expect(response.status()).toBe(200);
    const departments = await response.json();
    expect(Array.isArray(departments)).toBe(true);
    expect(departments).toHaveLength(4);
    expect(departments).toEqual(expect.arrayContaining([
        expect.objectContaining({
            id: 1,
            name: `Engineering`,
            manager: `Sarah Connor`,
        }),
    ]));
});

test(`Get all attendance records`, { tag: '@API' }, async ({ request }) => {
    const response = await request.get(`/attendance`, {
        headers: apiActions.getReqResHeaders(),
    });

    expect(response.status()).toBe(200);
    const attendance = await response.json();
    expect(Array.isArray(attendance)).toBe(true);
    expect(attendance).toHaveLength(3);
    expect(attendance).toEqual(expect.arrayContaining([
        expect.objectContaining({
            id: 1,
            employeeId: 1,
            status: `present`,
        }),
    ]));
});
