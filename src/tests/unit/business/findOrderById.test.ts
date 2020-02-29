import FindOrderById from '../../../business/actions/orders/findOrderById';
import GetOrderById from '../../../queries/getOrderById';
import OrderDetail from '../../../queries/models/orderDetail';
import Order  from '../../../queries/models/order';
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

  it('get order matching with id', async() => {
    const anOrderId = "anOrderId";
    const query = mock<GetOrderById>();
    query.execute.mockReturnValue(Promise.resolve(getAnExistingOrderWith(anOrderId)));

    let findOrderById = new FindOrderById(query);
    let expectedOrder = getAnExistingOrderWith(anOrderId);

    let order = await findOrderById.execute(anOrderId);

    expect(order).toMatchObject(expectedOrder);
    expect(query.execute).toHaveBeenCalledWith(anOrderId);
  });
});