import GetOrderById from '../interfaces/getOrderById';
import OrderRepository from '../../repositories/schema/orderRepository.schema';
import { OrderType } from '../../repositories/schema/orderRepository.schema';
import Order from '../../business/models/order';
import OrderDetail from '../../business/models/orderDetail';
import OrderNotFoundException from '../exceptions/orderNotFoundException';

class GetOrderByIdQuery implements GetOrderById {
  async execute(orderId: string): Promise<Order> {
    return await OrderRepository.findOne({id: orderId})
      .then(function(order: OrderType) {
        let newOrder = <Order> {
          id: order.id,
          customerId: order.customerId,
          total: order.total,
          details: order.details.map((x) => {
            return <OrderDetail> {
              productId: x.productId,
              quantity: x.quantity,
              price: x.price
            }
          })
        }
        return Promise.resolve(newOrder);
      })
      .catch(function(err: any) {
        return Promise.reject(new OrderNotFoundException(err));
     });
  }
}
export default GetOrderByIdQuery