import Orders from '../../../business/orders/models/orders';
import { CreateOrderCommand, CreateOrderDetailCommand } from '../../../business/orders/commands/createOrderCommand';
import InvalidOrderTotalAmountException from  '../../../business/orders/exceptions/invalidOrderTotalAmountException';
import Guid from '../../../utils/guid';

jest.mock('../../../utils/guid');

describe('Orders should', () => {

  function getANewOrderCommand(): CreateOrderCommand {
    return <CreateOrderCommand> { 
      customerId: "anyCustomerId",
      total: 25.34,
      details: [
        <CreateOrderDetailCommand> {
          productId: "firstProductId",
          quantity: 1,
          price: 25.34
        }]
    };
  }

  function getAnInvalidNewOrderCommand(): CreateOrderCommand {
    return <CreateOrderCommand> { 
      customerId: "anyCustomerId",
      total: 25.34,
      details: [
        <CreateOrderDetailCommand> {
          productId: "firstProductId",
          quantity: 1,
          price: 14
        }]
    };
  }

  it('creates the new order', async() => {
    const newOrderId = "anOrderId";
    Guid.newGuid = jest.fn(() => newOrderId);
    const command = getANewOrderCommand();

    const newOrder = Orders.create(command);

    expect(newOrder.id).toBe(newOrderId);
    expect(newOrder.customerId).toBe(command.customerId);
    expect(newOrder.total).toBe(command.total);
    expect(newOrder.details.length).toBe(1);
    expect(newOrder.details[0].price).toBe(command.details[0].price);
    expect(newOrder.details[0].quantity).toBe(command.details[0].quantity);
    expect(newOrder.details[0].productId).toBe(command.details[0].productId);
  });

  it('throw an exception when sum of details price not match with order total', () => {
    const command = getAnInvalidNewOrderCommand();

    expect(() => Orders.create(command)).toThrow(new InvalidOrderTotalAmountException("order total is 25.34, but sum of all details prices is 14"));
  });
});