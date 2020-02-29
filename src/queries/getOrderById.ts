import Order from './models/order'

export default interface GetOrderById {
  execute(orderId: string): Promise<Order>;
}
