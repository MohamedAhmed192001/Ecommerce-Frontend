import { Category } from "./category"

export interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  stock: number,
  unitSize: string,
  sku: string,
  categoryId: number,
  category: Category
  imagePath: string
}
