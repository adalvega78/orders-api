import GetOrderById from '../../../queries/actions/getOrderByIdQuery';
import OrderDto from './dto/orderDto'
import OrderDetailDto from './dto/orderDetailDto';
import GetOrderByIdQuery from 'queries/actions/getOrderByIdQuery';

class FindOrderById {
  query: GetOrderById;

  constructor(query: GetOrderById) {
    this.query = query;
  }
  public async execute(orderId: string): Promise<OrderDto> {
    let order = await this.query.execute(orderId);
    return <OrderDto>{
      id: order.id,
      customerId: order.customerId,
      details: order.details.map((x) => {
        return <OrderDetailDto>{
          productid: x.productid,
          quantity: x.quantity,
          price: x.price
        }
      }),
      total: order.total
    }
  }
}

export default FindOrderById