import GetOrderById from './interfaces/getOrderById';
import OrderQuery from './models/orderQuery';
import OrderNotFoundException from './exceptions/orderNotFoundException';
import DbClient from  '../../persistence/helpers/dbClient';
import { isNullOrUndefined } from 'util';

class GetOrderByIdQuery implements GetOrderById {

  async execute(orderId: string): Promise<OrderQuery> {
    return await DbClient.db.collection("orders").findOne({ id: orderId})
      .then((order: OrderQuery) => {
        if (isNullOrUndefined(order)) {
          return Promise.reject(new OrderNotFoundException(`order ${orderId} not found`));
        }
        return Promise.resolve(order);
      });
  }
}
export default GetOrderByIdQuery