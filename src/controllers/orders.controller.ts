import { NextFunction, Request, Response } from 'express';
import OrderDto from '../application/usecases/orders/dto/orderDto';
import ActionsFactory from './actionsFactory';

class OrdersController {

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const orderId: string = req.params.id;

    try {
      let findOrderById = ActionsFactory.FindByOrderId();
      await findOrderById.execute(orderId)
      .then(function(order: OrderDto) {
        res.status(200).json({ data: order, message: 'findOne' });
      })
      .catch(function(err: Error) {
        res.status(404).json({ data: err, message: err.message });
      });
    } catch(error) {
      next(error)
    }
  }

  // public createOrder = async (req: Request, res: Response, next: NextFunction) => {
  //   const userData: CreateUserDto = req.body;

  //   try {
  //     const createUserData: User = await this.userService.createUser(userData);
  //     res.status(201).json({ data: createUserData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

}

export default OrdersController;
