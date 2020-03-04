import FakeDbClient from '../../helpers/fakeDbClient';
import OrderRepository from '../../../persistence/orderRepositoryMongo';
import Order from '../../../business/orders/models/order';
import OrderDetail from '../../../business/orders/models/orderDetail';

describe('OrderRepository should', () => {

  function getANewOrderWith(orderId: string): Order {
    return <Order>{
      id: orderId,
      customerId: "anyCustomerId",
      total: 25.34,
      details: new Array<OrderDetail>()
    };
  }

  it('save the order', async () => {
    const anOrderId = "anOrderId";
    const newOrder = getANewOrderWith(anOrderId);
    FakeDbClient.InsertOneReturns<Order>(Promise.resolve(true));
    const orderRepository = new OrderRepository();

    const result = await orderRepository.save(newOrder);

    expect(result).toBeTruthy();
  });

});