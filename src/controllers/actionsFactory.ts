import FindOrderById from "../application/usecases/orders/findOrderById";
import FindOrderByIdAction from "../business/actions/orders/findOrderById";
import GetOrderByIdQuery from "../queries/actions/getOrderByIdQuery";


module Factory {
  export function FindByOrderId(): FindOrderById {
    let query = new GetOrderByIdQuery();
//    let action = new FindOrderByIdAction(query);
    return new FindOrderById(query);
  }
} 