export default interface CreateOrderCommand {
  customerId: string;
  details: Array<CreateOrderDetailCommand>;
  total: number;
}

export interface CreateOrderDetailCommand {
  productId: string;
  quantity: number;
  price: number;
}