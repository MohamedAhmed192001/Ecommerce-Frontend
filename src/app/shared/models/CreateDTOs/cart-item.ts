import { Product } from "../ResponseDTOs/Product";

export interface CartItem {
  product: Product,
  quantity: number
}
