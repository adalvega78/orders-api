/**
 * @swagger
 * components:
 *  schemas:
 *    OrderDetailSchema:
 *      properties:
 *        productId:
 *          type: string
 *        quantity:
 *          type: number
 *        price:
 *          type: number
 */

export default class orderDetailQuery {
  productId: string;
  quantity: number;
  price: number;
}