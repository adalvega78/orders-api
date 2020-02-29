import Order from '../../../queries/models/order';
import GetOrderById from '../../../queries/getOrderById';

class FindOrderById {
  getOrderById: GetOrderById;

  constructor(getOrderById: GetOrderById) {
    this.getOrderById = getOrderById;
  }

  public async execute(orderId: string): Promise<Order> {
    return await this.getOrderById.execute(orderId);
  }
}

export default FindOrderById