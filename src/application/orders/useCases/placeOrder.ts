import CreateOrderCommandHandler from '../../../business/orders/commands/createOrderCommandHandler';
import CreateOrderCommand from '../../../business/orders/commands/createOrderCommand';

class PlaceOrder {
  commandHandler: CreateOrderCommandHandler;

  constructor(commandHandler: CreateOrderCommandHandler) {
    this.commandHandler = commandHandler;
  }

  public async execute(command: CreateOrderCommand): Promise<string> {
    return await this.commandHandler.execute(command);
  }
}

export default PlaceOrder