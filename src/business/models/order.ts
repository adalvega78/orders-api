import OrderDetail from './orderDetail';

export default interface Order {
  id: string;
  customerId: string;
  details: Array<OrderDetail>;
  total: number;
}