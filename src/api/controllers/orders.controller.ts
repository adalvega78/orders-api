import { NextFunction, Request, Response } from 'express';
import Factory from '../factory';
import CreateOrderCommand from '../../business/orders/commands/createOrderCommand';
import OrderNotFoundException from '../../queries/orders/exceptions/orderNotFoundException';
import OrderQuery from 'queries/orders/models/orderQuery';
import RequestValidator from '../middlewares/requestValidator';

class OrdersController {

  /**
 * GET method route
 * @example http://localhost:PORT/v1/orders/:id
 *
 * @swagger
 * /orders/{id}:
 *  get:
 *    description: Get order by orderId
 *    tags: ["orders"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique orderId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return order by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/OrderSchema'
 */
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

/**
 * POST method route
 * @example http://localhost:PORT/orders
 *
 * @swagger
 * /orders:
 *   post:
 *      description: Create new Order
 *      tags: ["orders"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: order creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateOrderSchema'
 *      responses:
 *        201:
 *          description: return created order id
 *        default:
 *          description: unexpected error
 */
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
