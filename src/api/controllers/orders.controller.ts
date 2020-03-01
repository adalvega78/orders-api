import { NextFunction, Request, Response } from 'express';
import Factory from '../factory';
import CreateOrderCommand from '../../business/orders/commands/createOrderCommand';
import OrderNotFoundException from '../../queries/orders/exceptions/orderNotFoundException';
import OrderQuery from 'queries/orders/models/orderQuery';
import RequestValidator from '../middlewares/requestValidator';

class OrdersController {

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const orderId: string = req.params.id;
    let findOrderById = Factory.FindByOrderId();
    await findOrderById.execute(orderId)
      .then((order: OrderQuery) => {
        res.status(200).json({ data: order, message: 'findOne' });
      })
      .catch((error: OrderNotFoundException) => {
        res.status(404).json({ data: error, message: error.message });
      })
      .catch((error: Error) => {
        next(error);
      });
  }

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const createOrderCommand: CreateOrderCommand = req.body;
    try {
      RequestValidator.Validate(createOrderCommand);
      let placeOrder = Factory.PlaceOrder();
      const orderCreated = await placeOrder.execute(createOrderCommand);
      res.status(201).json({ data: orderCreated, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

}

export default OrdersController;
