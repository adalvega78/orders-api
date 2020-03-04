import { mock } from 'jest-mock-extended';
import CreateOrderCommandHandler from '../../../business/orders/commands/createOrderCommandHandler';
import { CreateOrderCommand, CreateOrderDetailCommand } from '../../../business/orders/commands/createOrderCommand';
import OrderRepository from 'business/orders/repositories/orderRepository';
import Guid from '../../../utils/guid';

jest.mock('../../../utils/guid');

describe('createOrderCommandHandler should', () => {

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

  it('creates the new order', async() => {
    const newOrderId = "anOrderId";
    const repository = mock<OrderRepository>();
    const command = getANewOrderCommand();
    Guid.newGuid = jest.fn(() => newOrderId);
    repository.save.mockReturnValue(Promise.resolve(true));
    let commandHandler = new CreateOrderCommandHandler(repository);

    let orderId = await commandHandler.execute(command);

    expect(orderId).toBe(newOrderId);
    expect(repository.save).toHaveBeenCalled();
  });

});