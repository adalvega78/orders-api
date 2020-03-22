import * as request from 'supertest';
import App from '../../app';
import IndexRoute from '../../api/routes/index.route';

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    xit('response statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      return request(app.getServer())
      .get(`${indexRoute.path}`)
      .expect(200);
    });
  });
});
