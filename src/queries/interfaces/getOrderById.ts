import Order from '../../business/models/order'

export default interface GetOrderById {
  execute(orderId: string): Promise<Order>;
}
