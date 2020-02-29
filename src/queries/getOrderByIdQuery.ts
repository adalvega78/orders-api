import GetOrderById from './getOrderById';
import OrderRepository from '../repositories/schema/orderRepository.schema'
import Order from '../business/models/order'

class GetOrderByIdQuery implements GetOrderById {
  async execute(orderId: string): Promise<Order> {
    return await OrderRepository.findById(orderId);
  }
}
export default GetOrderByIdQuery