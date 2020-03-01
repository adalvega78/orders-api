import GetOrderById from '../../../queries/orders/getOrderByIdQuery';
import OrderQuery from '../../../queries/orders/models/orderQuery';

class FindOrderById {
  query: GetOrderById;

  constructor(query: GetOrderById) {
    this.query = query;
  }
  public async execute(orderId: string): Promise<OrderQuery> {
    return await this.query.execute(orderId);
  }
}

export default FindOrderById