import OrderRepository from "../business/orders/repositories/orderRepository";
import Order from "../business/orders/models/order";
import DbClient from "./helpers/dbClient";

class OrderRepositoryMongo implements OrderRepository {
  async save(order: Order): Promise<Boolean> {
    return await DbClient.db.collection("orders").insertOne(order)
      .then(() => Promise.resolve(true));
  }
}

export default OrderRepositoryMongo