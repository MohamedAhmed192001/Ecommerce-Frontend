import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { envirnment } from '../../../../environments/environment';
import { CartService } from '../../../core/services/cart/cart.service';
import { Product } from '../../../shared/models/ResponseDTOs/Product';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  baseUrl = `${envirnment.baseUrl}`;
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService,
  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({

      next: (response) => { this.products = response; console.log(response) },

      error: (error) => {
        this.toastr.error('Error fetching products');
        console.error('Error fetching products: ', error)
      }

    })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastr.success('Product added to cart successfully!');
    
    
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.toastr.success('product removed from cart successfully!');
   
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.toastr.success('Cart cleared successfully!');

   
  }

}
