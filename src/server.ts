import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import validateEnv from './utils/validateEnv';
import OrdersRoute from './routes/orders.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new OrdersRoute()
]);

app.listen();
