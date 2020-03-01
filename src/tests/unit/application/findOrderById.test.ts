import FindOrderById from '../../../application/orders/useCases/findOrderById';
import GetOrderById from '../../../queries/orders/interfaces/getOrderById';
import Order from '../../../queries/orders/models/orderQuery';
import OrderDetail from '../../../queries/orders/models/orderDetailQuery';
import { mock } from 'jest-mock-extended';
import OrderNotFoundException from '../../../queries/orders/exceptions/orderNotFoundException';

describe('findOrderById', () => {

  function getAnExistingOrderWith(orderId: string): Order {
    return <Order> { 
      id: orderId,
      customerId: "anyCustomerId",
      total: 25.34,
      details: new Array<OrderDetail>() 
    };
  }

  it('gets order matching with id', async() => {
    const anOrderId = "anOrderId";
    const query = mock<GetOrderById>();
    query.execute.mockReturnValue(Promise.resolve(getAnExistingOrderWith(anOrderId)));
    let findOrderById = new FindOrderById(query);
    let expectedOrder = getAnExistingOrderWith(anOrderId);

    let order = await findOrderById.execute(anOrderId);

    expect(order).toMatchObject(expectedOrder);
    expect(query.execute).toHaveBeenCalledWith(anOrderId);    
  });

  it('throws an exception when orderid not exists', async() => {
    const anOrderId = "anOrderId";
    const query = mock<GetOrderById>();
    query.execute.mockReturnValue(Promise.reject(new OrderNotFoundException("not found message")));
    let findOrderById = new FindOrderById(query);
    let expectedOrder = getAnExistingOrderWith(anOrderId);

    await findOrderById.execute(anOrderId)
    .catch((error: OrderNotFoundException) => {
      expect(error.message).toBe("not found message");
    });

    expect(query.execute).toHaveBeenCalledWith(anOrderId);    
  });

});