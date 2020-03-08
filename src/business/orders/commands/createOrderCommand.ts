/**
 * @swagger
 * components:
 *  schemas:
 *    CreateOrderSchema:
 *      properties:
 *        customerId:
 *          type: string
 *        details:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateOrderDetailSchema'
 *        total:
 *          type: number
 */
export interface CreateOrderCommand {
  customerId: string;
  details: Array<CreateOrderDetailCommand>;
  total: number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateOrderDetailSchema:
 *      properties:
 *        productId:
 *          type: string
 *        quantity:
 *          type: number
 *        price:
 *          type: number
 */
export interface CreateOrderDetailCommand {
  productId: string;
  quantity: number;
  price: number;
}

export default CreateOrderCommand;