import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import Route from './interfaces/routes.interface';

class OrdersRoute implements Route {
  public path = '/orders';
  public router = Router();
  public ordersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.ordersController.getOrderById);
    this.router.post(`${this.path}`, this.ordersController.createOrder);
  }
}

export default OrdersRoute;
