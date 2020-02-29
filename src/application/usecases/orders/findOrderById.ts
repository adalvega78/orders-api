import FindOrderByIdAction from '../../../business/actions/orders/findOrderById';
import OrderDto from './dto/orderDto'
import OrderDetailDto from './dto/orderDetailDto';

class FindOrderById {
  action: FindOrderByIdAction;

  constructor(action: FindOrderByIdAction) {
    this.action = action;
  }
  public async execute(orderId: string): Promise<OrderDto> {
    let order = await this.action.execute(orderId);
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