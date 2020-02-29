export interface Order {
  id: string;
  customerId: string;
  details: Array<OrderDetail>;
  total: number;
}

export interface OrderDetail {
  productid: string;
  quantity: number;
  price: number;
}