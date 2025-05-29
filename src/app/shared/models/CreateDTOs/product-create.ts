export interface ProductCreate {
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId: number,
  imageFile: File 
}
