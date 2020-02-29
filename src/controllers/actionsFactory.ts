import FindOrderById from "../application/usecases/orders/findOrderById";
import GetOrderByIdQuery from "../queries/actions/getOrderByIdQuery";

module ActionsFactory {
  export function FindByOrderId(): FindOrderById {
    let query = new GetOrderByIdQuery();
    return new FindOrderById(query);
  }
}
export default ActionsFactory