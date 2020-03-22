import FindOrderById from '../../../application/orders/useCases/findOrderById';
import DbClient from '../../../persistence/helpers/dbClient';
import Order from '../../../queries/orders/models/orderQuery';
import OrderNotFoundException from '../../../queries/orders/exceptions/orderNotFoundException';
import GetOrderByIdQuery from '../../../queries/orders/getOrderByIdQuery';

describe('findOrderById should', () => {

  beforeAll(async () => {
    await DbClient.connect()
  })

  async function getAnExistingOrder(): Promise<Order> {
    const order = await DbClient.db.collection("orders").findOne({}, { sort: { $natural: -1 } })
    return Promise.resolve(order);
  };

  it('gets order matching with id', async () => {
    const query = new GetOrderByIdQuery();
    let findOrderById = new FindOrderById(query);
    let expectedOrder = await getAnExistingOrder();

    let order = await findOrderById.execute(expectedOrder.id);

    expect(order).toMatchObject(expectedOrder);
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