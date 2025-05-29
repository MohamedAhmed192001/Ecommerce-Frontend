import { OrderItem } from "./orderItem";

export interface Order {
  userId: string,
  address: string,
  phone: string
  items: OrderItem[]
}
