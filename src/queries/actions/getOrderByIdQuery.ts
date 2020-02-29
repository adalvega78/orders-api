import GetOrderById from '../interfaces/getOrderById';
import Order from '../../business/models/order';
import OrderDetail from '../../business/models/orderDetail';
import OrderNotFoundException from '../exceptions/orderNotFoundException';
import DbClient from  '../../repositories/helpers/dbClient';

class GetOrderByIdQuery implements GetOrderById {

  async execute(orderId: string): Promise<Order> {
    return await DbClient.db.collection("orders").findOne({id: orderId})
      .then(function(docs: any) {
        console.log("Found the following records");
        console.log(docs)
        // let newOrder = <Order> {
        //   id: order.id,
        //   customerId: order.customerId,
        //   total: order.total,
        //   details: order.details.map((x) => {
        //     return <OrderDetail> {
        //       productId: x.productId,
        //       quantity: x.quantity,
        //       price: x.price
        //     }
        //   })
        // }
        return Promise.resolve(docs);
      })
      .catch(function(err: any) {
        return Promise.reject(new OrderNotFoundException(err));
     });
  }
}
export default GetOrderByIdQuery