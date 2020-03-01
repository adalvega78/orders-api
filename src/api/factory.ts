import FindOrderById from "../application/orders/useCases/findOrderById";
import GetOrderByIdQuery from "../queries/orders/getOrderByIdQuery";
import PlaceOrder from "../application/orders/useCases/placeOrder";
import CreateOrderCommandHandler from "../business/orders/commands/createOrderCommandHandler";
import OrderRepositoryMongo from "../persistence/orderRepositoryMongo";

class Factory {
  static FindByOrderId(): FindOrderById {
    let query = new GetOrderByIdQuery();
    return new FindOrderById(query);
  }

  static PlaceOrder(): PlaceOrder {
    let repository = new OrderRepositoryMongo();
    let commandHandler = new CreateOrderCommandHandler(repository);
    return new PlaceOrder(commandHandler);
  }
}
export default Factory