import FindOrderById from '../../../application/orders/useCases/findOrderById';
import DbClient from '../../../persistence/helpers/dbClient';
import Order from '../../../queries/orders/models/orderQuery';
import OrderDetail from '../../../queries/orders/models/orderDetailQuery';
import OrderNotFoundException from '../../../queries/orders/exceptions/orderNotFoundException';
import GetOrderByIdQuery from '../../../queries/orders/getOrderByIdQuery';

describe('findOrderById should', () => {

  beforeAll(async () => {
    await DbClient.connect()
  })

  function getANewOrderWith(orderId: string): Order {
    return <Order>{
      id: orderId,
      customerId: "anyCustomerId",
      total: 26.34,
      details: new Array<OrderDetail>()
    };
  }

  async function getAnExistingOrderWith(orderId: string): Promise<Order> {
    const order = getANewOrderWith(orderId);
    await DbClient.db.collection("orders").insertOne(order)
    return Promise.resolve(order);
  };

  async function cleanExistingOrder(orderId: string) {
    await DbClient.db.collection("orders").deleteOne({ id: orderId})
  }

  it('gets order matching with id', async () => {
    const query = new GetOrderByIdQuery();
    let findOrderById = new FindOrderById(query);
    const existingOrderId = "anExistingOrderId";
    let expectedOrder = await getAnExistingOrderWith(existingOrderId);

    let order = await findOrderById.execute(expectedOrder.id);

    expect(order).toMatchObject(expectedOrder);

    await cleanExistingOrder(existingOrderId);
  });

  it('throws an exception when orderid not exists', async () => {
    const query = new GetOrderByIdQuery();
    let findOrderById = new FindOrderById(query);

    await findOrderById.execute("unexistant-order-id")
      .catch((error: OrderNotFoundException) => {
        expect(error.message).toBe("order unexistant-order-id not found");
      });
  });

});