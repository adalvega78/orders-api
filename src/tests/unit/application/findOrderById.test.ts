import FindOrderById from '../../../application/usecases/orders/findOrderById';
import GetOrderById from '../../../queries/interfaces/getOrderById';
import OrderDto from '../../../application/usecases/orders/dto/orderDto';
import OrderDetailDto from '../../../application/usecases/orders/dto/orderDetailDto';
import Order from '../../../queries/models/order';
import OrderDetail from '../../../queries/models/orderDetail';
import { mock } from 'jest-mock-extended';

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
    const anOrderId = "anOrderId";
    const query = mock<GetOrderById>();
    query.execute.mockReturnValue(Promise.resolve(getAnExistingOrderWith(anOrderId)));
    let findOrderById = new FindOrderById(query);
    let expectedOrder = toDto(getAnExistingOrderWith(anOrderId));

    let order = await findOrderById.execute(anOrderId);

    expect(order).toMatchObject(expectedOrder);
    expect(query.execute).toHaveBeenCalledWith(anOrderId);    
  });
});