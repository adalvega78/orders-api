import Order from '../models/order';

export default interface OrderRepository {
  save(order: Order): Promise<Boolean>;
}