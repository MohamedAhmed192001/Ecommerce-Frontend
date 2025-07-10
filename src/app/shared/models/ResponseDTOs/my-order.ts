import { OrderItem } from "./orderItem";

export interface MyOrder {
  id: number,
  status: string,
  orderDate: Date,
  address: string,
  phone: string,
  totalAmount: number,
  items: OrderItem[]
}
