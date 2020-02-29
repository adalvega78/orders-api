import OrderDetailDto from './orderDetailDto';
class OrderDto {
  id: string;
  customerId: string;
  details: Array<OrderDetailDto>;
  total: number;
}
export default OrderDto;