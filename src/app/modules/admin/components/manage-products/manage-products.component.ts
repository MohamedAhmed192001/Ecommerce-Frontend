import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../shared/models/ResponseDTOs/Product';
import { envirnment } from '../../../../../environments/environment';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-manage-products',
  standalone: false,
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {
  baseUrl = `${envirnment.baseUrl}`;
  products: Product[] = [];
 

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products
        console.log(products);
      },
      error: err => { console.error('Error occureed when fetching products: ', err) }
    })

  }
  

  openAddForm() {

  }

  deleteProduct(productId: number) {
    confirm('Are you sure to delete this product?')
    this.productService.deleteProduct(productId).subscribe({
      next: successDelete => {
        console.log(successDelete);
        alert('Product deleted successfully!')
        this.products = this.products.filter(p => p.id !== productId);
      },
      error: err => { console.error('Error occureed when delete the product: ', err) }
    })

  }

}
