import OrderDetailQuery from './orderDetailQuery';

export default class OrderQuery {
  id: string;
  customerId: string;
  details: Array<OrderDetailQuery>;
  total: number;
}