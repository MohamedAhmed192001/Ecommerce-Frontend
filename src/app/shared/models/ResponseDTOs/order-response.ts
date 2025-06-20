import { OrderItem } from "./orderItem"


export interface OrderResponse {
  userId: string,
  userName: string,
  address: string,
  phone: string,
  orderDate: Date,
  items: OrderItem[]
}
