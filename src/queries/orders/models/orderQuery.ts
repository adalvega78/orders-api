import OrderDetailQuery from './orderDetailQuery';

/**
 * @swagger
 * components:
 *  schemas:
 *    OrderSchema:
 *      properties:
 *        id:
 *          type: string
 *        customerId:
 *          type: string
 *        details:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/OrderDetailSchema'
 *        total:
 *          type: number
 */
export default class OrderQuery {
  id: string;
  customerId: string;
  details: Array<OrderDetailQuery>;
  total: number;
}