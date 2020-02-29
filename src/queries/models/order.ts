import OrderDetail from './orderDetail';

class Order {
  id: string;
  customerId: string;
  details: Array<OrderDetail>;
  total: number;
}
export default Order;