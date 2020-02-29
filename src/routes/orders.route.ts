import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class OrdersRoute implements Route {
  public path = '/users';
  public router = Router();
  public ordersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.ordersController.getOrderById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.ordersController.createOrder);
  }
}

export default OrdersRoute;
