import Order from '../../../business/orders/models/order'

export default interface GetOrderById {
  execute(orderId: string): Promise<Order>;
}
