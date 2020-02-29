import { NextFunction, Request, Response } from 'express';
import OrderDto from '../application/usecases/orders/dto/orderDto';
import FindOrderById from '../application/usecases/orders/findOrderById';
import FindOrderByIdAction from '../business/actions/orders/findOrderById';
import GetOrderByIdQuery from '../queries/getOrderByIdQuery';

class OrdersController {

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const orderId: string = req.params.id;

    try {
      let query = new GetOrderByIdQuery();
      let action = new FindOrderByIdAction(query);
      let findOrderById = new FindOrderById(action);
      const findOneOrderData: OrderDto = await findOrderById.execute(orderId);
      res.status(200).json({ data: findOneOrderData, message: 'findOne' });
    } catch (error) {
      next(error);
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
