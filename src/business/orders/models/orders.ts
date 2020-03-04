import OrderDetail from './orderDetail';
import { CreateOrderCommand } from '../commands/createOrderCommand';
import Order from './order';
import InvalidOrderTotalAmountException from '../exceptions/invalidOrderTotalAmountException';
import IdGenerator from '../commands/idGenerator';

class Orders {

  static create(command: CreateOrderCommand): Order {
    Orders.validateCommand(command);
    let order = new Order();
    order.id = IdGenerator.newId();
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

  static validateCommand(command: CreateOrderCommand): void {
    let sumPrices = command.details.map(d => d.price).reduce((a, b) => a + b);
    if (command.total != sumPrices) { throw new InvalidOrderTotalAmountException(`order total is ${command.total}, but sum of all details prices is ${sumPrices}`); }
  }

}
export default Orders