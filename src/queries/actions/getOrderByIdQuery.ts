import GetOrderById from '../interfaces/getOrderById';
import OrderRepository from '../../repositories/schema/orderRepository.schema';
import Order from '../../business/models/order';
import OrderNotFoundException from '../exceptions/orderNotFoundException';

class GetOrderByIdQuery implements GetOrderById {
  async execute(orderId: string): Promise<Order> {
    return await OrderRepository.findOne({id: orderId})
      .then(function(order: Order) {
        return Promise.resolve(order);
      })
      .catch(function(err) {
        return Promise.reject(new OrderNotFoundException(err));
     });
  }
}
export default GetOrderByIdQuery