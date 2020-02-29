import * as mongoose from 'mongoose';
import Order from '../../business/models/order';

export type OrderDetailType = mongoose.Document & {
  productid: string;
  quantity: number;
  price: number;
  position: number;
};

export type OrderType = mongoose.Document & {
  id: string,
  customerId: string,
  details: Array<OrderDetailType>;
  total: number;
  pending: boolean,
  delivered: boolean
};

const OrderDetailSchema = new mongoose.Schema({
  orderId: String,
  productId: String,
  quantity: Number,
  price: Number,
  position: Number,
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  customerId: String,
  total: Number,
  pending: Boolean,
  delivered: Boolean,
  children: [OrderDetailSchema],
  child:OrderDetailSchema
}, { timestamps: true });


// type OrderType = Order & mongoose.Document;
const OrderRepository = mongoose.model<OrderType>('Order', OrderSchema);
export default OrderRepository;