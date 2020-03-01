import Order from '../../../queries/orders/models/orderQuery';
import OrderDetail from '../../../queries/orders/models/orderDetailQuery';
import { mock } from 'jest-mock-extended';
import DbClient from '../../../persistence/helpers/dbClient';
import { Db } from "mongodb";
import GetOrderByIdQuery from '../../../queries/orders/getOrderByIdQuery';
import OrderNotFoundException from '../../../queries/orders/exceptions/orderNotFoundException';

describe('getOrderByIdQuery', () => {

  function getAnExistingOrderWith(orderId: string): Order {
    return <Order>{
      id: orderId,
      customerId: "anyCustomerId",
      total: 25.34,
      details: new Array<OrderDetail>()
    };
  }

  it('gets order matching with id', async () => {
    const anOrderId = "anOrderId";
    const expectedOrder = getAnExistingOrderWith(anOrderId);
    givenADbClientThatReturns(Promise.resolve(expectedOrder))
    const getOrderByIdQuery = new GetOrderByIdQuery();

    const order = await getOrderByIdQuery.execute(anOrderId);

    expect(order).toMatchObject(expectedOrder);
  });

  it('throws an exception when not exists the order with id', async () => {
    const anOrderId = "anOrderId";
    givenADbClientThatReturns(Promise.reject(new OrderNotFoundException("not found")));
    const getOrderByIdQuery = new GetOrderByIdQuery();

    await getOrderByIdQuery.execute(anOrderId)
      .catch((error: OrderNotFoundException) => {
        expect(error.message).toBe("not found");
      } );

  });

});

function givenADbClientThatReturns(promise: Promise<Order>) {
  DbClient.connect = jest.fn();
  DbClient.db = mock<Db>();
  DbClient.db.collection = jest.fn().mockImplementation(() => {
    return {
      findOne: jest.fn((args) => {
        return promise;
      })
    };
  });
}
