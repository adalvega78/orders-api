import CreateOrderCommand from './createOrderCommand';
import OrderRepository from '../repositories/orderRepository';
import Orders from '../models/orders';

class CreateOrderCommandHandler {
  orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async execute(command: CreateOrderCommand): Promise<string> {
    let order = Orders.create(command);
    return await this.orderRepository.save(order)
      .then(() => order.id);
  }
}

export default CreateOrderCommandHandler