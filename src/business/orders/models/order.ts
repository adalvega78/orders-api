import OrderDetail from './orderDetail';

export default class Order {
  id: string;
  customerId: string;
  details: Array<OrderDetail>;
  total: number;
}