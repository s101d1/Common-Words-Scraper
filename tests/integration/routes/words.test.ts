import {describe, expect, it, xit} from '@jest/globals';
import app from '../../../app';

const request = require('supertest')

describe('Test words endpoint', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get("/words").query({url: "http://www.example.com/"});
    expect(response.statusCode).toBe(200);
    expect(response.body.domain).toBe(3);
  })
})
