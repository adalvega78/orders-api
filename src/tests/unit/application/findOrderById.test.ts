import FindOrderById from '../../../application/usecases/orders/findOrderById';
import OrderDto from '../../../application/usecases/orders/dto/orderDto';
import OrderDetailDto from '../../../application/usecases/orders/dto/orderDetailDto';
import FindOrderByIdAction from '../../../business/actions/orders/findOrderById';
import Order from '../../../queries/models/order';
import OrderDetail from '../../../queries/models/orderDetail';

describe('findOrderById', () => {

  function getAnExistingOrderWith(orderId: string): Order {
    return <Order> { 
      id: orderId,
      customerId: "anyCustomerId",
      total: 25.34,
      details: new Array<OrderDetail>() 
    };
  }

  function toDto(order: Order) {
    return <OrderDto> {
      id: order.id,
      customerId: order.customerId,
      total: order.total,
      details: order.details.map((x) => {
        return <OrderDetailDto> {
          quantity: x.quantity,
          price: x.price,
          productid: x.productid
        }
      })
    }
  }

  it('get order matching with id', async() => {
    let action = new FindOrderByIdAction(null);
    const anOrderId = "anOrderId";
    let findOrderById = new FindOrderById(action);
    spyOn(action, "execute").and.callFake(async() => getAnExistingOrderWith(anOrderId));
    let expectedOrder = toDto(getAnExistingOrderWith(anOrderId));

    let order = await findOrderById.execute(anOrderId);

    expect(order).toMatchObject(expectedOrder);
    expect(action.execute).toHaveBeenCalledWith(anOrderId);
  });
});