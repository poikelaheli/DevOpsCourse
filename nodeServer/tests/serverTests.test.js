const request = require('supertest');
const app = require("../App")

jest.setTimeout(7000);

describe ('Server tests', () => {

    describe('GET /request', () => {
        it('responds with text data', () => {
            return request(app)
                .get('/request')
                .expect('Content-Type', /text/)
                .expect(200);
        });
    });

    describe('GET /state', () => {
        it('responds with current status', () => {
            return request(app)
                .get('/state')
                .expect('INIT');
        });
    })

    describe('PUT /state', () => {
        it('responds with status change message: PAUSED', () => {
            return request(app)
                .put('/state')
                .send('PAUSED')
                .expect('State has been updated. New state: PAUSED');
        });
        it('responds with status change message: RUNNING', () => {
            return request(app)
                .put('/state')
                .send('RUNNING')
                .expect('State has been updated. New state: RUNNING');
        });
        it('responds with status change message: INIT', () => {
            return request(app)
                .put('/state')
                .send('INIT')
                .expect('State has been updated. New state: INIT');
        });
        it('responds with status change message: SHUTDOWN', () => {
            return request(app)
                .put('/state')
                .send('SHUTDOWN')
                .expect('State has been updated. New state: SHUTDOWN');
        });
    });

});