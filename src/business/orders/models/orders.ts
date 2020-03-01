import OrderDetail from './orderDetail';
import { CreateOrderCommand } from '../commands/createOrderCommand';
import Order from './order';
import Guid from '../../../utils/guid';

class Orders {

  static create(command: CreateOrderCommand): Order {
    let order = new Order();
    order.id = Guid.newGuid();
    order.customerId = command.customerId;
    order.total = command.total;
    order.details = command.details.map(x => {
      return <OrderDetail>{
        productId: x.productId,
        quantity: x.quantity,
        price: x.price
      }
    });
    return order;
  }

}
export default Orders