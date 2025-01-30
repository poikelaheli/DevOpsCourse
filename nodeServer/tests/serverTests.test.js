const request = require('supertest');
const app = require('../App');

jest.setTimeout(7000);

describe('GET /request', () => {
    it('responds with text data', async() => {
        request(app)
            .get('/request')
            .expect('Content-Type', /text/)
            .expect(200, );
    });
});

describe('PUT /state', () => {
    it('responds with status change message', () => {
        request(app)
            .put('/state')
            .expect('INIT')
    });
    it('responds with status change message', () => {
        request(app)
            .put('/state')
            .send('PAUSED')
            .expect('State has been updated. New state: PAUSED')
    });
    it('responds with status change message', () => {
        request(app)
            .put('/state')
            .send('RUNNING')
            .expect('State has been updated. New state: RUNNING')
    });
    it('responds with status change message', () => {
        request(app)
            .put('/state')
            .send('INIT')
            .expect('State has been updated. New state: INIT')
    });
    it('responds with status change message', () => {
        request(app)
            .put('/state')
            .send('SHUTDOWN')
            .expect('State has been updated. New state: SHUTDOWN')
    });
});