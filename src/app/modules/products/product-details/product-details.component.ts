import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/ResponseDTOs/Product';
import { envirnment } from '../../../../environments/environment';
import { CartService } from '../../../core/services/cart/cart.service';



@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  baseUrl = `${envirnment.baseUrl}`;
  product: Product = {
    id: 0, name: "", description: "", price: 0, stock: 0, categoryId: 0,
    category: { id: 0, name: '' }, imagePath: ""
  };

  constructor(private productService: ProductService, private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductDetails(id).subscribe({
      next: (response) =>
      {
        this.product = response;
      },
      error: (error) =>
      {
        console.log('error', error);
      }

    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Product added to cart successfully!');
    const cart = localStorage.getItem('cart-items');
    console.log(`cart-items: ${cart}`)
  }

}
