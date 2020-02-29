import GetOrderById from '../../../queries/actions/getOrderByIdQuery';
import Order from '../../../business/models/order';
import OrderDto from './dto/orderDto'
import OrderDetailDto from './dto/orderDetailDto';

class FindOrderById {
  query: GetOrderById;

  constructor(query: GetOrderById) {
    this.query = query;
  }
  public async execute(orderId: string): Promise<OrderDto> {
    return await this.query.execute(orderId)
      .then((order: Order) => {
        return <OrderDto>{
          id: order.id,
          customerId: order.customerId,
          details: order.details.map((x) => {
            return <OrderDetailDto>{
              productId: x.productId,
              quantity: x.quantity,
              price: x.price
            }
          }),
          total: order.total
        }
      });
  }
}

export default FindOrderById