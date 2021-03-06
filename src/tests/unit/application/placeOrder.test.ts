import { mock } from 'jest-mock-extended';
import CreateOrderCommandHandler from '../../../business/orders/commands/createOrderCommandHandler';
import { CreateOrderCommand, CreateOrderDetailCommand } from '../../../business/orders/commands/createOrderCommand';
import PlaceOrder from '../../../application/orders/useCases/placeOrder';

describe('placeOrder should', () => {

  function getANewOrderCommand(): CreateOrderCommand {
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

  it('places the new order', async() => {
    const newOrderId = "anOrderId";
    const commandHandler = mock<CreateOrderCommandHandler>();
    const command = getANewOrderCommand();
    commandHandler.execute.mockReturnValue(Promise.resolve(newOrderId));
    let placeOrder = new PlaceOrder(commandHandler);

    let orderId = await placeOrder.execute(command);

    expect(orderId).toBe(newOrderId);
    expect(commandHandler.execute).toHaveBeenCalledWith(command);    
  });

});