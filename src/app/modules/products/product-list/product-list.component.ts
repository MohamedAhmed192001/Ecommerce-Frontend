import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { envirnment } from '../../../../environments/environment';
import { CartService } from '../../../core/services/cart/cart.service';
import { Product } from '../../../shared/models/ResponseDTOs/Product';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  baseUrl = `${envirnment.baseUrl}`;
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({

      next: (response) => { this.products = response; console.log(response) },

      error: (error) => { console.error('error fetching products: ', error) }

    })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Product added to cart successfully!');
    const cart = localStorage.getItem('cart-items');
    console.log(`cart-items: ${cart}`)
    
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    alert('product removed from cart successfully!');
    const cart = localStorage.getItem('cart-items');
    console.log(`cart-items: ${cart}`)
  }

  clearCart(): void {
    this.cartService.clearCart();
    const cart = localStorage.getItem('cart-items');
    console.log(`cart-items: ${cart}`)
  }

}
