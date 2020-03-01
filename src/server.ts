import 'dotenv/config';
import App from './app';
import IndexRoute from './api/routes/index.route';
import validateEnv from './utils/validateEnv';
import OrdersRoute from './api/routes/orders.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new OrdersRoute()
]);

app.listen();
