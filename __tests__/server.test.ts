import { expect, test, describe, afterAll } from 'bun:test';
import { Server } from '../src/config/server';

describe('Testing init server', async() => {
    const server = new Server();
    server.listen();

    const API_URI = 'http://localhost:3300/api/v1/health';
    const result = await fetch(API_URI);
    const toJSON = await result.json();

    afterAll(() => {
        server.close();
    });

    test('Should return server status code 200', () => {
        expect(result.status).toBe(200);
    });

    test('Should return server message', () => {
        expect(toJSON).toEqual({ message: '🤖 -->> Server is up and running' });
    });
});
