import CreateOrderCommandHandler from '../../../business/orders/commands/createOrderCommandHandler';
import { CreateOrderCommand, CreateOrderDetailCommand } from '../../../business/orders/commands/createOrderCommand';
import PlaceOrder from '../../../application/orders/useCases/placeOrder';
import DbClient from '../../../persistence/helpers/dbClient';
import OrderQuery from '../../../queries/orders/models/orderQuery';
import OrderRepository from '../../../persistence/orderRepositoryMongo';
import InvalidOrderTotalAmountException from '../../../business/orders/exceptions/invalidOrderTotalAmountException';

describe('placeOrder should', () => {

  beforeAll(async () => {
    await DbClient.connect()
  })

  function getANewOrderCommand(): CreateOrderCommand {
    return <CreateOrderCommand>{
      customerId: "anIntegrationCustomerId",
      total: 25.34,
      details: [
        <CreateOrderDetailCommand>{
          productId: "aProductIdentifier",
          quantity: 1,
          price: 25.34
        }]
    };
  }

  function getAnInvalidOrderCommand(): CreateOrderCommand {
    return <CreateOrderCommand>{
      customerId: "anIntegrationCustomerId",
      total: 25.34,
      details: [
        <CreateOrderDetailCommand>{
          productId: "aProductIdentifier",
          quantity: 1,
          price: 15.34
        }]
    };
  }

  it('places the new order', async () => {
    const commandHandler = new CreateOrderCommandHandler(new OrderRepository());
    const command = getANewOrderCommand();
    let placeOrder = new PlaceOrder(commandHandler);

    let orderId = await placeOrder.execute(command);

    const persitedOrder = await getLastRegisteredOrder();
    expect(orderId.length).toBeGreaterThan(0);
    expect(persitedOrder.customerId).toBe(command.customerId);
    expect(persitedOrder.total).toBe(command.total);
    expect(persitedOrder.details.length).toBe(1);
    expect(persitedOrder.details[0].productId).toBe(command.details[0].productId);
    expect(persitedOrder.details[0].quantity).toBe(command.details[0].quantity);
    expect(persitedOrder.details[0].price).toBe(command.details[0].price);

    // revert database status
    DbClient.db.collection("orders").findOneAndDelete({ id: orderId })
  });

  it('throws an exception when can not save the order', async () => {
    const commandHandler = new CreateOrderCommandHandler(new OrderRepository());
    const command = getAnInvalidOrderCommand();
    let placeOrder = new PlaceOrder(commandHandler);

    await placeOrder.execute(command)
      .catch((error: InvalidOrderTotalAmountException) => {
        expect(error.message).toBe(`order total is ${command.total}, but sum of all details prices is ${command.details[0].price}`);
      });
  });


  async function getLastRegisteredOrder(): Promise<OrderQuery> {
    const order = await DbClient.db.collection("orders").findOne({}, { sort: { $natural: -1 } })
    return Promise.resolve(order);
  };

});